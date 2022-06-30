const Restaurant = require("../models/Restaurant");
const jwt = require("jsonwebtoken");

const RestuarantAuth = async (req, res, next) => {
    try {
        const token = req.cookies.resadmin;
        const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
        const user = await Restaurant.findOne({ _id: verifyUser._id });
        req.token = token;
        req.user = user;
        next();
    } catch (error) {
        res.send(error.message);
    }
}

module.exports = RestuarantAuth;