#!/bin/sh
set -e

# Ensure we are in the app directory
cd /app

echo "Running database migrations..."
# Use full path to npx if needed, but npx is usually in PATH
npx prisma db push --skip-generate

echo "Starting application..."
# Use absolute path for server.js
exec node /app/server.js
