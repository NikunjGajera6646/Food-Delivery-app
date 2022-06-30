const Restaurant = require('../models/Restaurant')
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs')
const flash = require('connect-flash');
const deleteImg = require("../middleware/deleteImg")
const Area = require("../models/Area")
const State = require("../models/State")
const StateCity = require("../models/stateCity")


module.exports.resregister = async (req, res) => {
    try {
        let state = await State.find({})
        let statecity = await StateCity.find({})
        let area = await Area.find({})
        let restaurant = await Restaurant.find({})
        return res.render("resregistration", {
            res: restaurant,
            state: state,
            statecity: statecity,
            area: area,
            message: req.flash('message'),
            messages: req.flash('messages'),
            messagess: req.flash('messagess')
        });
    } catch (error) {
        res.json("mobile number is not valid")
    }
}

module.exports.registerRestaurant = async (req, res) => {
    const { state, city, area, resname, address, type, contactno, email, password, cpassword } = req.body
    const img = req.file.path;
    if (!state || !city || !area || !resname || !address || !type || !contactno || !email || !img || !password || !cpassword) {
        // res.status(422).json({ error: "Something is Empty" });
        res.redirect("back")
    }

    try {
        if (password !== cpassword) {
            req.flash('messagess', 'password not match!')
            res.redirect('back')

        } else {
            if (contactno.length === 10) {

                const restaurant = new Restaurant({ state, city, area, resname, email, address, type, contactno, img, password })
                await restaurant.save();
                req.flash('message', 'Restaurant Registered Successfully!')
                res.redirect("/")
            }
            else {
                req.flash('messages', 'mobile number is not valid!')
            }
        }


    } catch (error) {
        res.json(error.message)
    }

}


module.exports.login = async (req, res) => {
    try {
        return res.render("Login");

    } catch (error) {
        res.send(error.message)
    }
}

module.exports.restuarantlogin = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            // res.status(400).json({ error: "Please Fill Data" })
            res.redirect("/")
        }
        else {
            const availableuser = await Restaurant.findOne({ email: email })
            const isMatch = await bcrypt.compare(password, availableuser.password)
            if (!availableuser) {
                // res.status(400).json({ message: "Something went wrong" });
                res.redirect("/")
            }
            else {
                if (isMatch) {
                    const token = await availableuser.generateAuthToken();
                    res.cookie("resadmin", token, {
                        expires: new Date(Date.now() + 20000000000),
                        httpOnly: true
                    });
                    res.redirect("Dashboard")
                    // res.json({ message: "Restuarant Signin Successfully" });
                }
                else {
                    res.redirect("/")
                }
            }
        }

    } catch (error) {
        res.json(error.message)
    }
}
module.exports.logout = async (req, res) => {
    try {
        console.log(req.user.token)
        // res.user.token = "null";
        res.clearCookie("resadmin");
        await req.user.save();
        res.redirect("/");
    } catch (error) {
        res.send(error.message);
    }
}
module.exports.resprofile = async (req, res) => {
    try {
        const id = req.user.id
        let restaurant = await Restaurant.find(req.user)
        return res.render("Profile", {
            res: restaurant,
            message: req.flash('message')
        });
    } catch (error) {
        res.json(error.message)
    }
}

module.exports.editpage = async (req, res) => {
    try {
        const id = req.user.id
        let restaurant = await Restaurant.findById(id)
        let area = await Area.find({})
        res.render("editprofile", {
            res: restaurant,
            area: area
        })
    } catch (error) {
        res.json(error.message)
    }
}
module.exports.editprofile = async (req, res) => {
    let id = req.params.id;
    const img = req.file.path;
    console.log(req.body)
    const data = await Restaurant.findByIdAndUpdate(id);
    try {
        if (img) {
            deleteImg(data.img)
            data.img = img
        }
        data.contactno = req.body.contactno
        data.address = req.body.address
        data.type = req.body.type
        data.save()
        req.flash('message', 'Restaurant Edit Successfully!')
        res.redirect('/Profile')
    } catch (error) {
        res.json(error.message)
    }
}