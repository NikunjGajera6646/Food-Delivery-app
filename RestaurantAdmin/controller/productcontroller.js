const Product = require("../models/Product")
const Restaurant = require("../models/Restaurant")
const Categories = require("../models/categories")
const flash = require('connect-flash');
const deleteImg = require("../middleware/deleteImg")


module.exports.manageproduct = async (req, res) => {
    try {
        const products = await Product.find({ $and: [{ resname: { $eq: req.user.id } }, { block: { $eq: false } }] }).populate('resname').exec()
        const resname = await Restaurant.findById(req.user.id)
        res.render("ManageProduct", {
            item: products,
            nameres: resname,
            message: req.flash('message')
        })
    } catch (error) {
        res.json(error.message)
    }
}

module.exports.blockproduct = async (req, res) => {
    try {
        let blockproducts = await Product.find({ $and: [{ resname: { $eq: req.user.id } }, { block: { $eq: true } }] }).populate('resname').exec();
        return res.render("Blockproducts", {
            bproduct: blockproducts
        });
    } catch (error) {
        res.json(error.message)
    }
}


module.exports.uploadproduct = async (req, res) => {
    try {
        let products = await Product.find({})
        const resname = await Restaurant.findById(req.user.id)
        let categories = await Categories.find({})
        return res.render("Addproduct", {
            prod: products,
            nameres: resname,
            cate :categories,
            message: req.flash('message')
        });

    } catch (error) {
        res.json(error.message)
    }
}

module.exports.addproduct = async (req, res) => {
    const { category, itemname, itemtype, price, description } = req.body
    const img = req.file.path
    if (!category || !itemname || !itemtype || !price || !description || !img) {
        res.status(422).json({ error: "Something is Empty" });
    }

    try {
        const products = await new Product({ resname: req.user.id, category, itemname, itemtype, price, description, img })
        await products.save();
        req.flash('message', 'Product Upload  Successfully!')
        res.redirect("back")

    } catch (error) {
        return res.json(error.message)
    }
}
module.exports.deleleproducts = async (req, res) => {
    try {
        const data = await Product.findByIdAndDelete(req.params.id)
        deleteImg(data.img)
        req.flash('message', 'Restuarent delete successfully!')
        res.redirect("back")
    } catch (error) {
        res.send(error.message)
    }
}
module.exports.updateproduct = async (req, res) => {
    try {
        const id = req.params.id
        let products = await Product.findById(req.params.id)
        const resname = await Restaurant.findById(req.user.id)
        const category = await Categories.find({})
        res.render("Updateproduct", {
            nameres: resname,
            product: products,
            cate :category
        })
    } catch (error) {
        res.json(error.message)
    }
}

module.exports.updateproducts = async (req, res) => {
    let id = req.params.id;
    const img = req.file.path;
    const data = await Product.findByIdAndUpdate(id);
    try {
        if (img) {
            deleteImg(data.img)
            data.img = img
        }
        data.price = req.body.price
        data.description = req.body.description
        data.save()
        req.flash('message', 'Product update Successfully!')
        res.redirect('/ManageProduct')

    } catch (error) {
        res.json(error.message)
    }
}
