import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { connectToDatabase } from '../../../lib/mongodb';

// Check for required environment variables
if (!process.env.OPENAI_API_KEY) {
  throw new Error(
    'Please define the OPENAI_API_KEY environment variable inside .env.local or in your Vercel project settings'
  );
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    // Validate request body
    const { name, prompt } = await req.json();
    
    if (!name || !prompt) {
      return NextResponse.json(
        { message: 'Name and prompt are required' },
        { status: 400 }
      );
    }

    // Generate image with DALL-E
    const aiResponse = await openai.images.generate({
      prompt,
      n: 1,
      size: '1024x1024',
      response_format: 'url',
    });

    const image = aiResponse.data[0];

    try {
      // Connect to MongoDB
      const { db } = await connectToDatabase();

      // Save the generated image data
      await db.collection('posts').insertOne({
        name,
        prompt,
        photo: image.url,
        createdAt: new Date(),
      });
    } catch (dbError) {
      console.error('Database error:', dbError);
      // Continue even if database save fails
      // We still want to return the generated image
    }

    return NextResponse.json({ photo: image.url }, { status: 200 });
  } catch (error) {
    console.error('API error:', error);
    
    // Handle specific error types
    if (error.response?.status === 429) {
      return NextResponse.json(
        { message: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { message: 'Failed to generate image. Please try again.' },
      { status: 500 }
    );
  }
} 