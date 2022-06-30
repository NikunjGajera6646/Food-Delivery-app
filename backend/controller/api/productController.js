const Product = require("../../models/Product")
const Restaurant = require("../../models/Restaurant")

module.exports.productsUpload = async (req, res) => {

    const { category, itemname, itemtype, price, description } = req.body
    const img = req.file.filename

    if (!category || !itemname || !itemtype || !price || !description || !img) {
        res.status(422).json({ error: "Something is Empty" });
    }

    try {

        const resid = req.params.id
        const rest = await Restaurant.findOne({ _id: resid })
        if (rest !== null) {
            const products = await new Product({ resname: req.params.id, category, itemname, itemtype, price, description, img })
            await products.save();
            res.status(201).json({ message: "Product Uploaded Successfully" });
        }
        else {
            res.json("Restaurant Not Found")
        }


    } catch (error) {
        res.json(error.message)
    }
}

module.exports.categories = async (req, res) => {
    try {
        const fetchCategories = await Product.distinct("category");
        res.json(fetchCategories)
    } catch (error) {
        res.json(error.message)
    }
}

module.exports.products = async (req, res) => {

    try {
        const fetchproducts = await Product.find({});
        res.json(fetchproducts)
    } catch (error) {
        res.json(error.message)
    }
}

module.exports.product = async (req, res) => {
    try {
        const paramsid = req.params.id
        if (paramsid) {
            const products = await Product.find({ resname: req.params.id })
            res.json({ ProductsDetail: products })
        }
        else {
            res.json("No Restaurant Found")
        }
    } catch (error) {
        res.json(error.message)
    }
}

module.exports.singleproduct = async (req, res) => {
    try {
        const paramsid = req.params.id
        if (paramsid) {
            const product = await Product.findOne({ _id: req.params.id }).populate("resname")
            res.json({ productinfo: product })
        }
        else {
            res.json("No Restaurant Found")
        }
    } catch (error) {
        res.json(error.message)
    }
}