const User = require("../../models/User")
const flash = require('connect-flash');


module.exports.manageUser = async (req, res) => {
    try {
        let posts = await User.find({})
        // console.log(posts)
        return res.render("ManageUser", {
            data: posts,
            message: req.flash('message')
        });

    } catch (error) {
        res.send(error.message)
    }
}

module.exports.user = async (req, res) => {
    try {
        const userData = await User.find({})
        res.json({ UserData: userData })
    } catch (error) {
        res.json(error.message)
    }
}

module.exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        req.flash('message', 'User delete successfully!')
        res.redirect("back")
    } catch (error) {
        res.json(error.message)
    }
}

