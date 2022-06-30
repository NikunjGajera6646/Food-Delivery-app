const Orders = require("../../models/Orders")

module.exports.bill = async (req, res) => {
    try {
        const billdata = await Orders.find({ $and: [{ uid: { $eq: req.user.id } }, { success: { $eq: true } }] }).populate('uid')
            .populate({
                path: 'pid',
                populate: {
                    path: 'resname'
                }
            })
        // console.log(billdata)
        return res.json(billdata)
    } catch (error) {
        return res.json(error.message)
    }
}