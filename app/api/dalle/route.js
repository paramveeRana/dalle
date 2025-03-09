import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { connectToDatabase } from '@/lib/mongodb';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const { name, prompt } = await req.json();

    const aiResponse = await openai.images.generate({
      prompt,
      n: 1,
      size: '1024x1024',
      response_format: 'url',
    });

    const image = aiResponse.data[0];

    // Connect to MongoDB
    const { db } = await connectToDatabase();

    // Save the generated image data
    await db.collection('posts').insertOne({
      name,
      prompt,
      photo: image.url,
      createdAt: new Date(),
    });

    return NextResponse.json({ photo: image.url }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    );
  }
} 