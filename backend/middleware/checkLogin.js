module.exports.checklogin = (req,res,next) => {
    if(req.isAuthenticated()) {
        return next()
    }
    return res.redirect('Login')
}

module.exports.checkAdmin = (req,res,next) => {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    return next()
}