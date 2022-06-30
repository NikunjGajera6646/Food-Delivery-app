const moment = require('moment')
const Order = require("../models/Orders")
const User = require("../models/User")
const Product = require("../models/Product")
const Restaurant = require("../models/Restaurant")

module.exports.processorder = async (req, res) => {
    try {
        const resname = await Restaurant.findById(req.user.id)
        const processord = await Order.find({ $and: [{ rid: { $eq: req.user.id } }, { pending: { $eq: false } }, { process: { $eq: true } }, { cancel: { $eq: false } }] }).populate('uid').populate({
            path: 'pid',
            populate: {
                path: 'price'
            }
        })
        return res.render("processorder", {
            order: processord,
            moment: moment,
            nameres: resname,
            message: req.flash('message')
        })

    } catch (error) {
        res.json(error.message)
    }
}

module.exports.processconfirm = async (req, res) => {
    try {
        const oid = req.params.id
        const dispatch = await Order.find({ $and: [{ rid: { $eq: req.user.id } }, { dispatch: { $eq: false } }, { process: { $eq: true } }, { cancel: { $eq: false } }] })
        if (dispatch[0].process === true && dispatch[0].dispatch === false) {
            const status = await Order.findByIdAndUpdate(req.params.id, {
                dispatch: true,
                process: true
            })
            res.redirect("/Dispatchorder")
        }

    } catch (error) {
        res.json(error.message)
    }
}