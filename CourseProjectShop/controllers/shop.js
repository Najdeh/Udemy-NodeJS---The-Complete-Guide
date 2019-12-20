const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  }));
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId, (product) => {
    res.render('shop/product-detail', {
      product: product,
      pageTitle: product.title,
      path: '/products'
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  }));
};

exports.getCart = (req, res, next) => {
  cart = Cart.getCart(cart => {     //cart.json tartalma
    Product.fetchAll(products => {  //product.json tartalma
      cartProducts = [];            // ezt a tömböt fogom átadni a templatenek
      for (const product of products) {   //végig megyünk a product tömbön
        const cartProductData = cart.products.find(prod => prod.id === product.id); //ahol a cartban található ID megyegyezik a product.id val az a product van a cartban
        if (cartProductData) {
          cartProducts.push({productData: product, qty : cartProductData.qty}) //a tömbbe amit átadok majd, belerakom a cartban lévő productokat és qty-jét
        }
      }
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: cartProducts    //itt adom át a templatenek
      });
    })
  })

};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    Cart.addProcuct(prodId, product.price);
  });
  res.redirect('/cart');
}

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart');
  });
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};