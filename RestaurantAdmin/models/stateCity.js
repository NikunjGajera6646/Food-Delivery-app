const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const stateCitySchema = new Schema({
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },

}, { timestamps: true })

const StateCity = mongoose.model("StateCity", stateCitySchema, "stateCity")

module.exports = StateCity;
