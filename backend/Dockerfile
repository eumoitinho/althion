# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL dependencies (including dev deps for build and patch-package)
RUN npm ci --legacy-peer-deps

# Copy patches and apply them
COPY patches ./patches
RUN npx patch-package

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy built application and patched node_modules from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Copy scripts and data for seeding
COPY --from=builder /app/scripts ./scripts
COPY --from=builder /app/data ./data

# Copy necessary files
COPY index.js ./
COPY medusa-config.js ./
COPY tsconfig.json ./
COPY package*.json ./

# Create uploads directory
RUN mkdir -p uploads

# Create entrypoint script to run migrations and seed before starting
RUN printf '#!/bin/sh\necho "=== Environment check ==="\necho "DATABASE_URL: ${DATABASE_URL}"\necho "REDIS_URL: ${REDIS_URL}"\necho "=== Running Medusa migrations ==="\nnpx medusa migrations run 2>&1 || echo "Migrations failed or already applied"\necho "=== Running seed script ==="\nnode scripts/seed-direct.js 2>&1 || echo "Seed failed or already applied"\necho "=== Starting Medusa server ==="\nnode index.js 2>&1\n' > /app/entrypoint.sh && chmod +x /app/entrypoint.sh

# Expose port
EXPOSE 9000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=60s --retries=5 \
  CMD node -e "require('http').get('http://localhost:9000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start the application with migrations
CMD ["/app/entrypoint.sh"]

