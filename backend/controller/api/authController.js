const User = require("../../models/User")
const bcrypt = require("bcryptjs")

module.exports.login = async (req, res, next) => {
    try {
        // console.log("Hello I am Here", req.body)
        const { email, password } = req.body

        if (!email || !password) {
            res.status(400).json({ error: "Please Fill Data" })
        }
        else {
            const availableuser = await User.findOne({ email: email })
            const isMatch = await bcrypt.compare(password, availableuser.password);
            if (!availableuser) {
                res.status(400).json({ message: "Something went wrong", success: 0 });
            }
            else {
                if (isMatch) {
                    const token = await availableuser.generateAuthToken()
                    const user = User.findOneAndUpdate({ email: email }, { token: token })
                    res.cookie("jwt", token, {
                        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
                        httpOnly: true
                    });
                    res.status(200).json({ message: "User Signin Successfully", user: availableuser, success: 1 });
                }
                else {
                    res.status(400).json({ message: "Password is Wrong", success: 0 })
                }
            }
        }
        next()
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
            res.json("password not match")
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

module.exports.updateuser = async (req, res) => {

    const { username, address, mobile } = req.body
    try {
        if (req.user) {
            const updateUser = await User.findByIdAndUpdate(req.user, { username, address, mobile })
            res.status(201).json({ message: "Your's Data Updated Successfully" })
        }
        else {
            res.status(401).json({ message: "No User Found" });
        }
    } catch (error) {
        res.json(error.message)
    }
}

module.exports.userdata = (req, res) => {
    try {
        const user = req.user
        // console.log("knkasxloaskl", req.user);
        return res.status(200).json(user)
    } catch (error) {
        res.json(error)
    }
}