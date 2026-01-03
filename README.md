# Movie Showcase Application

A React-based movie showcase application using The Movie Database (TMDb) API with Redux Toolkit for state management.

## Features

- Browse popular movies in a responsive grid
- Carousel display of top 8 movies
- Detailed movie view with cast, trailer, and information
- Redux state management
- Responsive design for mobile and desktop

## Installation

1. Install dependencies:
```bash
npm install
```

## Running the Application

Start the development server:
```bash
npm run dev
```

The application will open at `http://localhost:5173`

## Building for Production

```bash
npm run build
```

## Technologies

- React 18
- Redux Toolkit
- React-Redux
- Axios
- Vite
- The Movie Database (TMDb) API

## Project Structure

```
src/
├── components/
│   ├── Header.jsx
│   ├── Carousel.jsx
│   ├── MovieCard.jsx
│   └── MovieDetails.jsx
├── reducers/
│   ├── movieReducer.jsx
│   └── selectedMovieReducer.jsx
├── App.jsx
├── App.css
├── main.jsx
├── store.jsx
└── index.css
```

## API Configuration

The application uses TMDb API with the following configuration:
- Base URL: https://api.themoviedb.org/3/
- API Key: e366d974f73ae203397850eadc7bce1f
