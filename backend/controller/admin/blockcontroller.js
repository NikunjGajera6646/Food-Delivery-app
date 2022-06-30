const Restaurant = require("../../models/Restaurant")
const flash = require('connect-flash');
const deleteImg = require('../../middleware/deleteImg')
const StateCity = require("../../models/stateCity")
const State = require("../../models/State");
const Product = require("../../models/Product");
const Area = require("../../models/Area");


module.exports.blockres = async (req,res)=>{
    try {
        const blockrestauant = await Restaurant.find({ $and: [ { block: { $eq: true } }] })
        // console.log("block restaurant",blockrestauant)
        return res.render("blockres", {
            blockres: blockrestauant,
            message: req.flash('message')
        })
    } catch (error) {
        res.send(error.message)
    }
}

module.exports.blockresdelete = async (req, res) => {
    try {
        const falseproduct = await Product.find({ $and: [{ resname: { $eq: req.params.id } }, { block: { $eq: false } }] })
        const product = await Product.find({})
        // console.log("Products data", product)
        if (falseproduct.length === 0 || product.length === 0) {
            const data = await Restaurant.findByIdAndDelete(req.params.id)
            deleteImg(data.img);
            req.flash('message', 'Restaurant Delete Restaurant')
            res.redirect("back")
        } else {
            req.flash('messages', 'There is product register on this restaurant')
            res.redirect("back")
        }
    } catch (error) {
        res.send(error.message)
    }
}

module.exports.blockproduct = async (req,res)=>{
    try {
        const blockproduct = await Product.find({ $and: [ { block: { $eq: true } }] }).populate('resname').exec();
        console.log("block product",blockproduct)
        return res.render("Blockproduct", {
            blockpro: blockproduct,
            message: req.flash('message')
        })
    } catch (error) {
        res.send(error.message)
    }
}

module.exports.blockproductdelete = async (req, res) => {
    try {
        const data = await Product.findByIdAndDelete(req.params.id, {
            block: true
        })
        req.flash('message', 'Product delete successfully!')
        res.redirect("back")
    } catch (error) {
        res.send(error.message)
    }
}