const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const stateSchema = new Schema({
    state: {
        type: String,
        required: true
    },

}, { timestamps: true })

const State = mongoose.model("State", stateSchema, "state")

module.exports = State
