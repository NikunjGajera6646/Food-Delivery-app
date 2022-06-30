const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const enquerySchema = new Schema({
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

const Enquery = mongoose.model("Enquery", enquerySchema, "enquery")

module.exports = Enquery;
