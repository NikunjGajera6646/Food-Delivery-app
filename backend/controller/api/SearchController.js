const Product = require("../../models/Product");
const Restaurant = require("../../models/Restaurant");

module.exports.productsfind = async (req, res) => {
    try {
        var regex = RegExp(req.params.name, 'i');
        const result = await Product.find({ itemname: regex })
        res.status(201).json({ result })
    } catch (error) {
        res.json(error.message)
    }
}


module.exports.restaurantfind = async (req, res) => {
    try {
        var regex = RegExp(req.params.name, 'i')
        const result = await Restaurant.find({ $or: [{ resname: regex }, { city: regex }] })
        res.status(201).json({ result })
    } catch (error) {
        res.json(error.message)
    }
}
