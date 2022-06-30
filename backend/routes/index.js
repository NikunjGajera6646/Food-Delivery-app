const express = require('express')
const routes = express.Router()
const api = require('./api')
const admin = require("./admin")

routes.use("/admin", admin)
routes.use('/api',api)

module.exports = routes;
