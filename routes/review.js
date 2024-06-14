const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const Product = require('../models/Product');
const {validateReview} = require('../middleware');

router.post('/products/:id/review', validateReview, async(req,res)=>{
    try{
        let {id} = req.params;
        let {rating, comment} = req.body;
        const product = await Product.findById(id);
        const review = new Review({rating, comment});
        product.reviews.push(review);
        product.sumRating = product.sumRating+review.rating ;
        await review.save();
        await product.save();
        req.flash('success', 'Review added successfully');
        res.redirect(`/products/${id}`);
    }
    catch{
        res.status(500).render('error', {err:e.message});
    }
})

module.exports = router;