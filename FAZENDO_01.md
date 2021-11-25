20 11 2021 
No "Desktop" criou pasta "pi". 
A partir de "Desktop/pi" clonou o repositorio do 'joymax':
>_ git clone https://github.com/joymaxnascimento/freelancerja_digitalhouse
- - - OK !
>_ ls -alhg                         // para ver os arquivos - ok ! 
>_ npm init -y                      // cria o package.json 
>_ npm install express --save       // instala o express 

>_ sudo npm install nodemon -g      // talvez vc não precise colocar "sudo" 

>_ sudo npm install -g npm@8.1.4    // ele mesmo pediu esta atualização - obedeci. 
                                    // talvez vc não precise colocar "sudo"

>_ npm install express-generator -g // cria várias facilidades e subpastas (exceto controller) 

>_ mkdir controller   // criar sobpasta "controller"  ou  via gerenciador 

// criar ambiente para a "engine de vizualizações EJS": 
>_ express --view=ejs
   ... entao ... ele pergunta: destination is not empty, continue? [y/N] y

colocar uma página "vazia" no localhost:3000:  
>_ nodemon ./bin/www

Etapa de colocar uma página "vazio" concluída. 
Agora é adapta-la. 