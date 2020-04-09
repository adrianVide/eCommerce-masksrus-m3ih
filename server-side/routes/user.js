var express = require('express');
var router = express.Router();
const User = require('../models/User')

/* GET all the user wishlist products */
router.get('/:id/wishlist', function(req, res, next) {

const {_id} = req.session.currentUser;
User.findById({_id}).populate('products')
.then(wishListProds => {
  res.json(wishListProds.wishList)
}) 
.catch(error => {
  next(error)
})
  
});

// GET all products from cart

router.get('/:id/cart', async (req, res, next) => {

  try {
const findCartProducts = await User.findById(req.session.currentUser._id).populate('products')

   res.json(findCartProducts.cartList.map(product => product))
  
  }catch(err) {
    res.status(404).json({errorMessage: 'Did not find anything'})
  }

})


module.exports = router;
