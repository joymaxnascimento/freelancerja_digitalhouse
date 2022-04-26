const { TipoServico, Servico, Proposta, Usuario, Mensagem } = require('../database/models')
const { Sequelize, QueryTypes, Op } = require('sequelize')
const { sequelize } = require('../database/models/index')

const { validationResult } = require('express-validator')

let PropostaController = {
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
      replacements: { usuario: req.session.usuario.idusuario },
      type: QueryTypes.SELECT,
      include: [
        { model: Proposta, required: false },
        { model: TipoServico, required: false },
        { model: Usuario, required: false }
      ]
    },
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
  viewPropostasFreelancer: async (req, res) => {

    let listaPropostas = await Proposta.findAll({
      include: [
        {
          model: Servico, include: [
            { model: TipoServico }
          ],
          required: true
        },
        {
          model: Mensagem,
          required: false,
          include: [
            {
              model: Usuario,
              required: true,
              attributes: [
                'nome'
              ]
            }        
          ]
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
  excluirPropostaFreelancer: async (req, res) => {

    let { idproposta } = req.body

    await Proposta.destroy(
      {
        where: {
          idproposta: idproposta
        }
      }
    )

    return res.redirect('../freelancer/listapropostas')

  },
  mensagemPropostaFreelancer: async (req, res) => {

    console.log(req.body)

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

      return res.redirect('../freelancer/listapropostas')
    }
  }
}

module.exports = PropostaController