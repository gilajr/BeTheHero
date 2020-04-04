// Importando o Express
const express = require('express');

//Importando o módulod e segurança cors
const cors = require('cors');

//importando o celebrate para validação de dados - evitar erros 500 na aplicação
const {errors} = require('celebrate');

//Importando as rotas
const routes = require('./routes'); //Precisamos utilizar o "." na declaração do caminho para que se diferencie de pacotes - referencia a mesma pasta do arquivo
 
// Variável que instancia a aplicação
const app = express();

//Informando o uso de JSON para o corpo das requisições
app.use(cors()); //Permite que todas as aplicações acessem a aplicação - Durante o desenvolvimento
app.use(express.json());
app.use(routes); // è impotante que essa linha esteja sempre abaixo do app.use(express.json());
app.use(errors()); 

/** 
 * Rota / Recurso
 * 
 * */ 

 /** 
 * Métodos HTTP;
 * 
 * - - GET: Buscar uma infomrção do Backend
 *  - Quando uma rota é executada no Browser, o mesmo sempre executa o método get
 * 
 * - - POST: Criar uma informação no Backend
 * 
 * - - PUT: Alterar uma informação no Backend
 * 
 * - - DELETE: Deletar uma informação no  Backend
 * 
 * https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Methods
 * 
 * */ 
 
 /**
  * Tipos de Parâmetros
  * 
  * - - Query: Parâmetros que são enviados/nomeados dentro da URL/rota - Após "?" (Filtros, Paginação,)
  * Ex:
  * app.get('/users?name=José') -> Lista os usuários que iniciam com o nome 'José'
  * http://localhost:3333/users?page=2&nome=Gil&Idade33
  * 
  * - - Route: Parâmetros utilizados para identificar recursos 
  * Ex:
  * app.get('/users/:id') -> Indica que tudo que vier depois da "/" será nomeado como id
  * http://localhost:3333/users/1 -> Busca o usuário com a id=1
  * 
  * - - Request Body: Corpo da Requisição. Utilizado para criar ou alterar recursos
  * > Feito através do método POST e objeto JSON
  * {
  *	"name": "Gil Júnior",
  *	"idade": 33
  * }
  * > Para acesso: 
  * app.post('/users/')
  * const body = request.body;
  * 
  * 
  * - O Parâmetro "request": guarda todos os dados que vêm da requisição do usuário
  * - O Parâmetro "response": é responsável por returnar uma resposta para o usuário
  * 
  * //Como fazemos para acessar ps parâmetros dentro da rota
  * > Para acessar todos os parâmetros da request: 
  *     const params = request.query;
  * > Para acessar todos os parâmetros das rotas
  *     app.get('/users/:id')
  *     const params = request.query;
  */

  /**
   * BANCO DE DADOS:
   * SQL: MySQL, SQLite, PostgreSQL, Oracle, Microsoft SQL Server
   * NoSQL: MongoDB, CouchDB, etc
   * 
   * Utilizaremos o "SQLite"
   * 
   * Bancos SQL permitem um controle maior - Permite reutilização e utiliozação em outros SGBD's
   * 
   * //CONFIIGURAÇÃO DO BANCO DE DADOS
   * - Instalar o driver do banco de dados
   * 
   * BUSCAR DADOS DO USUÁRIO:
   *    SELECT * FROM users
   * Query Builder: table('users').select('*').where()
   * 
   * > Utilizaremos como Query Builder: KNEX.JS
   * -- Para instalar o KNEX.JS - http://knexjs.org/
   * 
   * npm  install knex --save
   * - Então adicione  relação(driver):
   * npm install pg
   * npm install sqlite3
   * npm install mysql
   * npm install mysql2
   * npm install oracledb
   * npm install mssql
   * - Para o MariaDB
   * npm install mysql
   * 
   * > Para conexão com o Banco de Dados
   * npx knex init
   * - Criará o arquivo knexfile.js
   * Fica as configurações para acesso a cada um dos ambientes da aplicação
   * - Ambiente de desenvolvimento: "development"
   * É o ambiente de desenvolvimento na máquina do desenvolvedor
   * - Ambiente de staging: "staging"
   * Ambiente de produção para o time de desenvolvimento para testes online
   * - Ambiente de produção: "production"
   * É quando o projeto fica online para que os clientes acessem nossa aplicação
   * 
   * CRIAÇÃO DE TABELAS PELO KNEX
   * - ATRAVÉS DA FUNCIONALIDADE MIGRATIONS
   * > Migrations ou migrações é uma forma de criar tabelas e conter um histórico das tabelas criadas, alteradas, etc(Histórico de Banco de Dados)
   * Criando novos arquivos de migrations:
   * knex migrate:make migration_name
   * ou oara .ts
   * knex migrate:make migration_name -x ts
   * 
   *  */ 




// Mando a aplicação ouvir uma porta: (porta: 3333)
//app.listen(3333);
module.exports = app;


/**
 * Instalando  o pacote nodemon como dependência de desenvolvimento
 * É uma biblioteca utilizada somente para quandoe stivermos desenvolvendo a aplicação
 *
 * 
 * npm install nodemon -D 
 * 
 *  * 
 *  "scripts": {
 *   "start": "nodemon index.js"
 *  }
 * 
 * npm start
 * */  