const moment = require('moment')
const Order = require("../models/Orders")
const User = require("../models/User")
const Product = require("../models/Product")
const Restaurant = require("../models/Restaurant")

module.exports.dispatchdorder = async (req, res) => {
    try {
        const resname = await Restaurant.findById(req.user.id)
        const placedord = await Order.find({ $and: [{ rid: { $eq: req.user.id } }, { dispatch: { $eq: true } }, { cancel: { $eq: false } }] }).populate('uid').populate({
            path: 'pid',
            populate: {
                path: 'price'
            }
        })
        return res.render("Dispatchorder", {
            order: placedord,
            moment: moment,
            nameres: resname,
            message: req.flash('message')
        })

    } catch (error) {
        res.json(error.message)
    }
}
module.exports.dispatchconfirm = async (req, res) => {
    try {
        const oid = req.params.id
        const delivered = await Order.find({ $and: [{ rid: { $eq: req.user.id } }, { delivered: { $eq: false } }, { dispatch: { $eq: true } }, { cancel: { $eq: false } }] })
        if (delivered[0].dispatch === true && delivered[0].delivered === false) {
            const status = await Order.findByIdAndUpdate(req.params.id, {
                process: false,
                dispatch: false,
                delivered: true
            })
            res.redirect("/deliverdorder")
        }

    } catch (error) {
        res.json(error.message)
    }
}