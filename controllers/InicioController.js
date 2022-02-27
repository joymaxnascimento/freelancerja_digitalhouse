const FaleConoscoController = {
    inicio: (req, res) => {
        return res.render('inicio', { title: 'Freelancer JÁ', linkHome: '/inicio', loginCadastroUsuario: req.session.usuario.nome, linkLogin: '/' })
    }
}

module.exports = FaleConoscoController