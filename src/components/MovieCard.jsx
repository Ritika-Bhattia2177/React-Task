import React from 'react'
import { useDispatch } from 'react-redux'
import { setSelectedMovie } from '../reducers/selectedMovieReducer'

const MovieCard = ({ movie }) => {
  const dispatch = useDispatch()
  
  const truncateText = (text, maxLength) => {
    if (!text) return ''
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
  }

  const handleClick = () => {
    dispatch(setSelectedMovie(movie))
  }

  const imageUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
    : movie.backdrop_path
    ? `https://image.tmdb.org/t/p/w342${movie.backdrop_path}`
    : 'https://via.placeholder.com/342x513?text=No+Image'

  return (
    <article className="movie-card" onClick={handleClick}>
      <img src={imageUrl} alt={movie.title} />
      <div className="movie-card-body">
        <h3>{movie.title}</h3>
        <p>{truncateText(movie.overview, 120)}</p>
      </div>
    </article>
  )
}

export default MovieCard
