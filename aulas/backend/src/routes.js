const express = require('express')

//Importando os arquivos controller
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

//Recurso utilizado para criptografia. NEste projeto será utilizado para geração de uma string aleatória
const crypto = require('crypto');



//Desacopla o mode de rotas do express em uma nova variável
const routes = express.Router();

//Criando roda para controle de acessos
routes.post('/sessions', SessionController.create);


//Criando rota para listar todas as "ongs" da aplicação
routes.get('/ongs',OngController.index);

// Criando a rota da aplicação
// Criando a rota raiz que recebe uma função como parâmetro


//Inserção de dados na tabela "ongs"
routes.post('/ongs', OngController.create);

//Buscando todos os incidente de uma ong
routes.get('/profile', ProfileController.index);

//Inserção de dados na tabela "incidents"
routes.post('/incidents', IncidentController.create)

//Criando rota para listar todas as "ongs" da aplicação
routes.get('/incidents', IncidentController.index);

//Criando rota para deletar um incident -Para saber qual o incitenyte a ser deletado, tenho que saber o id da mesma ":id"
routes.delete('/incidents/:id', IncidentController.delete);

//Para deixar as rotas disponíveis para que index.js da aplicação possa acessar as rotas:
//Se exporta as rotas 

module.exports = routes;



/**
 * Para acriação do módulo de segurança CORS
 * npm install cors
 * 
 * Determina quem poderá acessar a aplicação
 *  */ 

