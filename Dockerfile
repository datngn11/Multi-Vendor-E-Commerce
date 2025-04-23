FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Expose Next.js dev server port
EXPOSE 3000

# Start in dev mode using Turbopack
CMD ["npm", "run", "dev"]