const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const contactSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        minlength: 10,
        maxlength: 10,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },

}, { timestamps: true })

const ContactUs = mongoose.model("ContactUs", contactSchema, "contactus")

module.exports = ContactUs;
