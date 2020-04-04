//Recurso utilizado para criptografia. NEste projeto será utilizado para geração de uma string aleatória
//const crypto = require('crypto');
const generateUniqueId = require('../utils/generateUniqueId');

//Importando a conexão com o banco de dados para comunicação
const connection = require('../database/connection');

//O controller exporta os métodos com os objetos:
module.exports = {

    //Criando rota para listar todas as "ongs" da aplicação 
    async index(request, response){
        const ongs = await connection('ongs').select('*');

        return response.json(ongs);
    },


    async create(request, response){
        // Criando a rota da aplicação
        // Criando a rota raiz que recebe uma função como parâmetro
        // Função assincrona
        

        //Acessando os dados do corpo da requisição - Destruturação para captura dos dados separadamente
        const {name, email, whatsapp, city, uf} = request.body;

        // console.log(data);
        //Gerendo uma srting aleatória de 4 bytes, convertido para string de hexadecimal
        //const id = crypto.randomBytes(4).toString('HEX');

        const id = generateUniqueId();

        //Inserção de dados na tabela "ongs" - await (aguardar para continuar)
        await connection('ongs').insert({  //INserir todas as colunas que se deseja que recebam dados
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        });

        // '/' -> Chamado de recurso dentro do node -> Recurso que se desejar acessar
        // return response.send('Hello World!');
        // Também é possível se retornar uma resposta em JSON que retorna um objeto
         return response.json({id}); //Está retornando apenas o id da ong -pois quandoa ong é cadastrada é preciso saber a id atribuída
    }
    
};