const ErrorController = {
    view: (err, req, res, next) =>{
        res.locals.message = err.message
        res.locals.error = req.app.get('env') === 'developement' ? err: {}

        res.status(err.status || 500)
        res.render('error', {title: 'Erro', linkHome: '/', loginCadastroUsuario: '/', linkLogin: '/'})
    }
}

module.exports = ErrorController