const { FaleConosco } = require('../database/models')

const FaleConoscoController = {
    viewForm: (req, res) => {
        return res.render('fale_conosco', { title: 'Fale Conosco', linkHome:'/', linkLogin: '/', loginCadastroUsuario: 'Cadastro'})
    },
    envioForm: async (req, res) => {
        let {nome, email, mensagem} = req.body

        await FaleConosco.create({
            nome,
            data: new Date(),
            mensagem,
            email
        })

        res.locals.mensagemEnviada = true
        return res.render('fale_conosco', { title: 'Fale Conosco', linkHome:'/', linkLogin: '/', loginCadastroUsuario: 'Cadastro'})
    }
}

module.exports = FaleConoscoController