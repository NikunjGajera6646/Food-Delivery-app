const Restaurant = require("../../models/Restaurant")
const flash = require('connect-flash');
const deleteImg = require('../../middleware/deleteImg')
const StateCity = require("../../models/stateCity")
const State = require("../../models/State");
const Product = require("../../models/Product");
const Area = require("../../models/Area");

module.exports.manageRestuarent = async (req, res) => {
    try {
        let state = await State.find({})
        let statecity = await StateCity.find({})
        let area = await Area.find({})
        let restaurant = await Restaurant.find({ block: false })

        return res.render("ManageRestaurant", {
            res: restaurant,
            state: state,
            statecity: statecity,
            area: area,
            message: req.flash('message'),
            messages: req.flash('messages')
        });
    } catch (error) {
        res.json(error.message)
    }
}

module.exports.updaterest = async (req, res) => {
    try {
        const id = req.params.id
        let restaurant = await Restaurant.findById(id)
        let area = await Area.find({})
        res.render("Updateres", {
            res: restaurant,
            area: area
        })
    } catch (error) {
        res.json(error.message)
    }
}

module.exports.delelerestusrent = async (req, res) => {
    try {
        const falseproduct = await Product.find({ $and: [{ resname: { $eq: req.params.id } }, { block: { $eq: false } }] })
        const product = await Product.find({})
        console.log("Products data", product)
        if (falseproduct.length === 0 || product.length === 0) {
            const data = await Restaurant.findByIdAndUpdate(req.params.id, {
                block: true
            })
            deleteImg(data.img);
            req.flash('message', 'Restaurant Blocked')
            res.redirect("back")
        } else {
            req.flash('messages', 'There is product register on this restaurant')
            res.redirect("back")
        }
    } catch (error) {
        res.send(error.message)
    }
}


module.exports.updaterestuarent = async (req, res) => {
    let id = req.params.id;
    const img = req.file.path;
    const data = await Restaurant.findByIdAndUpdate(id);
    console.log(req.body)
    try {
        if (img) {
            deleteImg(data.img)
            data.img = img
        }

        //  {
        data.contactno = req.body.contactno
        data.address = req.body.address
        data.type = req.body.type
        data.area = req.body.area
        data.save()
        // })
        req.flash('message', 'Restaurant update Successfully!')
        res.redirect('/admin/ManageRestaurant')

    } catch (error) {
        res.json(error.message)
    }
}



module.exports.registerRestaurant = async (req, res) => {
    const { state, city, area, resname, address, type, contactno, email, password } = req.body
    console.log(req.file)
    const img = req.file.path;
    if (!state || !city || !area || !resname || !address || !type || !contactno || !email || !img || !password) {
        res.status(422).json({ error: "Something is Empty" });
    }

    try {
        if (contactno.length === 10) {

            const restaurant = new Restaurant({ state, city, area, resname, email, address, type, contactno, img, password })
            await restaurant.save();
            req.flash('message', 'Restaurant Registered Successfully!')
            res.redirect("back")
        }
        else {
            res.json("mobile number is not valid")
        }

    } catch (error) {
        res.json(error.message)
    }

}