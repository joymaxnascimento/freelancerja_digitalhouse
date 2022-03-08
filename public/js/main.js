window.addEventListener('load', () => {
    /*
    View: cadastro_usuario.ejs
    */
    var frmCadUsuario = document.getElementById('formCadastroUsuario')

    if (frmCadUsuario != null) {
        frmCadUsuario.addEventListener('submit', (e) => {
            let ulErros = document.querySelector('div.erros ul')
            let erros = []
            let senha = document.getElementById('senha')
            let repetirSenha = document.getElementById('repetirSenha')

            if (senha.value !== repetirSenha.value) {
                erros.push('As senhas não coincidem!')
            }

            if (erros.length > 0) {
                e.preventDefault()
                erros.forEach((erro) => {
                    console.log(erro)
                    ulErros.innerHTML += '<li>' + erro + '<li>'
                })
            }
        })
    }

    /*
    Lista de serviços
    View: cadastro_proposta_freelancer.ejs
    */
    var listaCategorias = document.querySelectorAll('.tipo-servico div')

    if (listaCategorias != null) {
        listaCategorias.forEach((categoria) => {
            categoria.addEventListener('click', (e) => {

                let listaServicos = document.querySelector('.cards')
                let servicos = listaServicos.querySelectorAll('.card')
                console.log(servicos)

                for (let i = 0; i < servicos.length; i++) {
                    let idTipoServico = servicos[i].querySelector('.card input[type="hidden"]')

                    if (e.target.value == idTipoServico.value) {
                        servicos[i].style.display = ''
                    } else {
                        servicos[i].style.display = 'none'
                    }
                }

            })
        })
    }

    var textoBusca = document.querySelector('.buscar')

    if (textoBusca != null) {
        textoBusca.addEventListener('keyup', (e) => {

            let listaServicos = document.querySelector('.cards')
            let servicos = listaServicos.getElementsByClassName('card')

            for (let i = 0; i < servicos.length; i++) {
                let texto = servicos[i].querySelector('p');

                if (texto.textContent.toUpperCase().indexOf(e.target.value.toUpperCase()) > -1) {
                    servicos[i].style.display = ''
                } else {
                    servicos[i].style.display = 'none'
                }
            }
        })
    }

})