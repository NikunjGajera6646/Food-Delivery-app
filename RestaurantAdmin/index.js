require('dotenv').config()
require('./config/db')
const express = require('express')
const app = express()
const routes = require('./routes')
const cookie = require("cookie-parser")
var flash = require('connect-flash');
const session = require('express-session')
const server= require('http').createServer(app);

const io = require("socket.io")(server,{
    cors:{
        origin :"*",
        methods: ["GET","POST"],
        allowedHeaders :["my-custom-header"],
        Credential: true
    }
})


app.use(session({
    name: "admin",
    resave: false,
    saveUninitialized: false,
    secret: process.env.SECRET_KEY_RESADMIN,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365
    },
    httpOnly: true
}))
app.use(flash());
app.set('view engine', 'ejs')
app.use(express.json());
app.use(cookie())
app.use(express.urlencoded({ extended: false }))
app.use(express.static('./'))

app.use(routes);

// console.log(io)
io.on('connection',(socket)=>{
  console.log("sokect connect",socket);
  console.log("socket")

  socket.on()
})

server.listen(process.env.PORT, () => {
    console.log(`port is listening on ${process.env.PORT}`);
})  
