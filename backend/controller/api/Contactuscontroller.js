const Contactus = require("../../models/Contactus")


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