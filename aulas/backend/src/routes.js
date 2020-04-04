const express = require('express')

//Impoortando o celebrate para validação de dados
//npm install celebrate
const { celebrate, Segments, Joi } = require('celebrate');

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
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        //Descrevendo as informações que serão enviadas - validação das informaçções
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required(10).min(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),

    })
}) , OngController.create);

//Buscando todos os incidente de uma ong
routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization : Joi.string().required(),
    }).unknown(),
}), ProfileController.index);

//Inserção de dados na tabela "incidents"
routes.post('/incidents', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization : Joi.string().required(),
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().required(),
    }),
}), IncidentController.create);

//Criando rota para listar todas as "ongs" da aplicação
routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}), IncidentController.index)

//Criando rota para deletar um incident -Para saber qual o incitenyte a ser deletado, tenho que saber o id da mesma ":id"
routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required(),
    })
}), IncidentController.delete);

//Para deixar as rotas disponíveis para que index.js da aplicação possa acessar as rotas:
//Se exporta as rotas 

module.exports = routes;



/**
 * Para acriação do módulo de segurança CORS
 * npm install cors
 * 
 * Determina quem poderá acessar a aplicação
 *  */ 

