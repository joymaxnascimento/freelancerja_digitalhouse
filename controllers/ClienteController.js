//  const { Cliente, Sequelize } = require('../models');

module.exports = {
    async index(req, res, next){ 
        
        /*res.render('cliente', { title: 'Cliente' }); */
        res.render('soucliente', { title: 'Cliente: propor serço' });
  
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