module.exports = {
    authenticated: (req, res, next) => {
        if (req.isAuthenticate) {
            return (next)
        } 
        res.redirect('/users/login')
    }
}