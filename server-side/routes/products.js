var express = require("express");
var router = express.Router();
const Product = require("../models/Product");
const User = require("../models/User");

router.get("/", async (req, res, next) => {
  const allProducts = await Product.find();
  allProducts.length !== 0
    ? res.json(allProducts)
    : res.send("No products found!");
});

router.get("/:id", async (req, res, next) => {
  try {
    const theProduct = await Product.findById(req.params.id);
    console.log(theProduct);
    res.json(theProduct);
  } catch (error) {
    res.status(404).json({ errorMessage: "Not found" });
  }
});

router.post("/addtowishlist/:id", async (req, res, next) => {
  const theProduct = await Product.findById(req.params.id);
  res.json(theProduct);

  const loggedUser = await User.findById(req.session.currentUser._id);

  await User.findByIdAndUpdate(loggedUser, { $push: { wishList: theProduct } });

  await console.log(loggedUser);
});

router.post("/addtocart/:id", async (req, res, next) => {
  const theProduct = await Product.findById(req.params.id);

  const theQuantity = req.body.quantity;


  const loggedUser = await User.findById(req.session.currentUser._id);

  const productIf = [...loggedUser.cartList].filter((product) => {

    return product.productId == theProduct.id;
  });

  if (productIf.length) {
    const updatedCartList = loggedUser.cartList.map((product) => {
      if (product.productId == theProduct.id) {
        product.quantity = theQuantity;
      }
      return product;
    });

    await User.findByIdAndUpdate(req.session.currentUser._id, {
      cartList: updatedCartList,
    });

  } else {

    await User.findByIdAndUpdate(req.session.currentUser._id, {
      $push: { cartList: { productId: theProduct, quantity: theQuantity } },
    });
  }
  res.json('Cartlist updated correctly')

});

module.exports = router;
