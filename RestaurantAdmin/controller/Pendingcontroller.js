const moment = require('moment')
const Order = require("../models/Orders")
const User = require("../models/User")
const Product = require("../models/Product")
const Restaurant = require("../models/Restaurant")

module.exports.pendingstatus = async (req, res) => {
    try {
        const resname = await Restaurant.findById(req.user.id)
        const pendingabc = await Order.find({ $and: [{ rid: { $eq: req.user.id } }, { pending: { $eq: true } }, { cancel: { $eq: false } }] }).populate('uid').populate({
            path: 'pid',
            populate: {
                path: 'price'
            }
        })
        return res.render("pendingorder", {
            order: pendingabc,
            moment: moment,
            nameres: resname,
            message: req.flash('message')
        })
    } catch (error) {
        res.json(error.message)
    }
}


module.exports.pendingconfirm = async (req, res) => {

    try {
        const oid = req.params.id
        const process = await Order.find({ $and: [{ rid: { $eq: req.user.id } }, { pending: { $eq: true } }, { process: { $eq: false } }, { cancel: { $eq: false } }] })
        if (process[0].pending === true && process[0].process === false) {
            const status = await Order.findByIdAndUpdate(req.params.id, {
                pending: false,
                process: true
            })
            res.redirect("/processorder")
        }
    } catch (error) {
        res.json(error.message)
    }
}
module.exports.pendingcancel = async (req, res) => {
    try {
        const oid = req.params.id
        const cancel = await Order.find({ $and: [{ rid: { $eq: req.user.id } }, { pending: { $eq: true } }, { cancel: { $eq: false } }] })
        if (cancel[0].pending === true && cancel[0].cancel === false) {
            const status = await Order.findByIdAndUpdate(req.params.id, {
                pending: false,
                cancel: true
            })
            res.redirect("/Cancelorder")
        }
    } catch (error) {
        res.json(error.message)
    }
}


