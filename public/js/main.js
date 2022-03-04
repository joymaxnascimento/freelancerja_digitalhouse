window.addEventListener('load', () => {
    let frmCadUsuario = document.getElementById('formCadastroUsuario')

    if(frmCadUsuario != null){
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
})