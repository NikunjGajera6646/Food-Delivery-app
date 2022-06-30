const User = require("../models/User");
const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
        // console.log(verifyUser);

        const user = await User.findOne({ _id: verifyUser._id });

        req.token = token;
        req.user = user;
        // console.log("this user is login now", req.user);
        next();
    } catch (error) {
        res.send(error.message);
    }
}

module.exports = userAuth;