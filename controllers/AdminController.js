const { TipoServico , Servico , Usuario } 
      = require("../database/models")
const AdminController = {

    admin: (req, res) => {
        return res.render('admin', 
        { title: 'Administracao', 
          linkHome:  '/', 
          linkLogin: '/', 
          loginCadastroUsuario: 'login'
        })
    },

    tiposervicoView: (req, res) => {
        return res.render('cadastro_tipo_servico', 
        { title: 'Cadastro Tipo de Servico', 
          linkHome:  '/', 
          linkLogin: '/', 
          loginCadastroUsuario: 'login' })
    },

    listartiposervicoView: async (req, res) => {
        let tpservicos = await TipoServico.findAll({order: ['servico']});
        return res.render('adm_listar_tipo_servico', 
        { title: 'Listar Tipos de Servico', 
          linkHome:   '/', 
          tpservicos: tpservicos,
          linkLogin:  '/', 
          loginCadastroUsuario: 'login' })
    },

    listarusuariosView: async (req, res) => {
        let usuarios = await Usuario.findAll({order: ['nome']});
        return res.render('adm_listar_usuarios', 
        { title: 'Listar Usuarios', 
          linkHome:   '/', 
          usuarios: usuarios,
          linkLogin:  '/', 
          loginCadastroUsuario: 'login' })
    },

    listarservicoView: async (req, res) => {
        let osservicos = await Servico.findAll({order: ['idservico']});
        return res.render('adm_listar_osservicos', 
          { title: 'Listar os Servicos', 
            linkHome:   '/', 
            linkLogin:  '/', 
            loginCadastroUsuario: 'login',
            osservicos: osservicos })
    },


    tiposervicoSalvar: async (req, res) => {
        const { tiposervico } = req.body

        let servicoExistente = await TipoServico.findOne(
                            { where: { servico: tiposervico } })

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

// module.exports = AdminController



/**
 * Number.prototype.format(n, x, s, c)
 * 
 * @param integer n: length of decimal
 * @param integer x: length of whole part
 * @param mixed   s: sections delimiter
 * @param mixed   c: decimal delimiter
 */
//  Number.prototype.format = function(n, x, s, c) {
//     var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
//         num = this.toFixed(Math.max(0, ~~n));

//     return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
// };
// function ParseFloat(str,val) {
//     str = str.toString();
//     str = str.slice(0, (str.indexOf(".")) + val + 1); 
//     return Number(str);   
// }

function format2(n, currency) {
    console.log(n);
    var nn = n.toFixed(2)
    console.log(nn)
    return currency + n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
}

// 

module.exports = AdminController