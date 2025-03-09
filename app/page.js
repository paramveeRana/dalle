'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [form, setForm] = useState({
    name: '',
    prompt: '',
  });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [generatedImage, setGeneratedImage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.prompt || !form.name) {
      alert('Please enter your name and prompt');
      return;
    }

    try {
      setGeneratingImg(true);
      const response = await fetch('/api/dalle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      setGeneratedImage(data.photo);
    } catch (error) {
      console.error(error);
      alert('Error generating image');
    } finally {
      setGeneratingImg(false);
    }
  };

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          Generate Images with DALL-E
        </h1>
        
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Your Name
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Prompt
            </label>
            <textarea
              value={form.prompt}
              onChange={(e) => setForm({ ...form, prompt: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              rows={4}
              required
            />
          </div>

          <button
            type="submit"
            disabled={generatingImg}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {generatingImg ? 'Generating...' : 'Generate Image'}
          </button>
        </form>

        {generatedImage && (
          <div className="mt-8 flex justify-center">
            <div className="relative w-[512px] h-[512px]">
              <Image
                src={generatedImage}
                alt={form.prompt}
                fill
                className="rounded-lg shadow-lg"
                priority
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
} 