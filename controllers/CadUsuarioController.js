const { Usuario } = require('../database/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const bcrypt = require('bcrypt')


const  CadUsuarioController = {
     viewForm: async (req, res) =>{
        
        let usuarios = await Usuario.findAll({order: ['nome']})

        return res.render('cadastro_usuario', {title: 'Cadastro de Usuário', usuarios: usuarios})
    },
    salvarForm: async (req, res) => {
        const {nome, senha, email} = req.body

        console.log(req.body)

        const salvar = await Usuario.create({
            nome,
            senha: bcrypt.hashSync(senha, 10), 
            data_cadastro: new Date(), 
            data_atualizacao: new Date(), 
            email,
            status:1
        })

        res.render('cadastrocriado', {title: 'Cadastro Criado'})
        console.log('salvar form servico\n\n' + salvar)
    }
}

module.exports = CadUsuarioController