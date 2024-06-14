const express = require('express');
const Product = require('../models/Product');
const Review = require('../models/Review');
const router = express.Router();
const {isLoggedIn, validateProduct, isSeller, isProductAuthor} = require('../middleware');
const User = require('../models/User');

router.get('/products', async(req,res)=>{
    try{
        let products = await Product.find({});
        res.render('products/index',{products});
    }
    catch(e){
        res.status(500).render('error', {err:e.message});
    }
});

// show form to add new product

router.get('/products/new', isLoggedIn, isSeller, (req,res)=>{
    try{
        res.render('products/new');
    }
    catch(e){
        res.status(500).render('error', {err:e.message});
    }
})

// to add new product

router.post('/products', validateProduct, isLoggedIn, isSeller,  async(req,res)=>{
    try{
        let {name, img, price, desc} = req.body;
        await Product.create({name, img, price, desc, author:req.user._id});
        req.flash('success', 'Product added successfully');
        res.redirect('/products');
    }
    catch(e){
        res.status(500).render('error', {err:e.message});
    }
})

// to show a paticular product
router.get('/products/:id', isLoggedIn, async(req,res)=>{
    try{
        let {id} = req.params;
        let foundProduct = await Product.findById(id).populate('reviews');
        res.render('products/show', {foundProduct});
    }
    catch(e){
        res.status(500).render('error', {err:e.message});
    }
})

// to edit the product
router.get('/products/:id/edit',isLoggedIn, isProductAuthor, async(req,res)=>{
    try{
        let {id} = req.params;
        let foundProduct = await Product.findById(id);
        res.render('products/edit', {foundProduct});
    }
    catch(e){
        res.status(500).render('error', {err:e.message});
    }
})

// to actually edit
router.patch('/products/:id', validateProduct, isLoggedIn, isProductAuthor, async(req,res)=>{
    try{
        let {id} = req.params;
        let {name, img, price, desc} = req.body;
        await Product.findByIdAndUpdate(id, {name, img, price, desc});
        req.flash('success', 'Product edited successfully');
        res.redirect(`/products/${id}`);
    }
    catch(e){
        res.status(500).render('error', {err:e.message});
    }
})

// to delete the product
router.delete('/products/:id', isLoggedIn, isProductAuthor, async(req,res)=>{
    try{
        let {id} = req.params;
        let product = await Product.findById(id);
        // for(let id of product.reviews){
        //     await Review.findByIdAndDelete(id);
        // }
        const usersWithproduct = await User.find({cart:id});
        for(let users of usersWithproduct){
            await User.findByIdAndUpdate(users._id, { $pull: {cart: id}});
        }
        await Product.findByIdAndDelete(id);
        req.flash('success', 'Product deleted successfully');
        res.redirect('/products');
    }
    catch(e){
        res.status(500).render('error', {err:e.message});
    }
})

module.exports = router;