const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
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
    email: {
        type: String,
        required: true
    },
    resname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    openclosetime: {
        type: String,
    },
    img: {
        type: String,
        required: true
    },
    contactno: {
        type: Number,
        maxlength: 10,
        minlength: 10,
        required: true
    },
    block: {
        type: Boolean,
        required: true,
        default: false
    },
    products: [{
        type: Schema.Types.ObjectId
    }],
    token: {
        type: String
    }
}, { timestamps: true })


restaurantSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
        console.log(this.password);
    }
    next();
})

restaurantSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this.id }, process.env.SECRET_KEY);
        this.token = await token;
        await this.save();
        return token;
    } catch (error) {
        console.log(error.message);
    }
}

const Restaurant = mongoose.model("Restaurant", restaurantSchema, "restaurant")

module.exports = Restaurant;
