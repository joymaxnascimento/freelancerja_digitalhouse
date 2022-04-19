const { Usuario } = require('../database/models')
const bcrypt = require('bcryptjs')

const { validationResult } = require('express-validator')

const UsuarioController = {
    viewForm: async (req, res) => {

        let usuarios = await Usuario.findAll({ order: ['nome'] })

        return res.render('cadastro_usuario', {
            title: 'Cadastro de Usuário',
            linkHome: '/',
            usuarios: usuarios,
            loginCadastroUsuario: 'Login',
            linkLogin: '/'
        })
    },

    salvarForm: async (req, res) => {

        let erros = validationResult(req)

        if (erros.isEmpty()) {
            const { nome, senha, email } = req.body

            await Usuario.create({
                nome,
                senha: bcrypt.hashSync(senha, 10),
                data_cadastro: new Date(),
                data_atualizacao: new Date(),
                email: email.toLowerCase(),
                status: 1
            })

            res.render('cadastro_usuario_criado', {
                title: 'Cadastro Criado',
                linkHome: '/',
                loginCadastroUsuario: nome,
                linkLogin: '/'
            })

        } else {
            res.render('cadastro_usuario', {
                title: 'Cadastro de Usuário',
                linkHome: '/',
                loginCadastroUsuario: '',
                linkLogin: '/',
                erros: erros.mapped(),
                dadosAntigos: req.body
            })
        }
    },

    loginForm: (req, res) => {
        res.render('login', {
            title: 'Login',
            linkHome: '/',
            loginCadastroUsuario: 'Cadastro',
            linkLogin: '/cadastro'
        })
    },

    logarUsuario: async (req, res) => {
        let { email, senha } = req.body

        let usuarioLogado = await Usuario.findOne({ where: { email: email.toLowerCase() } })

        if (!usuarioLogado) {
            res.redirect('/')
        } else {
            if (!bcrypt.compareSync(senha, usuarioLogado.senha)) {
                res.locals.senhainvalida = true;
                return res.render('login', {
                    title: 'Login',
                    linkHome: '/',
                    loginCadastroUsuario: 'Cadastro',
                    linkLogin: '/cadastro'
                })
            } else {
                req.session.usuario = usuarioLogado

                res.render('inicio', {
                    title: 'Início',
                    linkHome: '/inicio',
                    loginCadastroUsuario: req.session.usuario.nome,
                    linkLogin: '/'
                })
            }
        }
    },

    logoutUsuario: (req, res) => {
        req.session.destroy()
        res.redirect('/')
    }
}

module.exports = UsuarioController