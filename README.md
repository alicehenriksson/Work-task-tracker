# Work Task Tracker

A collaborative task management application built with Next.js, Prisma, and NextAuth.js.

## Features

- User authentication with Google and GitHub
- Task creation and management
- Collaborative features
- Real-time updates
- Mobile responsive design

## Setup

1. Clone the repository
2. Run the setup script:
   ```bash
   chmod +x setup.sh
   ./setup.sh
   ```

3. Set up your database:
   - Create a PostgreSQL database
   - Update the DATABASE_URL in .env with your database credentials

4. Set up OAuth credentials:
   - Create a Google OAuth application: https://console.cloud.google.com/
   - Create a GitHub OAuth application: https://github.com/settings/developers
   - Add the credentials to .env

5. Initialize the database:
   ```bash
   npx prisma db push
   ```

6. Run the development server:
   ```bash
   npm run dev
   ```

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Create a new project on Vercel
3. Connect your GitHub repository
4. Add the following environment variables in Vercel:
   - DATABASE_URL
   - NEXTAUTH_SECRET
   - GOOGLE_CLIENT_ID
   - GOOGLE_CLIENT_SECRET
   - GITHUB_ID
   - GITHUB_SECRET

5. Deploy!

### Database Setup

1. Create a PostgreSQL database:
   - Option 1: Use Supabase (Recommended)
     - Create a new project on Supabase
     - Get the connection string
     - Add it to your environment variables
   
   - Option 2: Use any PostgreSQL provider
     - Set up a PostgreSQL database
     - Update the DATABASE_URL in your environment variables

## Development

To add new features or fix bugs:

1. Create a new branch
2. Make your changes
3. Run tests: `npm test`
4. Create a pull request

## License

MIT
