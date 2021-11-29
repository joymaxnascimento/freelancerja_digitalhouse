//  const { Cliente, Sequelize } = require('../models');

module.exports = {
  async index(req, res, next){ 
      
      res.render('freelancer', { title: 'FreelancerJA' });

  },

  async cadastrar(req, res, next){
  },

  async salvar(req, res, next){
  },

  async editar(req, res, next){
  },

  async atualizar(req, res, next){

  },

  async excluir(req, res, next){
  },
}