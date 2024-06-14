const mongoose = require("mongoose");
const Review = require("./Review");
const User = require("./User");


const productSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    img:{
        type:String,
        trim:true
    },
    price:{
        type:Number,
        // min:0,
        required:true
    },
    desc:{
        type:String,
        trim:true
    },
    reviews:[{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Review'
    }],
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    sumRating:{
        type: Number,
        default: 0
    }

});

// middleware to delete reviews , ye mongoose middleware h na ki express middleware

productSchema.post('findOneAndDelete', async function(product){
    if(product.reviews.length > 0 ){
        await Review.deleteMany({_id:{$in:product.reviews}});
    }
})

let Product = mongoose.model('Product', productSchema);
module.exports = Product;