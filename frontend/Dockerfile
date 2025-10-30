# Use Node.js base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application files
COPY . .

# Expose port 8000
EXPOSE 8000

# Set environment variable
ENV PORT=8000

# Start the application
CMD ["npm", "run", "dev"]
