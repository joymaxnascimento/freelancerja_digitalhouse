const { Usuario } = require('../database/models')
const bcrypt = require('bcryptjs')

const UsuarioController = {
    viewForm: async (req, res) => {

        let usuarios = await Usuario.findAll({ order: ['nome'] })

        return res.render('cadastro_usuario', { title: 'Cadastro de Usuário', linkHome:'/', usuarios: usuarios, loginCadastroUsuario: 'Login', linkLogin: '/'})
    },
    salvarForm: async (req, res) => {
        const { nome, senha, email } = req.body

        const salvar = await Usuario.create({
            nome,
            senha: bcrypt.hashSync(senha, 10),
            data_cadastro: new Date(),
            data_atualizacao: new Date(),
            email,
            status: 1
        })

        res.render('cadastro_usuario_criado', { title: 'Cadastro Criado', linkHome:'/', loginCadastroUsuario: nome, linkLogin: '/' })
        
    },

    loginForm: (req, res) => {
        res.render('login', { title: 'Login', linkHome:'/', loginCadastroUsuario: 'Cadastro', linkLogin: '/cadastro' })
    },

    logarUsuario: async (req, res) => {
        let { email, senha } = req.body

        let usuarioLogado = await Usuario.findOne({ where: { email: email } })

        if (!bcrypt.compareSync(senha, usuarioLogado.senha)) {
            return res.send('Senha inválida!')
        }

        req.session.usuario = usuarioLogado

        res.render('inicio', { title: 'Início', linkHome:'/inicio', loginCadastroUsuario: req.session.usuario.nome, linkLogin: '/'})
    },

    logoutUsuario: (req, res) => {
        req.session.destroy()
        res.redirect('/')
    }
}

module.exports = UsuarioController