
// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './src/database/db.sqlite'  //Declara o arquivo que servirá como base de banco de dados e seu caminho
    },
    //Criando nova configuração "migration"
    migrations: {
      directory: './src/database/migrations'
    },
    useNullAsDefault: true, //Corrige: sqlite does not support inserting default values. Set the `useNullAsDefault` flag to hide this warning. (see docs http://knexjs.org/#Builder-insert)
  },

  test: {
    client: 'sqlite3',
    connection: {
      filename: './src/database/test.sqlite'  //Declara o arquivo que servirá como base de banco de dados e seu caminho
    },
    //Criando nova configuração "migration"
    migrations: {
      directory: './src/database/migrations'
    },
    useNullAsDefault: true, //Corrige: sqlite does not support inserting default values. Set the `useNullAsDefault` flag to hide this warning. (see docs http://knexjs.org/#Builder-insert)
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
