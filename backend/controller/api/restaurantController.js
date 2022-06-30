const Restaurant = require("../../models/Restaurant")
var flash = require('connect-flash');


module.exports.restaurants = async (req, res) => {

    try {

        const fetchRestaurants = await Restaurant.find({});
        res.status(200).json(fetchRestaurants)

    } catch (error) {
        res.json(error.message)
    }
}


module.exports.restaurant = async (req, res) => {

    try {
        const paramsid = req.params.id
        // console.log("This is params", paramsid);
        if (paramsid) {
            const fetchRestaurant = await Restaurant.findOne({ _id: req.params.id });
            res.status(200).json(fetchRestaurant)
        }
        else {
            res.json("No Restaurant Found")
        }

    } catch (error) {
        res.json(error.message)
    }
}

module.exports.cities = async (req, res) => {

    try {
        const cityname = req.params.name
        const fetchCities = await Restaurant.find({ city: cityname });
        res.status(200).json(fetchCities)

    } catch (error) {
        res.json(error.message)
    }
}

module.exports.registerRestaurant = async (req, res) => {

    const { state, city, email, resname, password, address, type, contactno } = req.body
    const img = req.file.filename

    if (!state || !city || !email || !password || !resname || !img || !address || !type || !contactno) {
        res.status(422).json({ error: "Something is Empty" });
    }

    try {
        // console.log("regres inside try", req.user);
        if (contactno.length === 10) {

            const restaurant = new Restaurant({ state, city, email, password, resname, img, address, type, contactno })
            await restaurant.save();
            res.status(200).json({ message: "Restaurant Registered Successfully" });

        }
        else {
            res.json("mobile number is not valid")
        }

    } catch (error) {
        res.json(error.message)
    }
}

module.exports.singlerestaurants = async (req, res) => {

    try {
        const paramsid = req.params.id
        const SingleRestaurant = await Restaurant.findById({ _id: paramsid });
        res.status(200).json(SingleRestaurant)

    } catch (error) {
        res.status(404).json(error.message)
    }
}