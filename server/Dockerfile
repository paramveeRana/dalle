FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

# Install dependencies
RUN npm install

COPY . .

# Use the PORT environment variable
ENV PORT=8080

# Expose the port
EXPOSE 8080

# Start the application
CMD ["npm", "start"] 