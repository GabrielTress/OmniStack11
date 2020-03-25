const connection = require('../database/connection');

module.exports = {
    async index(request, response){ // para exibição de todas as ongs do banco 

        const { page = 1 } = request.query; //esquema de paginação

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')//RELACIONAMENTO DE DADOS
            .limit(5) //limita para exibição de 5 itens por pagina
            .offset((page - 1) * 5)// faz com que as proxima pagina exiba a continuação da primeira.
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
        ]);

        const [count] = await connection('incidents').count(); //faz a contagem da quantidade de casos no banco
            response.header('X-Total-Count', count['count(*)']); //envia o total de itens para o cabeçalho da mensagem
        return response.json(incidents);
    },

    async create(request, response){
        const{title, description, value} = request.body;
        const ong_id = request.headers.authorization; // id de verificação

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });

        return response.json({id});
    },  

    async delete(request, response){
        const {id} = request.params; // captura id ong
        const ong_id = request.headers.authorization; // pega id da ong logada

        const incident = await connection('incidents')
            .where('id', id) //quando const {id} = incidents.id 
            .select('ong_id') // seleciona apenas a coluna ong_id
            .first(); // como tere apenas um registro, seleciona apenas o primeiro

        if(incident.ong_id != ong_id){ //faz a verificação, caso uma ong tente excluir algum caso de outra ong
            return response.status(401).json({ error: 'Operation not permitted'});
        }  
        
        await connection('incidents').where('id', id).delete(); //faz o delete.

        return response.status(204).send(); //retornara caso for deletado
    }
};