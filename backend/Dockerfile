# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --legacy-peer-deps

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies only (ignore postinstall script that requires patch-package)
RUN npm ci --legacy-peer-deps --omit=dev --ignore-scripts

# Copy built files from builder (node_modules already have patches applied)
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

# Copy necessary files
COPY index.js ./
COPY medusa-config.js ./
COPY tsconfig.json ./

# Create uploads directory
RUN mkdir -p uploads

# Create entrypoint script to run migrations before starting
RUN printf '#!/bin/sh\nset -e\necho "Running Medusa migrations..."\nnpx medusa migrations run\necho "Starting Medusa server..."\nexec node index.js\n' > /app/entrypoint.sh && chmod +x /app/entrypoint.sh

# Expose port
EXPOSE 9000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=60s --retries=5 \
  CMD node -e "require('http').get('http://localhost:9000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start the application with migrations
CMD ["/app/entrypoint.sh"]

