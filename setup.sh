#!/bin/bash

# Install dependencies
npm install @prisma/client @auth/prisma-adapter next-auth
npm install prisma --save-dev

# Initialize Prisma
npx prisma generate

# Create .env file template
cat > .env << EOL
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/taskapp"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# OAuth
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GITHUB_ID=""
GITHUB_SECRET=""
EOL

echo "Setup complete! Please update your .env file with your actual credentials." 