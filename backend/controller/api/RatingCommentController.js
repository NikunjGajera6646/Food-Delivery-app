const Product = require("../../models/Product")

module.exports.rating = async (req, res) => {
    try {
        const pid = req.params.id
        const user = req.user.id
        const product = await Product.findById(pid)

        const filterData = product.rating.filter((data) => {
            return data.user == req.user.id
        })
        // console.log("data", filterData)

        const { rate } = req.body
        // console.log("body", rate)
        if (!rate) {
            res.json("Something is empty")
        }
        else {
            if (!product.rating.includes(req.user.id)) {
                product.rating.push({ user, rate })
                await product.save()
                res.json("added successfully")
            }

            else {
                res.json("already exists")
            }
        }
    } catch (err) {
        res.json(err.message);
    }
}

module.exports.comment = async (req, res) => {
    try {
        const pid = req.params.id
        const user = req.user.id
        const product = await Product.findById(pid)
        const filterData = product.comment.filter((data) => {
            return data.user == req.user.id
        })
        const { commenttext } = req.body
        if (!commenttext) {
            res.json("Something is empty")
        }
        else {
            if (!product.comment.includes(req.user.id)) {
                product.comment.push({ user, commenttext })
                await product.save();
                res.json("added successfully")
            }

            else {
                res.json("already exists")
            }
        }
    } catch (err) {
        res.json(err.message);
    }
}

module.exports.viewcomment = async (req, res) => {
    try {
        const id = req.params.id
        const products = await Product.find({ id })
        return res.json({ message: "Successfull", data: products })
    } catch (err) {
        return res.json(err.message);
    }
}

module.exports.countrating = async (req, res) => {
    try {
        const id = req.params.id
        const products = await Product.find({ id })
        return res.json({ message: "Successfull", data: products })
    } catch (err) {
        return res.json(err.message);
    }
}