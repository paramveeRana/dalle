import mongoose from 'mongoose';

const connectDB = async (url) => {
  if (!url) {
    throw new Error('MongoDB URL is not provided');
  }

  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    throw err; // Rethrow to handle in the main application
  }
};

export default connectDB;