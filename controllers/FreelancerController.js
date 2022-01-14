const { TipoServico } = require('../models')

module.exports = {
  async index(req, res, next){ 

    let tiposServicos = await TipoServico.findAll({order: ['servico']})
      
    res.render('soufreelancer', { title: 'Sou Freelancer', servicos: tiposServicos});

  },

  async cadastrar(req, res, next){
  },

  async salvar(req, res, next){
  },

  async editar(req, res, next){
  },

  async atualizar(req, res, next){freelancer

  },

  async excluir(req, res, next){
  },
}