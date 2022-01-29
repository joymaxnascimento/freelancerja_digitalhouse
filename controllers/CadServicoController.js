const { TipoServico, Servico } = require('../database/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op


const  CadServicoController = {
     viewForm: async (req, res) =>{
        
        let tiposServicos = await TipoServico.findAll({order: ['servico']})

        return res.render('cadastro_servico_cliente', {title: 'Propor Serviço', tiposServicos: tiposServicos})
    },
    salvarForm: async (req, res) => {
        const {idusuario_cliente, idtipo_servico, descricao, valor_a_pagar, data_entrega} = req.body

        console.log(req.body)

        const salvar = await Servico.create({
            idusuario_cliente,
            idtipo_servico,
            descricao,
            valor_a_pagar,
            data_entrega
        })

        res.render('servicocriado', {title: 'Serviço Criado'})
        console.log('salvar form servico\n\n' + salvar)
    }
}

module.exports = CadServicoController