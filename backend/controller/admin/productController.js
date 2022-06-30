const Product = require("../../models/Product")
const Restaurant = require("../../models/Restaurant")
const Categories = require("../../models/Categories")
const flash = require('connect-flash');

module.exports.manageProduct = async (req, res) => {
    try {
        let products = await Product.find({ block: false }).populate('resname').exec();
        return res.render("ManageProduct", {
            product: products
        });
    } catch (error) {
        res.json(error.message)
    }
}
module.exports.deleleproducts = async (req, res) => {
    try {
        const data = await Product.findByIdAndUpdate(req.params.id, {
            block: true
        })
        req.flash('message', 'Product delete successfully!')
        res.redirect("back")
    } catch (error) {
        res.send(error.message)
    }
}

module.exports.managecategories = async (req, res) => {
    try {
        let categories = await Categories.find({})
        res.render("Managecategories", {
            cate: categories,
            message: req.flash('message')
        })
    } catch (error) {
        res.json(error.message)
    }
}
module.exports.insertcategory = async (req, res) => {

    const { categories } = req.body
    console.log(req.body)
    if (!categories) {
        res.status(422).json({ error: "Something is Empty" });
    }
    try {
        const category = new Categories({ categories })
        await category.save();
        req.flash('message', 'Category Inserted Successfully!')
        res.redirect("back")

    } catch (error) {
        res.json(error.message)
    }
}
module.exports.delelecategory = async (req, res) => {
    try {
        await Categories.findByIdAndDelete(req.params.id)
        req.flash('message', 'Category Deleted Successfully!')
        res.redirect("back")
    } catch (error) {
        res.send(error.message)
    }
}
