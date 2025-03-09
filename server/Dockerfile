FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

# Install dependencies and nodemon globally
RUN npm install && npm install -g nodemon

COPY . .

EXPOSE 5000

# Add nodemon config to prevent hanging
ENV NODEMON_LEGACY_WATCH=true

CMD ["nodemon", "--legacy-watch", "index.js"] 