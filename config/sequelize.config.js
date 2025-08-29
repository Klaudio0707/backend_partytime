
require('dotenv').config(); 
const { URL } = require('url');


if (!process.env.DATABASE_URL) {
  throw new Error('A variável de ambiente DATABASE_URL não foi definida.');
}

const dbUrl = new URL(process.env.DATABASE_URL);

const config = {
  username: dbUrl.username,
  password: dbUrl.password,
  database: dbUrl.pathname.slice(1),
  host: dbUrl.hostname,
  port: dbUrl.port,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
};

// A CLI do Sequelize espera um objeto com as chaves de ambiente
module.exports = {
  development: config,
  test: config,
  production: config,
};