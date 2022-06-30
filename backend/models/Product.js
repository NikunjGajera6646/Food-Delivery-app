const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
    resname: {
        type: Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true
    },
    category: {
        type: String,
        required: true
    },                                       // Name of Restaurant from Restaurant collection
    itemname: {
        type: String,
        required: true
    },
    itemtype: {
        type: String,
        required: true                       // veg / nonveg
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
    },
    img: {
        type: String,
        required: true
    },
    block:{
        type:Boolean,
        required:true,
        default:false
    },
    rating: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        rate: {
            type: Number
        }
    }
    ],
    comment: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        commenttext: {
            type: String
        }
    }
    ],                                      // Image of product
}, { timestamps: true })

const Product = mongoose.model("Product", productSchema, "product")

module.exports = Product;
