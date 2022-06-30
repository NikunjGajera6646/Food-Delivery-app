const Restaurant = require('../../models/Restaurant')
const User = require('../../models/User')
const Contactus = require('../../models/Contactus')
const State= require("../../models/State")
const StateCity = require("../../models/stateCity")
const Categories = require("../../models/Categories")
const Area = require("../../models/Area")
const Product = require("../../models/Product")

module.exports.dashboard = async (req, res) => {
    try {
        let restaurant = await Restaurant.find({})
        let user = await User.find({})
        let contactus = await Contactus.find({})
        let city = await StateCity.find({})
        let state = await State.find({})
        let categories = await Categories.find({})
        let area = await Area.find({})
        let product = await Product.find({})
        res.render('Dashboard', {
            res: restaurant,
            us: user,
            con: contactus,
            stat: state,
            city: city,
            cate: categories,
            area: area,
            product : product
        });
    } catch (error) {
        res.json(error.message)
    }
}