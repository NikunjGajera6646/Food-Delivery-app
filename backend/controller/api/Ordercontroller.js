const AddToCart = require("../../models/AddToCart");
const Orders = require("../../models/Orders")


module.exports.orders = async (req, res) => {
    const { uid, pid, rid, quantity, cartid, PaymentType, totalamount, Paymentstatus } = req.body
    if (!uid || !pid) {
        res.status(422).json({ error: "Something is Empty" });
    }

    try {
        const orders = new Orders({ uid, pid, rid, quantity, PaymentType, totalamount, Paymentstatus })
        await orders.save();
        const cart = await AddToCart.findByIdAndDelete(cartid)
        res.status(201).json({ message: "Order Placed Successfully" });
    } catch (error) {
        res.json(error.message)
    }
}


module.exports.status = async (req, res) => {
    try {
        const ordersdata = await Orders.find({ uid: req.user.id }).populate('uid')
            .populate({
                path: 'pid',
                populate: {
                    path: 'resname'
                }
            })
        console.log(ordersdata);
        return res.json({ ordersdata })

    } catch (error) {
        return res.json(error.message)
    }
}


module.exports.orderscancel = async (req, res) => {
    try {
        const cancelorder = await Orders.findByIdAndUpdate(req.params.id, {
            cancel: true,
            pending: false
        })
        return res.json('Order Calceled')
    } catch (error) {
        return res.json(error.message)
    }
}
