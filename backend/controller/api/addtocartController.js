const User = require("../../models/User")
const Product = require("../../models/Product")
const AddToCart = require("../../models/AddToCart")
const bcrypt = require("bcryptjs")

module.exports.cart = async (req, res) => {
    try {
        const pid = req.params.id
        // console.log(pid);
        let product = await User.findById(req.user);
        if (!product.cart.includes(pid)) {
            product.cart.push(req.params.id)
            await product.save();
            res.json("added successfully")
        } else {
            res.json("somewent wrong")
        }
    } catch (error) {
        res.json(error.message)
    }
}

module.exports.addfav = async (req, res) => {
    try {
        const pid = req.params.id
        const userId = req.user.id
        const addtocart = await AddToCart.find({ userId })
        const { count } = req.body
        const filterData = addtocart.filter((data) => {
            return data.product == pid
        })
        // console.log(filterData)
        if (!count) {
            res.json("Something is empty")
        }
        else {
            if (!filterData[0]) {
                const cart = new AddToCart({ userId, product: pid, count })
                await cart.save()
                res.json("Created Successfully")
            }
            else {
                res.json("already exists")
            }
        }
    }
    catch (error) {
        res.json(error.message)
    }
}

module.exports.fetchcart = async (req, res) => {
    try {
        const cartitem = await AddToCart.find({ userId: req.user.id })
            .populate('userId')
            .populate({
                path: 'product',
                populate: {
                    path: 'resname'
                }
            })
        // console.log(cartitem);
        if (cartitem) {
            res.json({ message: "Item get Successfully", cartdata: cartitem })
        }
        else {
            res.json("No item found in cart")
        }
    } catch (error) {
        res.json(error.message)
    }
}

module.exports.deletecartitem = async (req, res) => {
    try {
        const params = req.params.id
        const remove = await AddToCart.findByIdAndDelete(params)
        const data = await AddToCart.find({ userId: remove.userId }).populate('userId')
            .populate({
                path: 'product',
                populate: {
                    path: 'resname'
                }
            })
        return res.json({ msg: "Remove successfully", data })
    } catch (error) {
        return res.json(error.message)
    }
}