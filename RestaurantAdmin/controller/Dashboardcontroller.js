const Orders = require('../models/Orders')
const Product = require('../models/Product')
const Restaurant = require("../models/Restaurant")


module.exports.dashboard = async (req, res) => {
    try {
        const id = req.user.id
        const resname = await Restaurant.findById(req.user.id)
        let product = await Product.find({ resname: req.user.id })
        let order = await Orders.find({ $and: [{ rid: { $eq: req.user.id } }] })
        let pendingabc = await Orders.find({ $and: [{ rid: { $eq: req.user.id } }, { pending: { $eq: true } }] })
        let canceldorder = await Orders.find({ $and: [{ rid: { $eq: req.user.id } }, { cancel: { $eq: true } }] })
        let processdorder = await Orders.find({ $and: [{ rid: { $eq: req.user.id } }, { process: { $eq: true } }] })
        let dispatchorder = await Orders.find({ $and: [{ rid: { $eq: req.user.id } }, { dispatch: { $eq: true } }] })
        let deliveredorder = await Orders.find({ $and: [{ rid: { $eq: req.user.id } }, { delivered: { $eq: true } }] })
        res.render("Dashboard", {
            nameres: resname,
            product: product,
            orders :order,
            pending:pendingabc,
            cancel:canceldorder,
            process: processdorder,
            dispatch :dispatchorder,
            delivered :deliveredorder
        })
    } catch (error) {
        res.json(error.message)
    }
}