//CRIANDO A CONEXÃO COM OO BANCO DE DADOS

//Importações
const knex = require('knex');
const configuration = require('../../knexfile'); //Importando as configurações do banco de dados do knexfile

const config = process.env.NODE_ENV === 'test' ? configuration.test : configuration.development;

//Criando a conexão
//const connection = knex(configuration.development); //Passando como parâmetro a configuração de conexão de ambiente de desenvolvimento do knexfile
const connection = knex(config);
//Exportanto a conexão com o banco de dados
module.exports = connection;