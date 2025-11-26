# --- STAGE 1: BUILDER ---
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and lock files
COPY package*.json ./

# Install ALL dependencies (including devDependencies for building)
RUN npm install

# Copy the rest of the source code
COPY . .

# Build the TypeScript code (Creates the /dist folder)
RUN npm run build

# --- STAGE 2: RUNNER ---
FROM node:18-alpine

WORKDIR /app

# Copy package.json again
COPY package*.json ./

# Install ONLY production dependencies (Saves space)
RUN npm install --only=production

# Copy the built /dist folder from the Builder stage
COPY --from=builder /app/dist ./dist

# Expose the port
EXPOSE 3000

# Start the app using the production build
CMD ["node", "dist/main"]