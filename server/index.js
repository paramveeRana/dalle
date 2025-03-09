import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';

dotenv.config();

const app = express();

// Enable CORS for all origins in development, specific origin in production
app.use(cors({
  origin: '*',  // Allow all origins temporarily to debug
  credentials: true,
}));

app.use(express.json({ limit: '50mb' }));

// Health check endpoint
app.get('/', async (req, res) => {
  res.status(200).json({
    message: 'Hello from DALL.E!',
    env: process.env.NODE_ENV,
    mongodb: !!process.env.MONGODB_URL,
    openai: !!process.env.OPENAI_API_KEY
  });
});

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

const PORT = process.env.PORT || 8080;

const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB(process.env.MONGODB_URL);
    console.log('Connected to MongoDB');
    
    // Start the server
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server is running on port ${PORT}`);
      console.log('Environment:', process.env.NODE_ENV);
      console.log('MongoDB URL exists:', !!process.env.MONGODB_URL);
      console.log('OpenAI API Key exists:', !!process.env.OPENAI_API_KEY);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1); // Exit if we can't start the server
  }
};

startServer();