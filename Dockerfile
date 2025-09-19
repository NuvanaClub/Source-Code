# Use the official Node.js 18 image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy the rest of the application
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Expose the port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
