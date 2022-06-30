const bcrypt = require("bcryptjs")
const { findOneAndDelete, findOneAndRemove } = require("../models/Orders")
const Orders = require("../models/Orders")
const Product = require("../models/Product")
const Restaurant = require("../models/Restaurant")
// const Status = require("../models/Status")
const User = require("../models/User")
// const cookie = require("cookie-parser")

module.exports.home = (req, res) => {
    try {
        const loginuser = User.findOne(token)
        if (loginuser) {
            return res.status(200).json("Welcome To FoodZone")
        }
    } catch (error) {
        res.json(error)
    }
}

module.exports.register = async (req, res) => {
    const { username, email, password, confirmpassword, address, mobile } = req.body
    console.log("Register Data is Here", req.body);

    if (!username || !email || !password || !confirmpassword || !address || !mobile) {
        res.status(422).json({ error: "Something is Empty" });
    }

    try {
        const userExist = await User.findOne({ email: email });

        if (userExist) {
            res.status(422).json({ error: "Email Already Exist" })
        }

        if (password !== confirmpassword) {
            res.status(422).json("password not match")
        } else {
            const user = new User({ username, email, password, address, mobile })
            // const token = await user.generateAuthToken();
            // res.cookie("jwt", token, {
            //     expires: new Date(Date.now() + 20000000000),
            //     httpOnly: true
            // });
            await user.save();
            res.status(201).json({ message: "User Registered Successfully" });
        }
    } catch (error) {
        res.json(error.message)
    }
}

module.exports.login = async (req, res) => {
    try {
        console.log("Hello I am Here", req.body)
        const { email, password } = req.body

        if (!email || !password) {
            res.status(400).json({ error: "Please Fill Data" })
        }
        else {
            const availableuser = await User.findOne({ email: email })
            const isMatch = await bcrypt.compare(password, availableuser.password);
            if (!availableuser) {
                res.status(400).json({ message: "Something went wrong" });
            }
            else {
                if (isMatch) {
                    const token = await availableuser.generateAuthToken();
                    res.cookie("jwt", token, {
                        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
                        httpOnly: true
                    });
                    res.status(200).json({ message: "User Signin Successfully", user: availableuser });
                }
                else {
                    res.status(400).json({ message: "Password is Wrong" })
                }
            }
        }

    } catch (error) {
        res.json(error.message)
    }
}

module.exports.logout = async (req, res) => {
    try {
        req.user.token = null;
        res.clearCookie("jwt");
        await req.user.save();
        res.json("User Logout Successfully")
    } catch (error) {
        res.json(error.message)
    }
}

module.exports.registerRestaurant = async (req, res) => {
    const { state, city, email, name, address, type, img, contactno } = req.body

    if (!state || !city || !email || !name || !address || !type || !img || !contactno) {
        res.status(422).json({ error: "Something is Empty" });
    }

    try {

        if (contactno.length === 10) {
            const restaurant = new Restaurant({ state, city, email, name, address, type, img, contactno })
            await restaurant.save();
            res.status(201).json({ message: "Restaurant Registered Successfully" });
        }
        else {
            res.json("mobile number is not valid")
        }

    } catch (error) {
        res.json(error.message)
    }
}

module.exports.productsUpload = async (req, res) => {

    const { category, itemname, itemtype, price, description, img } = req.body

    if (!category || !itemname || !itemtype || !price || !description || !img) {
        res.status(422).json({ error: "Something is Empty" });
    }

    try {

        const resid = req.params.id
        const rest = await Restaurant.findOne({ _id: resid })
        if (rest !== null) {
            const products = await new Product({ resname: req.params.id, category, itemname, itemtype, price, description, img })
            await products.save();
            res.status(201).json({ message: "Product Uploaded Successfully" });
        }
        else {
            res.json("Restaurant Not Found")
        }

    } catch (error) {
        res.json(error.message)
    }
}

// module.exports.status = async (req, res) => {
//     const { oid, confirm, processing, dispatch, completed } = req.body

//     if (!oid || !confirm || !processing || !dispatch || !completed) {
//         res.status(422).json({ error: "Something is Empty" });
//     }

//     try {

//         const status = new Status({ oid, confirm, processing, dispatch, completed })
//         await status.save();
//         res.status(201).json({ message: "Status Updated" });

//     } catch (error) {
//         res.json(error.message)
//     }
// }

// module.exports.orders = async (req, res) => {
//     const { uid, rid, pid } = req.body

//     if (!uid || !rid || !pid) {
//         res.status(422).json({ error: "Something is Empty" });
//     }

//     try {

//         const orders = new Orders({ uid, rid, pid })
//         const status = new Status({})
//         await orders.save();
//         res.status(201).json({ message: "Order Placed Successfully" });

//     } catch (error) {
//         res.json(error.message)
//     }
// }


module.exports.updateuser = async (req, res) => {

    const { name, address, mobile } = req.body

    try {
        if (req.user) {
            const updateUser = await User.findByIdAndUpdate(req.user, { name, address, mobile })
            res.status(201).json({ message: "Your's Data Updated Successfully" });
        }
        else {
            res.status(401).json({ message: "No User Found" });
        }

    } catch (error) {
        res.json(error.message)
    }
}

module.exports.products = async (req, res) => {

    try {

        const fetchproducts = await Product.find({});
        res.json(fetchproducts)

    } catch (error) {
        res.json(error.message)
    }
}

module.exports.restaurants = async (req, res) => {

    try {

        const fetchRestaurants = await Restaurant.find({});
        res.json(fetchRestaurants)

    } catch (error) {
        res.json(error.message)
    }
}


module.exports.singlerestaurants = async (req, res) => {

    try {
        const paramsid = req.params.id
        const SingleRestaurant = await Restaurant.findById({ _id: paramsid });
        res.json(SingleRestaurant)

    } catch (error) {
        res.json(error.message)
    }
}

module.exports.categories = async (req, res) => {

    try {

        const fetchCategories = await Product.distinct("category");
        res.json(fetchCategories)

    } catch (error) {
        res.json(error.message)
    }
}

module.exports.restaurant = async (req, res) => {

    try {
        const paramsid = req.params.id
        console.log("This is params", paramsid);
        if (paramsid) {
            const fetchRestaurant = await Restaurant.findOne({ _id: req.params.id });
            res.json(fetchRestaurant)
        }
        else {
            res.json("No Restaurant Found")
        }

    } catch (error) {
        res.json(error.message)
    }
}

module.exports.product = async (req, res) => {
    try {
        const products = await Product.findById({})
    } catch (error) {
        res.json(error.message)
    }
}

module.exports.cities = async (req, res) => {

    try {
        const cityname = req.params.name
        const fetchCities = await Restaurant.find({ city: cityname });
        res.json(fetchCities)

    } catch (error) {
        res.json(error.message)
    }
}
