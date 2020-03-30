
//Importando a conexão com o banco de dados para comunicação
const connection = require('../database/connection');

//O controller exporta os métodos com os objetos:
module.exports = {

    //Criando rota para listar todas as "incidents" da aplicação 
    async index(request, response){

        //Busca de dentro do rquest.query ?
        const {page = 1} = request.query;

        //Query para retorno para o frontend - Determina a quantidade de registros
        const [count] = await connection('incidents').count(); //Retorna apenas um valor
        //Count retorna a quantidade total de registros - O total de itens é informado pelo cabeçalho da requisição
        response.header('X-Total-Count', count['count(*)']);


        const incidents = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id') //Trazendo dados da tabela de ongs - Trazendo apenas o id das ongs que sejam igual ao incidents.ong_id
        .limit(5) //Retorna apenas 5 incidentes
        .offset((page - 1) * 5) //Paginação pulando de 5 em 5 registros
        .select([
            'incidents.*',
             'ongs.name',
             'ongs.whatsapp',
             'ongs.city',
             'ongs.uf']); 
        //Pega todos os dados da tabela incidents selecionando os campos especificados ['','','']

        return response.json(incidents);
    },


    async create(request, response){
        // Criando a rota da aplicação
        // Criando a rota raiz que recebe uma função como parâmetro
        // Função assincrona
        

        //Acessando os dados do corpo da requisição - Destruturação para captura dos dados separadamente
        const { title, description, value } = request.body;

        //Casdatrar requisição - Acesso ao header - Para atribuição da ong que está cadastrando o incidente
       //request.headers; //Quanda informações do contexto da requisição

        //Acessando id da ong
        const ong_id = request.headers.authorization;

        //Inserção de dados na tabela "incidents" - await (aguardar para continuar)
        const [id] = await connection('incidents').insert({  //INserir todas as colunas que se deseja que recebam dados
            title,
            description,
            value,
            ong_id
        });

        // '/' -> Chamado de recurso dentro do node -> Recurso que se desejar acessar
        // return response.send('Hello World!');
        // Também é possível se retornar uma resposta em JSON que retorna um objeto
         return response.json({id}); //Está retornando apenas o id do incident
    },

    //Criando método para exclusões no banco de dados
    async delete(request, response){
        //Pegar o id que vem de request de rotas
        const { id } = request.params;

        //Peghar o id ong logada
        const ong_id = request.headers.authorization;

        //Precisamos do id da ong logada, pois precisamos verificarv se o incitente que está para ser deletado, realmente foi criado pela ong que solicita sua exclusão
        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first(); //Apenas o primeiro registro. Retorna apanas um resultado

        //Se o ong_id do incidente for diferente do ong_id logado
            if(incident.ong_id != ong_id){
                return response.status(401).json({error: 'Operation not permitted'});
            }

            await connection('incidents').where('id', id).delete();

            return response.status(204).send();
    }
    
};