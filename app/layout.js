import './globals.css'

export const metadata = {
  title: 'DALL-E Image Generator',
  description: 'Generate amazing images using OpenAI DALL-E',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
} 