const { TipoServico, Servico, Proposta, Usuario } = require('../database/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

let CadPropController = {
  viewForm: async (req, res) => {

    let tiposServicos = await TipoServico.findAll({ order: ['servico'] })

    let servicos = await Servico.findAll({
      where: { [Op.not]: { idusuario_cliente: req.session.usuario.idusuario }},
      order: ['data_entrega', 'descricao'],
      include: [{ model: Proposta, required: false},
      { model: TipoServico, required: false },
      { model: Usuario, required: false },
      ]
    })

    return res.render('lista_servicos_freelancer',
      {
        title: 'Proposta',
        linkHome: '/inicio',
        tiposServicos: tiposServicos,
        servicos: servicos,
        loginCadastroUsuario: req.session.usuario.nome,
        linkLogin: '/',
        formulario: 'formListaServicos'
      })
  },
  redirectForm: (req, res) => {

    let { idservico } = req.body

    return res.render('cadastro_proposta_freelancer',
      {
        title: 'Proposta',
        linkHome: '/inicio',
        loginCadastroUsuario: req.session.usuario.nome,
        linkLogin: '/', 
        servico_idservico: idservico
      })
  },
  salvarForm: async (req, res) => {

    const { idservico, valor_proposto_freelancer, descricao } = req.body

    await Proposta.create({
      idservico,
      idusuario_freelancer: req.session.usuario.idusuario,
      valor_proposto_freelancer,
      descricao,
      aceite_cliente: 0
    })

    return res.render('propostacriada',
      {
        title: 'Proposta Criada',
        linkHome: '/inicio',
        loginCadastroUsuario: req.session.usuario.nome,
        linkLogin: '/'
      })
  },
  viewPropostas: async (req, res) => {

    let listaPropostas = await Proposta.findAll({
      include:[
        {model: Servico, include: [
          {model: TipoServico}
        ],
        required: true,
        where: {
          idusuario_cliente: req.session.usuario.idusuario
        }}
      ],
      where: {aceite_cliente: false}
    })

    let listaServicos = await Servico.findAll({where: {idusuario_cliente: req.session.usuario.idusuario}, order: ['idservico']})

    return res.render('lista_propostas_cliente',
    {
      title: 'Propostas Recebidas',
      linkHome: '/inicio',
      loginCadastroUsuario: req.session.usuario.nome,
      linkLogin: '/',
      formulario: "formListaPropostas",
      propostas: listaPropostas,
      listaServicos
    })
  },
  aceitarProposta: async (req, res) => {

    let { idproposta } = req.body
    
    await Proposta.update(
      {aceite_cliente: true},
      {where: {'idproposta': idproposta}}).then(res.redirect('../proposta/listapropostas'))
  }
}

module.exports = CadPropController