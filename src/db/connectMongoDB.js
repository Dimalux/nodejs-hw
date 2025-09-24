// src/db/connectMongoDB.js


import mongoose from 'mongoose';

export const connectMongoDB = async () => {
  try {

    // напевно треба такий URL:
  const mongoUrl = process.env.MONGODB_URL;


// напевно тут помилка 
    // const mongoUrl = process.env.MONGO_URL;





    await mongoose.connect(mongoUrl);
    console.log('✅ MongoDB connection established successfully');
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error.message);
    process.exit(1); // аварійне завершення програми
  }
};
