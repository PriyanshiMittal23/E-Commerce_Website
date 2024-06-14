const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../middleware');
const Product = require('../models/Product');
const User = require('../models/User');

// user ko uski cart dikhane k liye
router.get('/user/cart', isLoggedIn, async(req,res)=>{
    let user = await User.findById(req.user._id).populate('cart');
    res.render('cart/cart', {user});
})

// actually adding product to the cart
router.post('/user/:productId/add', isLoggedIn, async(req,res)=>{
    let {productId} = req.params;
    let userId = req.user._id;
    let product = await Product.findById(productId);
    let user = await User.findById(userId);
    user.cart.push(product);
    user.save();
    res.redirect('/user/cart');
} )

// To remove item from cart api
router.post('/user/cart/:productId/remove', isLoggedIn, async(req,res)=>{
    let {productId} = req.params;
    // let userc = req.user;
    req.user = await User.findByIdAndUpdate(req.user._id, {$pull:{cart:productId}}, {new:true});
    res.send('product removed');
})

module.exports = router;