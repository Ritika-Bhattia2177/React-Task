import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import Header from './components/Header'
import Carousel from './components/Carousel'
import MovieCard from './components/MovieCard'
import MovieDetails from './components/MovieDetails'
import { initialize } from './reducers/movieReducer'
import { clearSelectedMovie } from './reducers/selectedMovieReducer'
import './App.css'

const API_KEY = 'e366d974f73ae203397850eadc7bce1f'
const BASE_URL = 'https://api.themoviedb.org/3'

function App() {
  const dispatch = useDispatch()
  const movies = useSelector((state) => state.movies)
  const selectedMovie = useSelector((state) => state.selectedMovie)

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/movie/popular?api_key=${API_KEY}`
        )
        dispatch(initialize(response.data.results))
      } catch (error) {
        console.error('Error fetching movies:', error)
      }
    }

    fetchPopularMovies()
  }, [dispatch])

  const handleCloseDetails = () => {
    dispatch(clearSelectedMovie())
  }

  if (selectedMovie) {
    return (
      <MovieDetails 
        movieId={selectedMovie.id} 
        onClose={handleCloseDetails} 
      />
    )
  }

  const topMovies = movies.slice(0, 8)

  return (
    <div className="app">
      <Header />
      {topMovies.length > 0 && <Carousel items={topMovies} />}
      <main className="main-content">
        <div className="movie-grid">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </main>
    </div>
  )
}

export default App
