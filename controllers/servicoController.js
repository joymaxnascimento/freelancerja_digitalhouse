const { TipoServico, Servico } = require('../database/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

const { validationResult } = require('express-validator')

const CadServicoController = {
    viewForm: async (req, res) => {

        let tiposServicos = await TipoServico.findAll({ order: ['servico'] })

        return res.render('cadastro_servico_cliente', {
            title: 'Propor Serviço',
            linkHome: '/inicio',
            tiposServicos: tiposServicos,
            loginCadastroUsuario: req.session.usuario.nome,
            linkLogin: '/',
            formulario: 'formCadastroServico'
        })
    },
    salvarForm: async (req, res) => {

        let erros = validationResult(req)

        if (erros.isEmpty()) {

            let tiposServicos = await TipoServico.findAll({order: ['servico']})
            
            const { idtipo_servico, descricao, valor_a_pagar, data_entrega } = req.body

            await Servico.create({
                idusuario_cliente: req.session.usuario.idusuario,
                idtipo_servico,
                descricao,
                valor_a_pagar,
                data_entrega
            })

            res.locals.servicoCriado = true

            return res.render('cadastro_servico_cliente', {
                title: 'Propor Serviço',
                linkHome:'/inicio',
                tiposServicos: tiposServicos,
                loginCadastroUsuario: req.session.usuario.nome,
                linkLogin: '/',
                formulario:'formCadastroServico'
            })

        } else {

            let tiposServicos = await TipoServico.findAll({ order: ['servico'] })

            return res.render('cadastro_servico_cliente', {
                title: 'Propor Serviço',
                linkHome: '/inicio',
                tiposServicos: tiposServicos,
                loginCadastroUsuario: req.session.usuario.nome,
                linkLogin: '/',
                formulario: 'formCadastroServico',
                erros: erros.mapped(),
                dadosAntigos: req.body
            })
        }
    }
}

module.exports = CadServicoController