const { TipoServico } = require('../models')

module.exports = {
    async index(req, res, next){

        let tiposServicos = await TipoServico.findAll({order: ['servico']})
        
        res.render('soucliente', { title: 'Cliente: propor serviço', servicos: tiposServicos} );
  
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