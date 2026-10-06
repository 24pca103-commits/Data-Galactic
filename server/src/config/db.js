const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/datagalactic';
  
  try {
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = true;
    console.log(`[DataGalactic DB] MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`[DataGalactic DB] MongoDB connection failed (${error.message}). Running with hybrid storage.`);
    isConnected = false;
  }
};

const getStatus = () => isConnected;

module.exports = { connectDB, getStatus };
