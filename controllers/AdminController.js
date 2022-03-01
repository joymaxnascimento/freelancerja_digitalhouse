const { nextTick } = require("process")
const { TipoServico } = require("../database/models")
const AdminController = {

    admin: (req, res) => {
        return res.render('admin', { title: 'Administracao', linkHome: '/', linkLogin: '/', loginCadastroUsuario: 'login' })
    },

    tiposervicoView: (req, res) => {
        return res.render('cadastro_tipo_servico', { title: 'Cadastro Tipo de Servico', linkHome: '/', linkLogin: '/', loginCadastroUsuario: 'login' })
    },

    tiposervicoSalvar: async (req, res) => {
        const { tiposervico } = req.body

        let servicoExistente = await TipoServico.findOne({ where: { servico: tiposervico } })

        if (!servicoExistente) {
            await TipoServico.create(
                {
                    servico: tiposervico
                }
            )

            res.send('Cadastrado')
            
        } else {
            res.send('Serviço já existe no banco!')
        }
    }
}

module.exports = AdminController