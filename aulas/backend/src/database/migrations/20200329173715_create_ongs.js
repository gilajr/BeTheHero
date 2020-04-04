//Método Up é sempre responsável pela criação da tabela
exports.up = function(knex) {
    //Criando nova tabela pelo knex migration
    return knex.schema.createTable('ongs', function (table) {
        table.string('id').primary(); //Criando campo com chave primária no banco de dados
        table.string('name').notNullable(); //Cria campo que não pode ser nulo
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable();
    });
  };
  
  //Comando para criar a tabela
  //npx knex migrate:latest
  
  //O Método Down é responsável por revrsões em casos de falha
  exports.down = function(knex) {
      //Deleta uma tebela criada
      return knex.schema.dropTable('ongs');
  };
  