//  const { Cliente, Sequelize } = require('../models');

module.exports = {
    async index(req, res, next){ 
        
        res.render('proposta', { title: 'Proposta' });
  
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