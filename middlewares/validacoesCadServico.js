const { check } = require('express-validator')

const { TipoServico } = require('../database/models')

const validacoesCadServico = [
    check('data_entrega').notEmpty().withMessage('Preencha a data de entrega!')
        .bail().isDate().withMessage('Digite uma data válida').bail().custom((value) => {
            let dataEntrada = new Date(value)
            let dataAtual = new Date()
            if (dataEntrada <= dataAtual) {
                throw new Error('Informe uma data futura!')
            } else {
                return true
            }
        }),
    check('descricao').notEmpty().withMessage('Preencha a descrição!').bail().isLength({ min: 100 })
        .withMessage('Descreva o serviço com, pelo menos 100 caracteres!'),
    check('valor_a_pagar').notEmpty().withMessage('Preencha o valor a pagar!').bail()
        .isFloat({ min: 20, max: 5000 }).withMessage('O valor precisa ser numérico, entre R$ 20 e R$ 5000!'),
    check('idtipo_servico').custom(async (value, { req }) => {
        const tiposServicos = await TipoServico.findAll({ order: ['idtipo_servico'], attributes: ['idtipo_servico'], raw: true })

        let tipoRecebido = tiposServicos.find(tipo => tipo.idtipo_servico === Number(value))

        if (!tipoRecebido) {
            throw new Error('Escolha o tipo de serviço!')
        } else {
            return true
        }
    })
]

module.exports = validacoesCadServico