# 🎬 HeSFlix - Movies & TV Series Platform

A modern web application for browsing movies and TV series with authentication and favorites system.

## ✨ Features

### 🎥 Content Browsing

- Browse popular movies and TV series
- **Curated Collections** - Trending, Top Rated, Popular, Upcoming, Now Playing
- Search movies, TV shows, and actors
- Advanced filters (genres, ratings, sorting)
- Detailed information (ratings, trailers, cast, seasons & episodes)

### 👤 User Features

- **User authentication** (Appwrite)
- ❤️ **Favorites list** for registered users
- Personal profile management
- Protected routes for authenticated users

### 📺 Media Details

- 🎭 Actor profiles and complete filmography
- 📽️ Trailers and videos
- 🎬 Full cast and crew credits
- 📺 TV show seasons and episodes
- ⭐ User ratings and reviews

### 🎨 UI/UX

- 📱 Fully responsive design
- ⚡ Server-side rendering (SSR) with Next.js 15
- 🔄 Suspense boundaries with loading states
- 🎯 SEO optimized with dynamic metadata
- 🚨 Comprehensive error handling

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- TMDB API key ([Get it here](https://www.themoviedb.org/settings/api))
- Appwrite account ([Sign up](https://cloud.appwrite.io))

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd hesflix
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env.local` file:

```env
# TMDB API (server-side only)
API_KEY=your_tmdb_api_key

# Appwrite Configuration
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
NEXT_PUBLIC_DATABASE_ID=your_database_id

# Local URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

4. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📝 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🔧 Appwrite Setup

See [APPWRITE_SETUP.md](./APPWRITE_SETUP.md) for detailed configuration.

Quick steps:

1. Create project on [cloud.appwrite.io](https://cloud.appwrite.io)
2. Copy Project ID to `.env.local`
3. Create database and `favorites` table
4. Configure permissions

## 🚀 Deployment

### Vercel (Recommended):

```bash
vercel
```

Add environment variables in Vercel project settings.

### After deployment:

1. Update hostname in Appwrite Platform settings
2. Add your production domain

## Key Technologies

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Authentication:** Appwrite
- **API:** The Movie Database (TMDB)
- **Deployment:** Vercel

## 🆕 Recent Updates

### Collections System

- 10 curated collections (Trending, Top Rated, Popular, etc.)
- Scalable configuration in `constants/collections.ts`
- Easy to add new collections

### Enhanced SEO

- Dynamic metadata for all pages
- OpenGraph tags for social sharing
- Optimized meta descriptions

### Error Handling

- Custom error boundaries for all routes
- User-friendly error messages
- Graceful fallbacks
