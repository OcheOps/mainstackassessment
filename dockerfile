FROM node:20

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy app source
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the port
EXPOSE 5000

# Start the server
CMD ["npm", "start"]