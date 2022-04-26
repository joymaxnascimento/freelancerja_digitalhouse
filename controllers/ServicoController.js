const { TipoServico, Servico, Proposta, Mensagem, Usuario } = require('../database/models')
const { QueryTypes } = require('sequelize')
const { sequelize } = require('../database/models/index')

const { validationResult } = require('express-validator')

const ServicoController = {
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
  viewEditarServico: async (req, res) =>{

    let { idservico } = req.params

    let tiposServicos = await TipoServico.findAll({ order: ['servico'] })

    let servico = await Servico.findByPk(idservico)

    return res.render('editar_servico_cliente', {
      title: 'Editar Serviço',
      linkHome: '/inicio',
      tiposServicos: tiposServicos,
      loginCadastroUsuario: req.session.usuario.nome,
      linkLogin: '/',
      formulario: 'formCadastroServico',
      dadosAntigos: servico
    })    
  },
  salvarEdicaoServico: async (req, res) => {

    let {idservico, descricao, valor_a_pagar, data_entrega, idtipo_servico} = req.body

    let servico = await Servico.findByPk( idservico )

    if (!servico) {
      return res.redirect('/')
    } else {
      await Servico.update(
        {descricao,
          valor_a_pagar,
          data_entrega,
          idtipo_servico
         },
        { where: { idservico } })

      return res.redirect('../servico/cliente/lista')
    }
  },
  salvarForm: async (req, res) => {

    let erros = validationResult(req)

    if (erros.isEmpty()) {

      let tiposServicos = await TipoServico.findAll({ order: ['servico'] })

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
        linkHome: '/inicio',
        tiposServicos: tiposServicos,
        loginCadastroUsuario: req.session.usuario.nome,
        linkLogin: '/',
        formulario: 'formCadastroServico'
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
  },
  viewServicosCliente: async (req, res) => {

    let tiposServicos = await TipoServico.findAll({ order: ['servico'] })
    let servicos = await sequelize.query("\
        SELECT servico.idservico, tipo_servico.servico, servico.descricao, \
        servico.data_entrega, servico.valor_a_pagar, count(proposta.idproposta) as propostas\
        FROM servico \
        LEFT JOIN tipo_servico \
        ON servico.idtipo_servico = tipo_servico.idtipo_servico \
        LEFT JOIN proposta \
        ON servico.idservico = proposta.idservico \
        WHERE idusuario_cliente = :usuario \
        GROUP BY servico.idservico, tipo_servico.servico, servico.descricao \
        , servico.data_entrega, servico.valor_a_pagar"
      , {
        raw: true,
        model: Servico,
        replacements: { usuario: req.session.usuario.idusuario },
        type: QueryTypes.SELECT,
        include: [
          { model: Proposta, required: false },
          { model: TipoServico, required: false }
        ]
      }
    )

    return res.render('lista_servicos_cliente',
      {
        title: 'Serviços',
        linkHome: '/inicio',
        tiposServicos: tiposServicos,
        servicos: servicos,
        loginCadastroUsuario: req.session.usuario.nome,
        linkLogin: '/',
        formulario: 'formListaServicos'
      })
  },
  viewPropostasServico: async (req, res) => {

    let { idservico } = req.params

    let listaPropostas = await sequelize.query(
      "SELECT idproposta, proposta.descricao, valor_proposto_freelancer, proposta.idservico \
            ,proposta.aceite_cliente, proposta.idusuario_freelancer, servico.idusuario_cliente \
            FROM proposta \
            LEFT JOIN servico \
            ON proposta.idservico = servico.idservico \
            LEFT JOIN tipo_servico \
            ON servico.idtipo_servico = tipo_servico.idtipo_servico \
            WHERE proposta.idservico = :idservico \
            AND (proposta.aceite_cliente = 1 \
            OR proposta.idservico NOT IN( \
            SELECT idservico FROM proposta \
            WHERE aceite_cliente = 1))"
      , {
        raw: true,
        model: Proposta,
        replacements: { idservico: idservico },
        type: QueryTypes.SELECT
      }
    )

    let mensagens = await Mensagem.findAll({
      include: [
        {
          model: Proposta,
          required: true,
          where: {
            idservico: idservico
          }
        },
        {
          model: Usuario,
          required: true,
          attributes: [
            'nome'
          ]

        }
      ]
    })

    let listaServicos = await Servico.findAll({ where: { idusuario_cliente: req.session.usuario.idusuario }, order: ['idservico'] })

    return res.render('lista_propostas_cliente',
      {
        title: 'Propostas Recebidas',
        linkHome: '/inicio',
        loginCadastroUsuario: req.session.usuario.nome,
        linkLogin: '/',
        formulario: "formListaPropostasCliente",
        propostas: listaPropostas,
        listaServicos,
        mensagens
      })
  },
  aceitarPropostaCliente: async (req, res) => {

    let { idproposta } = req.body

    let proposta = await Proposta.findByPk(idproposta)

    if (!proposta) {
      return res.redirect('/')
    } else {
      await Proposta.update(
        { aceite_cliente: true },
        { where: { 'idproposta': idproposta } })

      return res.redirect('../propostas/' + proposta.idservico)
    }

  },
  mensagemPropostaCliente: async (req, res) => {
    let { idusuario, idproposta, idmensagem_resposta, mensagem } = req.body
    let proposta = await Proposta.findByPk(idproposta)

    if (!proposta) {
      return res.redirect('/')
    } else {
      await Mensagem.create({
        idproposta,
        idusuario,
        mensagem,
        idmensagem_resposta
      })

      return res.redirect('../propostas/' + proposta.idservico)

    }
  }
}

module.exports = ServicoController