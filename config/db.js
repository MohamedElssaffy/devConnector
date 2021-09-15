const mongoose = require('mongoose');
const config = require('config');
const dbURI = process.env.mongoURI || config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(dbURI);
    console.log('mongoDB connected...');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
