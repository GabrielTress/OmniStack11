const crypto = require('crypto'); // para gerar id's aleatorios

module.exports =  function generateUniqueId(){
   return crypto.randomBytes(4).toString('HEX');//cria um id aleatorio de 4 bits, e converte para string (Hexadecimal)
}