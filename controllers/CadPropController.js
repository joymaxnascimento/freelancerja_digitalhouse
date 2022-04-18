const { TipoServico, Servico, Proposta, Usuario } = require('../database/models')
const {Sequelize, QueryTypes, Op} = require('sequelize')
const {sequelize} = require('../database/models/index')

const { validationResult } = require('express-validator')

let CadPropController = {
  viewForm: async (req, res) => {

    let tiposServicos = await TipoServico.findAll({ order: ['servico'] })
    let servicos = await sequelize.query("\
    SELECT  * FROM servico \
    LEFT JOIN tipo_servico \
    ON servico.idtipo_servico = tipo_servico.idtipo_servico \
    WHERE idusuario_cliente <> :usuario \
    AND idservico NOT IN( \
      SELECT idservico FROM proposta \
      WHERE aceite_cliente = 1 \
      OR idusuario_freelancer = :usuario) \
    ", {
      raw: true,
      model: Servico,
      replacements: {usuario: req.session.usuario.idusuario},
      type: QueryTypes.SELECT,
      include: [
        { model: Proposta, required: false },
        { model: TipoServico, required: false },
        { model: Usuario, required: false }
      ]},
      )
    
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

    let erros = validationResult(req)
    const { idservico, valor_proposto_freelancer, descricao } = req.body

    if (erros.isEmpty()) {

      let propExistente = await Proposta.findOne({
        where: {
          [Op.and]: [
            { idservico: idservico },
            { idusuario_freelancer: req.session.usuario.idusuario }
          ]
        },
        attributes: ['idproposta', 'idservico', 'idusuario_freelancer'],
        raw: true
      })

      if (propExistente === null) {
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
      } else {
        return res.redirect('../proposta/listaservicos')
      }
    } else {
      return res.render('cadastro_proposta_freelancer',
        {
          title: 'Proposta',
          linkHome: '/inicio',
          loginCadastroUsuario: req.session.usuario.nome,
          linkLogin: '/',
          servico_idservico: idservico,
          erros: erros.mapped(),
          dadosAntigos: req.body
        })
    }
  },
  viewPropostasCliente: async (req, res) => {

    let listaPropostas = await sequelize.query("\
    SELECT idproposta, proposta.descricao, valor_proposto_freelancer, proposta.idservico \
    ,proposta.aceite_cliente \
    FROM proposta \
    LEFT JOIN servico \
    ON proposta.idservico = servico.idservico \
    LEFT JOIN tipo_servico \
    ON servico.idtipo_servico = tipo_servico.idtipo_servico \
    WHERE servico.idusuario_cliente = :usuario \
    AND proposta.aceite_cliente = 1 \
    OR proposta.idservico NOT IN( \
      SELECT idservico FROM proposta \
      WHERE aceite_cliente = 1) \
    ", {
      raw: true,
      model: Proposta,
      replacements: {usuario: req.session.usuario.idusuario},
      type: QueryTypes.SELECT
    },
      )

    let listaServicos = await Servico.findAll({ where: { idusuario_cliente: req.session.usuario.idusuario }, order: ['idservico'] })

    return res.render('lista_propostas_cliente',
      {
        title: 'Propostas Recebidas',
        linkHome: '/inicio',
        loginCadastroUsuario: req.session.usuario.nome,
        linkLogin: '/',
        formulario: "formListaPropostasCliente",
        propostas: listaPropostas,
        listaServicos
      })
  },
  aceitarPropostaCliente: async (req, res) => {

    let { idproposta } = req.body

    let proposta = await Proposta.findByPk( idproposta )
    console.log(proposta)

    if (proposta.aceite_cliente) {
      return res.render('cliente_mensagem_freelancer', { title: 'Contato - Freelancer', linkHome:'/', linkLogin: '/', loginCadastroUsuario: req.session.usuario.nome})      
    }else{
      await Proposta.update(
        { aceite_cliente: true },
        { where: { 'idproposta': idproposta } })
  
      return res.redirect('../cliente/listapropostas')
    }

  },
  viewPropostasFreelancer: async (req, res) => {

    let listaPropostas = await Proposta.findAll({
      include: [
        {
          model: Servico, include: [
            { model: TipoServico }
          ],
          required: true
        }
      ],
      where: { idusuario_freelancer: req.session.usuario.idusuario }
    })

    let tiposServicos = await TipoServico.findAll({ order: ['servico'] })

    return res.render('lista_propostas_freelancer',
      {
        title: 'Propostas Recebidas',
        linkHome: '/inicio',
        loginCadastroUsuario: req.session.usuario.nome,
        linkLogin: '/',
        formulario: "formListaPropostasCliente",
        propostas: listaPropostas,
        tiposServicos
      })
  },
  envioMensagemFreelancer: (req, res) => {
    res.locals.mensagemEnviada = true
    return res.render('cliente_mensagem_freelancer', { title: 'Contato - Freelancer', linkHome:'/', linkLogin: '/', loginCadastroUsuario: req.session.usuario.nome})
},
formMensagemCliente: (req, res) => {
  return res.render('freelancer_mensagem_cliente', { title: 'Contato - Cliente', linkHome:'/', linkLogin: '/', loginCadastroUsuario: req.session.usuario.nome})
},
envioMensagemCliente: (req, res) => {
  res.locals.mensagemEnviada = true
  return res.render('freelancer_mensagem_cliente', { title: 'Contato - Cliente', linkHome:'/', linkLogin: '/', loginCadastroUsuario: req.session.usuario.nome})
}
}

module.exports = CadPropController