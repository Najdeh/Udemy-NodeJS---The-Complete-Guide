const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(process.mainModule.filename),
'data',
'products.json'
);

const getProductsFromFile = (cb) => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
          return  cb([]);
        }
         cb(JSON.parse(fileContent));
    });
}

module.exports = class Product {  //létrehozunk egy osztályt amit kiexportálunk
    constructor(t) {                //konstruktor 1 paramétert kap
        this.title = t;            // a példányosításnál a paraméter lesz a példány.title-je
    }

    save() {
        getProductsFromFile((products) => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            })
        });
    }

    static fetchAll(cb) {          //static azért kell mert így a global objectre mutatunk azaz elérjük a products változót
        getProductsFromFile(cb);
    }
}