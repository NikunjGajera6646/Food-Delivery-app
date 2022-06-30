const moment = require('moment')
const Order = require("../models/Orders")
const User = require("../models/User")
const Product = require("../models/Product")
const Restaurant = require("../models/Restaurant")

module.exports.deliveredorder = async (req, res) => {
    try {
        const resname = await Restaurant.findById(req.user.id)
        const placedord = await Order.find({ $and: [{ rid: { $eq: req.user.id } }, { delivered: { $eq: true } }, {cancel:{ $eq: false}}] }).populate('uid').populate({
            path: 'pid',
            populate: {
                path: 'price'
            }
        })
        return res.render("deliverdorder", {
            order: placedord,
            moment: moment,
            nameres: resname,
        })
     
    } catch (error) {
        res.json(error.message)
    }
}

