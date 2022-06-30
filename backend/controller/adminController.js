const Orders = require("../models/Orders")
const User = require("../models/User")
const Restaurant = require("../models/Restaurant")
const Product = require("../models/Product")
const Enquery = require("../models/Enquery")
const StateCity = require("../models/stateCity")

module.exports.home = (req, res) => {
    try {
        res.json("Welcome To Admin")
    } catch (error) {
        res.json(error.message)
    }
}

module.exports.countorders = async (req, res) => {
    try {
        const countOrders = await Orders.count()
        const userRegister = await User.count()
        const restaurantRegister = await Restaurant.count()
        const diffproductlisted = await Product.distinct("itemname").count()
        const totalProductListed = await Product.count()
        const totalstate = await StateCity.distinct("state").count()
        const totalcity = await StateCity.count()

        res.json({ TotalOrdersReceive: countOrders, TotalUser: userRegister, TotalRestaurant: restaurantRegister, DiffProductslisted: diffproductlisted, TotalItemListed: totalProductListed, TotalState: totalstate, TotalCity: totalcity })

    } catch (error) {
        res.json(error.message)
    }
}

module.exports.resname = async (req, res) => {
    try {
        const resName = await Restaurant.find({})
        res.json({ RestaurantName: resName })
    } catch (error) {
        res.json(error.message)
    }
}

module.exports.user = async (req, res) => {
    try {
        const userData = await User.find({})
        res.json({ UserData: userData })
    } catch (error) {
        res.json(error.message)
    }
}

module.exports.products = async (req, res) => {
    try {
        const productsList = await Product.find({})
        res.json({ ProductsList: productsList })
    } catch (error) {
        res.json(error.message)
    }
}

module.exports.ordersdetail = async (req, res) => {
    try {
        const odersData = await Orders.find({})
        res.json({ abc: odersData })
    } catch (error) {
        res.json(error.message)
    }
}

module.exports.enquery = async (req, res) => {
    const { name, email, mobile, message } = req.body

    if (!name || !email || !message || !mobile) {
        res.status(422).json({ error: "Something is Empty" });
    }

    try {

        const enquery = new Enquery({ name, email, mobile, message })
        await enquery.save();
        res.status(201).json({ message: "Message has been sent Successfully" });

    } catch (error) {
        res.json(error.message)
    }

}

module.exports.addstates = async (req, res) => {
    const { state, city } = req.body

    if (!state || !city) {
        res.status(422).json({ error: "Something is Empty" });
    }
    try {
        const statecity = new StateCity({ state, city })
        await statecity.save();
        res.status(201).json({ message: "State And City Added Successfully" });

    } catch (error) {
        res.json(error.message)
    }
}
