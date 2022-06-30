const express = require('express');
const { checklogin } = require('../../middleware/checkLogin');


module.exports.loginadmin = async (req, res) => {
    try {
        return res.render('Login')
    } catch (error) {
        res.json(error.json)
    }
}

module.exports.loginadminpass = async (req, res) => {
    try {
        return res.redirect('Dashboard')
    } catch (error) {
        res.json(error.message)
    }

}

module.exports.logout = async (req, res) => {
    try {
        req.logout('');
        res.redirect("Login");
    } catch (error) {
        res.send(error.message);
    }
}

// module.exports.manageState = async (req, res) => {
//     try {
//         res.render('ManageState&city')
//     } catch (error) {
//         res.json(error.message)
//     }
// }
module.exports.profile = async (req, res) => {
    try {
        res.render('Profile')
    } catch (error) {
        res.json(error.message)
    }
}