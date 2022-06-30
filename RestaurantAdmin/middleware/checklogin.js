module.exports.checklogin = (req,res,next) => {
    if(req.isAuthenticated()) {
        return next()
    }
    return res.redirect('Login')
}

