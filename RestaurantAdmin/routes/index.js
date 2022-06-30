const express = require('express')
const routes = express.Router()
const jwt = require("jsonwebtoken")
const authController = require('../controller/authcontroller')
const productController = require('../controller/productcontroller')
const orderController = require('../controller/ordercontroller')
const DashboardController = require('../controller/Dashboardcontroller')
const PendingController  = require("../controller/Pendingcontroller")
const cancelcantroller = require('../controller/cancelcontroller')
const dispatchcontroller = require("../controller/dispatchontroller")
const processcontroller = require("../controller/processcontroller")
const deliveredcontroller = require("../controller/deliveredcontroller")
const RestuarantAuth = require('../middleware/RestuarantAuth')
const upload = require("../middleware/singleimg")


routes.get("/", authController.login)
routes.post("/login",authController.restuarantlogin)
routes.get("/Logout", RestuarantAuth, authController.logout)
routes.get("/Resrestaurent",authController.resregister)
routes.post("/RegisterRestaurant", upload.single("img"), authController.registerRestaurant)

routes.get("/dashboard", RestuarantAuth, DashboardController.dashboard)

routes.get("/product", RestuarantAuth, productController.uploadproduct)
routes.post("/addproduct", RestuarantAuth, upload.single("img"), productController.addproduct)
routes.get("/Updateproduct/:id",RestuarantAuth, productController.updateproduct)
routes.post("/Updateproduct/:id",upload.single("img"),productController.updateproducts)

routes.get("/Blockproducts",RestuarantAuth,productController.blockproduct)

routes.get("/manageproduct", RestuarantAuth, productController.manageproduct)
routes.get("/deleteproduct/:id", productController.deleleproducts)

routes.get("/profile",RestuarantAuth,authController.resprofile)
routes.get("/editprofile/:id",RestuarantAuth,authController.editpage)
routes.post("/editprofile/:id",upload.single("img"),authController.editprofile)

routes.get("/Allorder",RestuarantAuth,orderController.orderstatus)
routes.get("/orderget",RestuarantAuth, orderController.orderget)
routes.get("/pendingorder",RestuarantAuth,PendingController.pendingstatus)
routes.post("/pendingconfirm/:id",RestuarantAuth,PendingController.pendingconfirm)
routes.post("/pendingcancel/:id",RestuarantAuth,PendingController.pendingcancel)
routes.get("/Cancelorder",RestuarantAuth,cancelcantroller.cancelorder)

routes.get("/processorder",RestuarantAuth,processcontroller.processorder)
routes.post("/processconfirm/:id",RestuarantAuth,processcontroller.processconfirm)

routes.get("/dispatchorder",RestuarantAuth,dispatchcontroller.dispatchdorder)
routes.post("/dispatchconfirm/:id",RestuarantAuth,dispatchcontroller.dispatchconfirm)

routes.get("/deliverdorder",RestuarantAuth,deliveredcontroller.deliveredorder)
// routes.post("/sucessorder/:id",RestuarantAuth,successcontroller.successconfirm)
module.exports = routes;
