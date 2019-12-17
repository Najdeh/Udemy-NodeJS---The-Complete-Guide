const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(process.mainModule.filename),
    'data',
    'products.json'
);

const getProductsFromFile = (cb) => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            return cb([]);
        }
        cb(JSON.parse(fileContent));
    });
}

module.exports = class Product {  //létrehozunk egy osztályt amit kiexportálunk
    constructor(id, title, imageUrl, price, description) {                //konstruktor 4 paramétert kap
        this.id = id;
        this.title = title;            // a példányosításnál a paraméter lesz a példány.title-je
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
    }

    save() {
        this.id = Math.random().toString();
        getProductsFromFile((products) => {
            if (this.id) {
                const existingProductIndex = products.findIndex(prod => prod.id === this.id);
                const updatedProducts = [...products];
                updatedProducts[existingProductIndex] = this; //a this itt egy productot jelent
                fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
                    console.log(err);
                })} else {
                    products.push(this);
                fs.writeFile(p, JSON.stringify(products), (err) => {
                    console.log(err);
                });
            }
        });
    }

    static fetchAll(cb) {          //static azért kell mert így a global objectre mutatunk azaz elérjük a products változót
        getProductsFromFile(cb);
    }

    static findById(id, cb) {
        getProductsFromFile(products => {
            const product = products.find(p => p.id === id);
            cb(product);
        });
    }
}