# Maestro Frotas [Frontend]

Frontend desenvolvido com React

### Requisitos

É necessário ter as seguintes ferramentas para executar o projeto.
* [NodeJs](https://nodejs.org/en/) // Runtime de javascript.
* [NPM](https://www.npmjs.com/get-npm) // Gerenciador de dependências(Já vem com o NodeJs).
* [VS Code like](https://code.visualstudio.com/download) // Editor para codificação.
* [React] // Suporte para aplicações react

### Como instalar

Para rodar o projeto em ambiente local, certifique-se de ter os requisitos atendidos.
Com um terminal ou VSCode abra a raiz do projeto, onde se localiza o arquivo `package.json`.

Execute os comandos para instalação das dependências:

```
npm install -g create-react-app
npm install
```

### Build & Run

Para buildar e rodar project das plataformas, utilize o comando:

```
npm run start
```

Observe o console que deverá informar da execução do projeto e abrir uma janela com a aplicação react. Utiliza ALT+C para interromper a execução

### Versionamento

Seguimos a sistemática de GitFlow para versionamento. Dessa forma, nenhum comit deve subir nas branchs `master` ou `desenvolvimento`. Sempre que uma funcionalidade nova for criada, gere uma nova branch a partir da `desenvolvimento` e trabalhe nela. Ao concluir a funcionalidade realize um pull request para a branch develop.
