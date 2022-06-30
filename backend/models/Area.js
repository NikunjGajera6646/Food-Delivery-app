const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AreaSchema = new Schema({
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    area: {
        type: String,
        required: true
    },


}, { timestamps: true })

const Area = mongoose.model("Area", AreaSchema, "area")

module.exports = Area;
