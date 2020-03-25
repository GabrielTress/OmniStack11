exports.up = function(knex) {
    return knex.schema.createTable('ongs', function(table){// criando a tabela e colunas
        table.string('id').primary(); //id de cada ong
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable(); // como UF tem apenas 2 caracteres, pode ser passado para aceitar apenas 2 chars.
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable('ongs');
};