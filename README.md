# DALL-E Image Generation App

A full-stack application that generates images using OpenAI's DALL-E API. Built with React, Node.js, and MongoDB.

## Features

- Generate images using DALL-E AI
- Save and share generated images
- Modern and responsive UI
- MongoDB integration for storing image data

## Tech Stack

- **Frontend**: React, Vite, TailwindCSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Container**: Docker
- **API**: OpenAI DALL-E

## Prerequisites

- Node.js 18+
- Docker and Docker Compose
- MongoDB Atlas account
- OpenAI API key

## Environment Variables

Create a `.env` file in the server directory with the following variables:

```env
OPENAI_API_KEY=your_openai_api_key
ORGANISATION_ID=your_organisation_id
MONGODB_URL=your_mongodb_url
JWT_SECRET=your_jwt_secret
COOKIE_SECRET=your_cookie_secret
PORT=8080
```

## Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/paramveeRana/DALLE.git
   cd DALLE
   ```

2. Using Docker:
   ```bash
   docker-compose up --build
   ```

3. Without Docker (Development):
   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install

   # Run both client and server
   cd ..
   npm run dev
   ```

## Usage

1. Access the application at `http://localhost:8082`
2. Enter your name and prompt
3. Click "Generate" to create an image
4. Share the generated image with the community

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 