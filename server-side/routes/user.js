var express = require('express');
var router = express.Router();
const User = require('../models/User')
const Product = require('../models/Product')
const mongoose = require('mongoose')




/* GET all the user wishlist products */
router.get('/:id/wishlist', function (req, res, next) {

  const { _id } = req.session.currentUser;
  User.findById(_id).populate('wishList')
    .then(user => {
      console.log(user)
      res.json(user.wishList)
    })
    .catch(error => {
      next(error)
    })

});

// GET all products from cart

router.get('/:id/cart', async (req, res, next) => {

  try {
  const requests = await User.findById(req.session.currentUser._id).populate('cartList.productId')
  res.json(requests);
  }catch(error) {
    res.status(404).json({errorMessage: 'Nothing found'})
  }
});


module.exports = router;
