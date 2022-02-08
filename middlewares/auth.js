function auth(req, res, next){
    if(typeof(req.session.usuario) != undefined){
        return next()
    }else{
        return res.redirect('/')
        //return res.render('login', { title: 'Login', loginCadastroUsuario: 'Cadastro', linkLogin: '/cadastro' })
    }
}

module.exports = auth