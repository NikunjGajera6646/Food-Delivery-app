const Order = require("../../models/Orders")
const moment = require("moment")

module.exports.managePayment = async (req,res)=>{
    try {
        const orderes = await Order.find({}).populate('uid').populate({
            path: 'pid', populate: { path: 'price' }, populate: { path: 'resname' }
        })
        res.render("ManagePayment",{
            order :orderes,
            moment: moment,
        });
    } catch (error) {
        res.json(error.message)
    }
}

