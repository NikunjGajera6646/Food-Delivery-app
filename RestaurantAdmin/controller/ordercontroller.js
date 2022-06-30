const moment = require('moment')
const Order = require("../models/Orders")
const User = require("../models/User")
const Product = require("../models/Product")
const Restaurant = require("../models/Restaurant")
const Orders = require('../models/Orders')

module.exports.orderstatus = async (req, res) => {
    try {
        const resname = await Restaurant.findById(req.user.id)
        const order = await Order.find({}).populate('uid').populate({
            path: 'pid', populate: { path: 'price' }, populate: { path: 'resname' }
        })
        res.render("Allorder", {
            order: order,
            moment: moment,
            nameres: resname,
        })
    } catch (error) {
        res.json(error.message)
    }
}


module.exports.orderget = async (req, res)=>{
    console.log(req.user)
    try {
        let ordergets = await Orders.find({ $and: [{ rid: { $eq: req.user.id } }, { pending: { $eq: true } }] })
        res.json({success:1,ordergets})
    } catch (error) {
        res.json(error.message)
    }
}