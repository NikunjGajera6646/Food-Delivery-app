const express = require('express')
const routes = express.Router()
// const adminController = require("../controller/adminController")
const passport = require('passport');
const resadmincontroller = require("../controller/admin/restaurantController")
const contactController = require("../controller/admin/contactController")
const dashbordcontroller = require("../controller/admin/dashbordcontroller")
const usercontroller = require("../controller/admin/usercontroller")
const productController = require("../controller/admin/productController")
const logincontroller = require('../controller/admin/logincontroller')
const { checklogin, checkAdmin } = require('../middleware/checkLogin')
const statecontroller = require("../controller/admin/statecontroller")
const paymentcontroller = require("../controller/admin/paymentcontroller")
const blockcontroller = require("../controller/admin/blockcontroller")
const flash = require('connect-flash');
const upload = require("../middleware/singleimg")
require("../middleware/localStretagy");

const session = require('express-session')

routes.use(session({
    name: "admin",
    resave: false,
    saveUninitialized: false,
    secret: process.env.SECRET_KEY_ADMIN,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365
    }
}))

routes.use(passport.initialize())
routes.use(passport.session())

routes.get("/Login", checkAdmin, logincontroller.loginadmin)
routes.post('/logindata', passport.authenticate('local', { failureRedirect: "/admin/Login" }), logincontroller.loginadminpass)
routes.get("/Dashboard", checklogin, dashbordcontroller.dashboard)
routes.get("/logout",logincontroller.logout)

routes.get("/ManageUser", usercontroller.manageUser)
routes.get("/ManageUser/:id", usercontroller.deleteUser)

routes.get("/ManagePayment", paymentcontroller.managePayment)
// routes.get("/payments",paymentcontroller.getpaymentdata)

routes.post("/RegisterRestaurant", upload.single("img"), resadmincontroller.registerRestaurant)
routes.get("/ManageProduct", productController.manageProduct)
routes.get("/deleteproduct/:id", productController.deleleproducts)

routes.get("/ManageContacts", contactController.manageContacts)
routes.get("/ManageContacts/:id", contactController.deleteContact)

routes.get("/ManageRestaurant", resadmincontroller.manageRestuarent)
routes.get("/ManageRestaurant/:id", resadmincontroller.delelerestusrent)
routes.get("/UpdateRestaurants/:id", resadmincontroller.updaterest)
routes.post("/UpdateRestaurant/:id", upload.single("img"), resadmincontroller.updaterestuarent)

routes.get("/ManageState", statecontroller.manageState)
routes.post("/ManageState", statecontroller.insertstate)
routes.get("/ManageState/:id", statecontroller.delelestate)

routes.get("/Managecity", statecontroller.manageCity)
routes.post("/Managecity", statecontroller.insertCity)
routes.get("/Managecity/:id", statecontroller.deletecity)

routes.get("/Managearea", statecontroller.managearea)
routes.post("/Managearea", statecontroller.insertarea)
routes.get("/Managearea/:id", statecontroller.deletearea)

routes.get("/Managecategories", productController.managecategories)
routes.post("/Managecategories", productController.insertcategory)
routes.get("/Managecategories/:id", productController.delelecategory)

routes.get("/blockres", blockcontroller.blockres)
routes.get("/blockres/:id", blockcontroller.blockresdelete)
routes.get("/Blockproduct", blockcontroller.blockproduct)
routes.get("/Blockproduct/:id", blockcontroller.blockproductdelete)


// routes.get("/Profile", logincontroller.profile)


module.exports = routes;
