const FaleConoscoController = {
    inicio: (req, res) => {
        return res.render('inicio', { title: 'Freelancer JÁ', linkHome: '/', loginCadastroUsuario: req.session.usuario.nome, linkLogin: '/' })
    }
}

module.exports = FaleConoscoController