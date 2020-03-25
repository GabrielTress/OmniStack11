const knex = require('knex');
const configuration = require('../../knexfile');

const connection = knex(configuration.development); // seleciona o local do banco "desenvolvimento"

module.exports = connection;