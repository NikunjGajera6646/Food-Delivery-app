require('dotenv').config()
require("./config/db")
const express = require('express')
const app = express()
const routes = require('./routes')
var cookie = require("cookie-parser")
var flash = require('connect-flash')
const cors = require("cors")
const stripe = require("stripe")("sk_test_51KnyReSDCz2BE6zEELgflvZX32ROhdZaW9PMApQRUstQlOgnriHyJxagHrAVKxeQvU34SRvXghesh1vPvnYzuQjG00drQ9BmJh")
const  uuid = require("uuid");
app.use(cors({ credentials: true, origin: ["http://localhost:3000"] }))


app.use(flash())
app.use(cookie())
app.set('view engine', 'ejs')
app.use(express.static('./'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(routes);

app.listen(process.env.PORT, () => {
    console.log(`port is listening on ${process.env.PORT}`);
})
