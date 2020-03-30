//CONTROLLER RESPONSÁVEL PELO PERFIL DE UMA ONG

//Conexão com o banco de dados
const connection = require('../database/connection');

//Retornar casos específicos e uma ong
module.exports = {
    async index(request, response) {
        const ong_id = request.headers.authorization; //Acessando dados de ong logada

        //Buscando todos os incidentes cridos pela ong especificada
        const incidents = await connection('incidents')
            .where('ong_id', ong_id)
            .select('*');

        return response.json(incidents);
    }
}