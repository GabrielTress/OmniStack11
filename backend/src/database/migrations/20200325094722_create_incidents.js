
exports.up = function(knex) {
    return knex.schema.createTable('incidents', function(table){// criando a tabela e colunas
        table.increments(); //id de tabela

        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();

        table.string('ong_id').notNullable();

        table.foreign('ong_id').references('id').inTable('ongs'); //relacionamento entre tabelas.
    })
};
exports.down = function(knex) {
  return knex.schema.dropTable('incidents');
};
