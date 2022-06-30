const Contactus = require("../../models/Contactus")


module.exports.manageContacts = async (req, res) => {
    try {
        let contactus = await Contactus.find({})
        // console.log(posts)
        return res.render("ManageContacts", {
            con: contactus,
            message: req.flash('message')
        });

    } catch (error) {
        res.send(error.message)
    }
}

module.exports.deleteContact = async (req, res) => {
    try {
        console.log("i am called")
        await Contactus.findByIdAndDelete(req.params.id)
        req.flash('message', 'Contactus delete successfully!')
        res.redirect("back")
    } catch (error) {
        res.send(error.message)
    }
}

module.exports.contactus = async (req, res) => {
    const { name, mobile, email, message } = req.body
    if (!name || !mobile || !email || !message) {
        res.status(422).json({ error: "Something is Empty" });
    }
    try {
        if (mobile.length === 10) {
            const contactusa = new Contactus({ name, mobile, email, message })
            await contactusa.save();
            res.json("Your Message send successfully")
        }
        else {
            res.json("mobile number is not valid")
        }
    } catch (error) {
        res.json(error.message)
    }
}