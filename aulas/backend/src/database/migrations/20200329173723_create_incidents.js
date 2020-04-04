//Método Up é sempre responsável pela criação da tabela
exports.up = function(knex) {
    //Criando nova tabela pelo knex migration
    return knex.schema.createTable('incidents', function (table) {
        table.increments(); //Criando campo com chave primária com auto-incremento
        table.string('title').notNullable(); //Cria campo que não pode ser nulo
        table.string('description').notNullable();
        table.decimal('value').notNullable(); //Pro campo de valor R$

        //Relacionamento - Qual a ong que criou o incidente
        table.string('ong_id').notNullable();

        //Criar a chave estrangeira - Campo "ong_id" referencia o campo "id" da tabela "ongs"
        table.foreign('ong_id').references('id').inTable('ongs');

    });
  };
  
  //Comando para criar a tabela
  //npx knex migrate:latest
  
  //O Método Down é responsável por revrsões em casos de falha
   exports.down = function(knex) {
      //Deleta uma tebela criada
     return knex.schema.dropTable('incidents');
  };
  