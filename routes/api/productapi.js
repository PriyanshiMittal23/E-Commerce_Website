const express = require('express');
const router = express.Router();
const {isLoggedIn} = require("../../middleware");
const User = require('../../models/User');
const { models } = require('mongoose');

// Wishlist api route
router.post('/products/:productId/like', isLoggedIn, async(req,res)=>{
    let {productId} = req.params;
    let user = req.user;
    let isLiked = user.wishlist.includes(productId);

    const option = isLiked? '$pull' : "$addToSet";
    req.user = await User.findByIdAndUpdate(req.user._id, {[option]:{wishlist:productId}}, {new:true});
    res.send('like done api');

})

module.exports = router;