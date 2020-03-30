//CONTROLLER RESPONSÁVEL PELO CONTROLE DE ACESSO DE ONGS - SESSÕES - Apenas verifica se o id da ong existe

//Conexão com o banco de dados
const connection = require('../database/connection');

//Retornar casos específicos e uma ong
module.exports = {
    async create(request, response) {
        //Busca o id através do corpo da requisição
        const { id } = request.body;

        //Buscando ong no banco de dados
        const ong = await connection('ongs')
            .where('id', id)
            .select('name')
            .first();

        //Se a ong não existir
        if(!ong){
            return response.status(400).json({ error: 'No ONG found wit this ID'});
        }

        //Se tudo der certo - Retorna os dado da ong
        return response.json(ong);
    }


}