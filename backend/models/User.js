const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    cart: [{
        type: [Schema.Types.ObjectId],
        ref: "Product"
    }],
    token: {
        type: String
    }
}, { timestamps: true })

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
        console.log(this.password);
    }
    next();
})

userSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this.id }, process.env.SECRET_KEY);
        this.token = await token;
        await this.save();
        return token;
    } catch (error) {
        console.log(error.message);
    }
}

const User = mongoose.model("User", userSchema, "users")

module.exports = User;
