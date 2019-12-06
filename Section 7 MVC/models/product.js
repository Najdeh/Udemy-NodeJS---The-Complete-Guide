const products = [];

module.exports = class Product {  //létrehozunk egy osztályt amit kiexportálunk
    constructor(t){                //konstruktor 1 paramétert kap
        this.title = t;            // a példányosításnál a paraméter lesz a példány.title-je
    }

    save(){
        products.push(this);       //itt a this maga a példány. ezt pusholjuk a products tömbbe
    }

    static fetchAll(){          //static azért kell mert így a global objectre mutatunk azaz elérjük a products változót
        return products;   
    }
}