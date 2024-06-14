const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const seedDB = require('./seed');
const productRoutes = require('./routes/product');
const reviewRoutes = require('./routes/review');
const authRoutes = require('./routes/auth');
const cartRoutes = require('./routes/cart');
const productApi = require('./routes/api/productapi')
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/User');


mongoose.connect('mongodb://127.0.0.1:27017/shopping-app')
.then(()=>{
    console.log("DB connected");
})
.catch((err)=>{
    console.log(err);
})

let configSession = {
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        // secure: true 
        httpOnly: true,
        expires : Date.now()+ 24*7*60*60*1000,
        maxAge: 24*7*60*60*1000
    }
}

app.engine('ejs',ejsMate);
app.set('view engine','ejs');
app.set('views',path.join(__dirname, 'views'));
// setting static folders
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
// express-session
app.use(session(configSession));
// flash
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    // console.log(req.user);
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

// passport
// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));

app.use(productRoutes);
app.use(reviewRoutes);
app.use(authRoutes);
app.use(cartRoutes);
app.use(productApi);

// seeding
// seedDB();

app.listen(8080,()=>{
    console.log("Server connected");
})