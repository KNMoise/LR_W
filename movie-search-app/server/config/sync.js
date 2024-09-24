const { connectToDatabase, sequelize } = require('../config/database');
const setupAssociations = require('../models/User');



const syncModels = async () => {
  try {
    await connectToDatabase();

    setupAssociations();
    await sequelize.sync({ force: true });
    // don't drop and recreate the tables 
    console.log('Database connected and models synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error;
  }
};

module.exports = {
  syncModels
};