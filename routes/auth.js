const express = require('express');
const User = require('../models/User');
const passport = require('passport');
const router = express.Router();

router.get('/register', (req,res)=>{
    res.render('auth/signup');
})

// to actually register
router.post('/register', async(req,res)=>{
    try{
        let {username, email, role, password} = req.body;
        const user = new User({username, email, role});
        const newUser = await User.register(user,password);
        // res.send(newUser);
        // res.redirect('/login');
        req.login(newUser, function(err){
            if(err){return next(err);}
            req.flash('success','Welcome');
            res.redirect('/products');
        })
    }
    catch(e){
        req.flash('error',e.message);
        // res.status(500).render('error',{err:e.message});
        return res.redirect('/signup');
    }
})

// to get login form
router.get('/login', (req,res)=>{
    res.render('auth/login');
})

// to actually login
router.post('/login',
    passport.authenticate('local', { 
        failureRedirect: '/login', 
        failureMessage: true 
    }), 
    (req,res)=>{
        req.flash('success', 'Welcome Back!');
        // console.log(currentUser);
        res.redirect('/products');
    }
)

// logout
router.get('/logout', (req,res)=>{
    ()=>{
        req.logout();
    }
    req.flash('success','Goodbye, See you again');
    res.redirect('/login');
})

module.exports = router;