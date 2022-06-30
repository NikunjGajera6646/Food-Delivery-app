const MainAdmin = require("../models/MainAdmin");
const jwt = require("jsonwebtoken");

const MainAdminAuth = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        const verifyUser = jwt.verify(token, process.env.SECRET_KEY_ADMIN);
        // console.log(verifyUser);

        const user = await MainAdmin.findOne({ _id: verifyUser._id });

        req.token = token;
        req.user = user;
        // console.log("this user is login now", req.user);
        next();
    } catch (error) {
        res.send(error.message);
    }
}

module.exports = MainAdminAuth;