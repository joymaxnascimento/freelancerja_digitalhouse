const { check } = require('express-validator')

const { Servico } = require('../database/models')

const validacoesCadProposta = [
    check('idservico').notEmpty().withMessage('Operação Inválida!').bail().custom(async (value) => {

        const servico = await Servico.findByPk(value)

        if (!servico) {
            throw new Error('Operação Inválida!')
        } else {
            return true
        }
    }),
    check('descricao').notEmpty().withMessage('Preencha o campo de informações!').bail()
        .isLength({ min: 50 }).withMessage('Descreva com, pelo menos 50 caracteres!'),
    check('valor_proposto_freelancer').notEmpty().withMessage('Preencha o valor proposto!').bail()
        .isFloat({ min: 100, max: 5000 }).withMessage('O valor precisa ser numérico, entre R$ 100 e R$ 5000!')
]

module.exports = validacoesCadProposta