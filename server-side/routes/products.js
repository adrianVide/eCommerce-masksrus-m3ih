var express = require("express");
var router = express.Router();
const Product = require("../models/Product");

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
    next(error);  
  }
});

// router.get("/search-result", async (req, res, next) => {});

module.exports = router;
