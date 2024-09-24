const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'postgres',
  logging: false
});

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected');
    return sequelize;
  } catch (err) {
    console.error('Database connection error', err);
    throw err;
  }
};

module.exports = { sequelize, connectToDatabase };