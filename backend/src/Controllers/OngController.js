const connection = require('../database/connection');
const crypto = require('crypto'); // para gerar id's aleatorios

module.exports = {
    async index(request, response){ // para exibição de todas as ongs do banco 
        const ongs = await connection('ongs').select('*');
     
        return response.json(ongs);
    },

    async create(request, response){
        const { name, email, whatsapp, city, uf } = request.body;
        const id = crypto.randomBytes(4).toString('HEX');//cria um id aleatorio de 4 bits, e converte para string (Hexadecimal)
     
           await connection('ongs').insert({
              id,
              name,
              email,
              whatsapp,
              city,
              uf,
           })
      
           return response.json({id});
    }
}