# Let me ask

Plataforma para profissionais que criam conteúdo ao vivo possam gerenciar perguntas feitas por seus espectadores. Este projeto foi desenvolvido durante a NLW Together promovida pela Rocketseat.

## Público Alvo

- Profissionais que criam conteúdo por meio de transmissões ao vivo através da Internet em plataformas como Youtube ou Twich por exemplo;  
- Espectadores de criadores de conteúdo online.  

## Tecnologias

- ReactJs;  
- Typescript;  
- Google Firebase;  
- Sass.

## Fucncionalidades

### Criador(a) de conteúdo

- Criação de salas;  
- Destacar perguntas;    
- Marcar pergunta como respondida;   
- Deletar perguntas;  
- Copiar a identificação da sala para compartilhar.  

### Espectador(a)

- Realizar peguntas;  
- Marcar com "gostei" perguntas (semelhante ao "curtir" do Facebook ou Youtube);   
- Copiar a identificação da sala para compartilhar.  

### Observação.

Para criação de salas, envio de perguntas e marcação de perguntas, é necessário que o internauta esteja logado em sua conta de usuário do Google.  

## Aperfeiçoamentos

Foram aplicados os seguintes aperfeiçoamentos:

- Aperfeiçoamento da checagens de autorização;  
- Tema escuro;  
- Página de erro de  "Página não localizada".


## Layout da aplicação

O layout da aplicação desenvolvido pela design Rebecca Gonzalez(@rebeccagonzalez) e pode ser acessado pelo endereço a seguir:
https://www.figma.com/file/u0BQK8rCf2KgzcukdRRCWh/Letmeask?node-id=0%3A1

Para salvar o layout na sua conta no Figma, acesse
https://www.figma.com/file/u0BQK8rCf2KgzcukdRRCWh/Letmeask/duplicate

## Requerimentos para execução em ambiente de desenvolvimento

1) Servidor ou computador com Node 14 ou superior.

2) Arquivo env.local na pasta raiz do projeto com as variáveis de ambiente dos serviços de autenticação e realtime database do firebase.

Exemplo:

```bash
REACT_APP_APIKEY = "sua_apikey"
REACT_APP_AUTHDOMAIN = "AAA.TTT"
REACT_APP_DATABASEUR L= "AAA.BBB"
REACT_APP_PROJECTID = "AAA"
REACT_APP_STORAGEBUCKET = "AAA"
REACT_APP_MESSAGINGSENDERID = "000"
REACT_APP_APPID = "00"
```

### Para execução em ambiente de desenvolvimento local

A) Faça o download deste repositório para máquina local

Exemplo:

```bash
$ git clone https://github.com/fbnnd1/nlw-together-letmeask.git && cd nlw-together-letmeask
```

B) Instale todas as dependências do projeto

Exemplo:

```bash
$ npm install
```

C) No prompt de comando ou shell, execute o comando:

```bash
$ npm start
```

## Agradecimentos

Segue o agradecimento a toda a comunidade de devs que participou do evento e membros da Rocketseat, em especial ao professor Diego Fernandes.

## Links externos

- Rocketseat (https://rocketseat.com.br)

