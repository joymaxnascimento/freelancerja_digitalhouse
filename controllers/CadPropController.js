const { TipoServico, Servico, Proposta } = require('../database/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

let CadPropController = {
    viewForm: async (req, res) => {

        let tiposServicos = await TipoServico.findAll({ order: ['servico'] })

        let servicos = await Servico.findAll({
            where: { [Op.not]: { idusuario_cliente: req.session.usuario.idusuario } }, order: ['descricao'], include: {
                model: Proposta,
                required: false
            }
        })

        return res.render('cadastro_proposta_freelancer', { title: 'Proposta', linkHome: '/inicio', tiposServicos: tiposServicos, servicos: servicos, loginCadastroUsuario: req.session.usuario.nome, linkLogin: '/' })
    },
    salvarForm: async (req, res) => {

        `idproposta`, `valor_proposto_freelancer`, `aceite_cliente`, `idusuario_freelancer`

        const { idservico, valor_proposto_freelancer } = req.body

        console.log('\n\n req_body proposta_controller \n\n')

        console.log(req.body)

        const salvar = await Proposta.create({
            idservico,
            idusuario_freelancer: req.session.usuario.idusuario,
            valor_proposto_freelancer,
            aceite_cliente: 0
        })

        res.render('propostacriada', { title: 'Proposta Criada', linkHome: '/inicio', loginCadastroUsuario: req.session.usuario.nome, linkLogin: '/' })
        console.log('salvar form proposta\n\n' + salvar)
    }
}

module.exports = CadPropController