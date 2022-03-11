const FaleConoscoController = {
    viewForm: (req, res) => {
        return res.render('fale_conosco', { title: 'Fale Conosco', linkHome:'/', linkLogin: '/', loginCadastroUsuario: 'Cadastro'})
    },
    envioForm: (req, res) => {
        res.locals.mensagemEnviada = true
        return res.render('fale_conosco', { title: 'Fale Conosco', linkHome:'/', linkLogin: '/', loginCadastroUsuario: 'Cadastro'})
    }
}

module.exports = FaleConoscoController