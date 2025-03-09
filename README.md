# DALL-E Image Generation App

A Next.js application that generates images using OpenAI's DALL-E API. Built with Next.js, MongoDB, and TailwindCSS.

## Features

- Generate images using DALL-E AI
- Save and share generated images
- Modern and responsive UI
- MongoDB integration for storing image data
- Vercel-ready deployment

## Tech Stack

- **Framework**: Next.js 14
- **Styling**: TailwindCSS
- **Database**: MongoDB
- **API**: OpenAI DALL-E

## Prerequisites

- Node.js 18+
- MongoDB Atlas account
- OpenAI API key
- Vercel account (for deployment)

## Environment Variables

Create a `.env.local` file with the following variables:

```env
OPENAI_API_KEY=your_openai_api_key
MONGODB_URL=your_mongodb_url
```

## Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/paramveeRana/DALLE.git
   cd DALLE
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment on Vercel

1. Push your code to GitHub

2. Connect your GitHub repository to Vercel

3. Add your environment variables in the Vercel project settings:
   - `OPENAI_API_KEY`
   - `MONGODB_URL`

4. Deploy! Vercel will automatically build and deploy your application.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 