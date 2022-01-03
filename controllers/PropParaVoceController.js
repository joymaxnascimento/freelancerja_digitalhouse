//  const { Cliente, Sequelize } = require('../models');

module.exports = {
    async index(req, res, next){ 
        
        res.render('Proposta Para Voce', { title: 'Proposta Para Você!' });
  
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