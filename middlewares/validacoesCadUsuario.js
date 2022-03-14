const { check } = require('express-validator')

const { Usuario } = require('../database/models')

const validacoesCadUsuario = [
    check('nome').notEmpty().withMessage('Preencha o nome!').bail(),
    check('email').notEmpty().withMessage('Preencha o E-mail').bail()
    .isEmail().withMessage('Informe um e-mail válido!').custom((value) => {
        return Usuario.findOne({ where: { email: value } }).then((usuario) => {
            if(usuario){
                return Promise.reject('E-mail já cadastrado no sistema!')
            }
        })
    }),
    check('senha').notEmpty().withMessage('Preencha a senha!').bail(),
    check('repetirSenha').notEmpty().withMessage('Repita a senha!').custom((value, {req}) => {
        if(value !== req.body.senha){
            throw new Error('As senhas não coincidem!')
        }else{
            return true
        }
    })
]

module.exports = validacoesCadUsuario