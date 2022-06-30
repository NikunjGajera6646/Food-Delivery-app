const stateCity = require("../../models/stateCity")

module.exports.getcitystate = async (req, res) => {

    try {
        const statecity = await stateCity.find({})
        res.json(statecity)
    } catch (error) {
        res.json(error.message)
    }
}