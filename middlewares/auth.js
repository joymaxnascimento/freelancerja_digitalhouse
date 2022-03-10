function auth(req, res, next) {
    if (req.session.usuario) {
        return next()
    } else {
        return res.redirect('/')
    }
}

module.exports = auth