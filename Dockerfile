# Step 1: Build Frontend
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend

COPY frontend2/ ./
RUN npm install && npm run build

# Step 2: Build Backend
FROM node:20-alpine
WORKDIR /app

# Copy only package.json first, then install
COPY backend/package*.json ./backend/
RUN cd backend && npm install

# Now copy source code (excluding node_modules, thanks to .dockerignore)
COPY backend ./backend

# Copy built frontend to backend/public
COPY --from=frontend-builder /app/frontend/dist ./backend/public

WORKDIR /app/backend

EXPOSE 8080
CMD ["node", "index.js"]
