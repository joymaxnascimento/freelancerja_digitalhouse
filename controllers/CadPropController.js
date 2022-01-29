const { TipoServico, Servico, Proposta } = require('../database/models')

let CadPropController = {
    viewForm: async (req, res) =>{

        let tiposServicos = await TipoServico.findAll({order: ['servico']})

        let servicos = await Servico.findAll({order: ['descricao'], include: {
            model: Proposta,
            required: false
        }})

        return res.render('cadastro_proposta_freelancer', {title: 'Proposta', tiposServicos: tiposServicos, servicos: servicos})
    },
    salvarForm: async (req, res) => {

        `idproposta`,`valor_proposto_freelancer`,`aceite_cliente`,`idusuario_freelancer`

        const {idservico, idusuario_freelancer, valor_proposto_freelancer} = req.body

        console.log('\n\n req_body proposta_controller \n\n')

        console.log(req.body)

        const salvar = await Proposta.create({
            idservico, 
            idusuario_freelancer, 
            valor_proposto_freelancer,
            aceite_cliente: 0
        })

        res.render('propostacriada', {title: 'Proposta Criada'})
        console.log('salvar form proposta\n\n' + salvar)
    }
}

module.exports = CadPropController