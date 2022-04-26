window.addEventListener('load', () => {

    /*
    Mensagem serviço criado com sucesso - tela de serviço
    */

    var msgServicoCriado = document.querySelector('p.erros')

    if(msgServicoCriado != null){
        document.addEventListener('click', (e) =>{
            msgServicoCriado.style.display = 'none'
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

                if (listaServicos != null) {
                    let servicos = listaServicos.querySelectorAll('.card')

                    for (let i = 0; i < servicos.length; i++) {
                        let idTipoServico = servicos[i].querySelector('.card #idtipo_servico')

                        if (e.target.value == idTipoServico.value) {
                            servicos[i].style.display = ''
                        } else {
                            servicos[i].style.display = 'none'
                        }
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