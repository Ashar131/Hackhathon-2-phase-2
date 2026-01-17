# Todo App - Full Stack Application

A modern full-stack todo application built with Next.js, TypeScript, and FastAPI.

## Tech Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS
- **UI Components**: Headless UI, Heroicons
- **Styling**: Tailwind CSS with shadcn/ui-inspired components
- **Backend**: FastAPI with Python
- **Database**: PostgreSQL (Neon Serverless)
- **Authentication**: JWT-based authentication
- **Deployment**: Vercel (Frontend), Railway/Deta/etc. (Backend)

## Features

- User authentication and authorization
- Task management (Create, Read, Update, Delete)
- Task filtering and searching
- Dashboard with statistics
- Responsive design for all devices
- Modern UI with Tailwind CSS

## Environment Variables

### Frontend (.env.local)

```bash
NEXT_PUBLIC_API_BASE_URL=https://your-backend-url.com/api
```

### Backend (.env)

```bash
# Database Configuration
DATABASE_URL='postgresql://username:password@host:port/database'

# Authentication
JWT_SECRET_KEY=your_jwt_secret_key
JWT_REFRESH_SECRET_KEY=your_refresh_token_secret
ACCESS_TOKEN_EXPIRE_MINUTES=30
REFRESH_TOKEN_EXPIRE_DAYS=7

# Application
APP_ENV=production
APP_DEBUG=false
APP_TIMEZONE=UTC

# Better Auth Configuration
BETTER_AUTH_SECRET=your_better_auth_secret
BETTER_AUTH_URL=https://your-frontend-url.com

# Frontend URL
FRONTEND_URL=https://your-frontend-url.com
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Ashar131/Hackhathon-2-phase-2.git
cd Hackhathon-2-phase-2
```

2. Navigate to the frontend directory:
```bash
cd frontend
```

3. Install dependencies:
```bash
npm install
```

4. Set up environment variables (copy `.env.example` to `.env.local` and update values)

5. Run the development server:
```bash
npm run dev
```

6. For the backend, navigate to the backend directory and follow backend-specific instructions.

## Available Scripts

In the frontend directory, you can run:

- `npm run dev` - Starts the development server
- `npm run build` - Builds the production-ready application
- `npm run start` - Starts the production server
- `npm run lint` - Runs ESLint to check for code issues

## Deployment

### Frontend Deployment (Vercel)

1. Connect your GitHub repository to Vercel
2. Add the required environment variables in Vercel dashboard
3. Deploy!

### Backend Deployment

Deploy your FastAPI backend to platforms like Railway, Deta, or AWS.

## API Endpoints

The application communicates with the backend API for all data operations. The API base URL is configured via the `NEXT_PUBLIC_API_BASE_URL` environment variable.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.