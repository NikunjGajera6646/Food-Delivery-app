const express = require('express');
const StateCity = require('../../models/stateCity')
const flash = require('connect-flash');
const Statetable = require('../../models/State')
const Area = require('../../models/Area')


module.exports.manageState = async (req, res) => {
    try {
        let state = await Statetable.find({})
        return res.render("ManageState", {
            state: state,
            message: req.flash('message')
        });

    } catch (error) {
        res.json(error.message)
    }
}

module.exports.insertstate = async (req, res) => {

    const { state } = req.body
    if (!state) {
        res.status(422).json({ error: "Something is Empty" });
    }
    try {

        const State = new Statetable({ state })
        await State.save();
        req.flash('message', 'State Inserted Successfully!')
        res.redirect("back")

    } catch (error) {
        res.json(error.message)
    }
}


module.exports.delelestate = async (req, res) => {
    try {
        await Statetable.findByIdAndDelete(req.params.id)
        req.flash('message', 'State deleted successfully!')
        res.redirect("back")
    } catch (error) {
        res.send(error.message)
    }
}

module.exports.manageCity = async (req, res) => {
    try {
        let state = await Statetable.find({})
        let city = await StateCity.find({})
        return res.render("Managecity", {
            state: state,
            city: city,
            message: req.flash('message')
        });

    } catch (error) {
        res.json(error.message)
    }
}

module.exports.insertCity = async (req, res) => {

    const { state, city } = req.body
    if (!state || !city) {
        res.status(422).json({ error: "Something is Empty" });
        console.log(req.body)
    }
    try {

        const State = await new StateCity({ state, city })
        await State.save();
        req.flash('message', 'City Insert Successfully!')
        res.redirect("back")

    } catch (error) {
        res.json(error.message)
    }
}


module.exports.deletecity = async (req, res) => {
    try {
        await StateCity.findByIdAndDelete(req.params.id)
        req.flash('message', 'City delete successfully!')
        res.redirect("back")
    } catch (error) {
        res.send(error.message)
    }
}

module.exports.managearea = async (req, res) => {
    try {
        let state = await Statetable.find({})
        let city = await StateCity.find({})
        let area = await  Area.find({})
        return res.render("ManageArea", {
            state: state,
            city: city,
            area: area,
            message: req.flash('message')
        });

    } catch (error) {
        res.json(error.message)
    }
}
module.exports.insertarea = async (req, res) => {

    const { state, city ,area } = req.body
    if (!state || !city || !area) {
        res.status(422).json({ error: "Something is Empty" });
        console.log(req.body)
    }
    try {

        const State = await new Area({ state, city , area})
        await State.save();
        req.flash('message', 'Area Insert Successfully!')
        res.redirect("back")

    } catch (error) {
        res.json(error.message)
    }
}
module.exports.deletearea = async (req, res) => {
    try {
        await Area.findByIdAndDelete(req.params.id)
        req.flash('message', 'Area delete successfully!')
        res.redirect("back")
    } catch (error) {
        res.send(error.message)
    }
}