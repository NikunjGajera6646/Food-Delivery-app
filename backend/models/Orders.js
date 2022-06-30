const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ordersSchema = new Schema({
    uid: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    pid: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    rid: {
        type: Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    totalamount: {
        type: Number,
        required: true
    },
    cancel: {
        type: Boolean,
        required: true,
        default: false
    },
    pending: {
        type: Boolean,
        required: true,
        default: true
    },
    process: {
        type: Boolean,
        required: true,
        default: false
    },
    dispatch: {
        type: Boolean,
        required: true,
        default: false
    },
    delivered: {
        type: Boolean,
        required: true,
        default: false
    },
    PaymentType: {
        type: String,
        required: true
    },
    Paymentstatus: {
        type: Boolean,
        required: true,
        default: false
    }
}, { timestamps: true })

const Orders = mongoose.model("Orders", ordersSchema, "orders")

module.exports = Orders;
