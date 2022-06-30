const express = require('express')
const routes = express.Router()
const upload = require("../middleware/singleimg")
const homeController = require("../controller/homeController")
const authController = require("../controller/api/authController")
const Ordercontroller = require("../controller/api/Ordercontroller")
const productController = require("../controller/api/productController")
const Contactuscontroller = require("../controller/api/Contactuscontroller")
const restaurantController = require("../controller/api/restaurantController")
const addtocartController = require("../controller/api/addtocartController")
const stateCityController = require("../controller/api/stateCityController")
const SearchController = require("../controller/api/SearchController")
const RatingCommentController = require("../controller/api/RatingCommentController")
const billController = require("../controller/api/BillController")
const paymentcontroller = require("../controller/api/Paymentcontroller")
const userAuth = require("../middleware/userAuth")

routes.get("/", userAuth, authController.userdata)
routes.post("/createuser", authController.register)
routes.post("/updateuser", userAuth, authController.updateuser)
routes.post("/login", authController.login)
routes.post("/logout", userAuth, authController.logout)

routes.get("/restaurants", restaurantController.restaurants)
routes.get("/restaurant/:id", restaurantController.restaurant)
routes.get("/cities/:name", restaurantController.cities)

routes.get("/status", userAuth, Ordercontroller.status)
routes.post("/orders", userAuth, Ordercontroller.orders)
// routes.post("/updateuser", userAuth, homeController.updateuserinfo)

routes.post("/productsupload/:id", upload.single("img"), productController.productsUpload)
routes.get("/products/:id", productController.product)
routes.get("/products", productController.products)
routes.get("/singleproduct/:id", productController.singleproduct)
routes.get("/categories", productController.categories)

routes.post("/registerrestaurant", upload.single("img"), restaurantController.registerRestaurant)
routes.get("/singlerestaurant/:id", restaurantController.singlerestaurants)

routes.post("/addtocart/:id", userAuth, addtocartController.cart)
routes.post("/addtofav/:id", userAuth, addtocartController.addfav)
routes.get("/fetchcart", userAuth, addtocartController.fetchcart)
routes.post("/deletecart/:id", userAuth, addtocartController.deletecartitem)

routes.post("/rating/:id", userAuth, RatingCommentController.rating)
routes.post("/comment/:id", userAuth, RatingCommentController.comment)
routes.get("/viewcomment/:id", RatingCommentController.viewcomment)
routes.get("/countrating", RatingCommentController.countrating)

routes.get("/search/:name", SearchController.productsfind)
routes.get("/restaurantsearch/:name", SearchController.restaurantfind)

// routes.get("/restaurantsearch", SearchController.getcity)

routes.get("/stateandcity", stateCityController.getcitystate)

routes.post("/contactus", Contactuscontroller.contactus)
routes.post("/cancelorder/:id", Ordercontroller.orderscancel)

routes.get("/bill", userAuth, billController.bill)

routes.post("/payment", paymentcontroller.payments)

module.exports = routes;
