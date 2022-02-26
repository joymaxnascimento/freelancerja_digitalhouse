const {TipoServico} = require("../database/models")
const  AdminController = {
    admin:  (req, res) =>{
        return res.render('admin', {title: 'Administracao', linkLogin: "/", loginCadastroUsuario: "login" })
    },
    tiposervicoView:(req, res) =>{
        return res.render('cadastro_tipo_servico', {title: 'Cadastro Tipo de Servico', linkLogin: "/", loginCadastroUsuario: "login" })
    }, 
    tiposervicoSalvar: async (req, res) =>{
        const {tiposervico} = req.body;
        const salvar = await TipoServico.create(
            {
                servico: tiposervico
            }
        )
        res.send('Cadastrado')
        console.log(salvar)        
    } 
    }

module.exports = AdminController