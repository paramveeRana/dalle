import express from 'express';
import * as dotenv from 'dotenv';
import OpenAI from "openai";

dotenv.config();

const dalleRoutes = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

dalleRoutes.route('/').get((req, res) => {
  res.status(200).json({ message: 'Hello from DALL-E!' });
});

dalleRoutes.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    console.log('Generating image for prompt:', prompt);
    console.log('Using API key:', process.env.OPENAI_API_KEY ? 'API key is set' : 'API key is missing');

    const aiResponse = await openai.images.generate({
      prompt,
      n: 1,
      size: '1024x1024',
      response_format: 'b64_json',
    });

    if (!aiResponse.data || !aiResponse.data[0]) {
      throw new Error('No image data received from OpenAI');
    }

    const image = aiResponse.data[0].b64_json;
    res.status(200).json({ photo: image });
  } catch (error) {
    console.error('DALL-E API Error:', error);
    res.status(500).json({
      error: error?.response?.data?.error?.message || error.message || 'Something went wrong',
      details: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
});

export default dalleRoutes;