import React, { useState, useEffect } from 'react'
import axios from 'axios'

const API_KEY = 'e366d974f73ae203397850eadc7bce1f'
const BASE_URL = 'https://api.themoviedb.org/3'

const MovieDetails = ({ movieId, onClose }) => {
  const [details, setDetails] = useState(null)
  const [cast, setCast] = useState([])
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        setLoading(true)
        setError(null)

        const [detailsRes, creditsRes, videosRes] = await Promise.all([
          axios.get(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`),
          axios.get(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`),
          axios.get(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`),
        ])

        setDetails(detailsRes.data)
        setCast(creditsRes.data.cast.slice(0, 6))
        
        const trailers = videosRes.data.results.filter(
          (video) => video.type === 'Trailer' && video.site === 'YouTube'
        )
        setVideos(trailers)
        
        setLoading(false)
      } catch (err) {
        setError('Failed to load movie details')
        setLoading(false)
      }
    }

    fetchMovieData()
  }, [movieId])

  if (loading) {
    return (
      <div className="movie-details-overlay">
        <div className="movie-details-modal">
          <div className="loading">Loading...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="movie-details-overlay">
        <div className="movie-details-modal">
          <div className="error">{error}</div>
          <button className="close-btn" onClick={onClose}>Close</button>
        </div>
      </div>
    )
  }

  const backdropUrl = details.backdrop_path
    ? `https://image.tmdb.org/t/p/original${details.backdrop_path}`
    : 'https://via.placeholder.com/1920x1080?text=No+Backdrop'

  const posterUrl = details.poster_path
    ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Poster'

  const releaseYear = details.release_date ? new Date(details.release_date).getFullYear() : 'N/A'
  const runtime = details.runtime ? `${details.runtime} min` : 'N/A'
  const rating = details.vote_average ? details.vote_average.toFixed(1) : 'N/A'
  const genres = details.genres ? details.genres.map(g => g.name).join(', ') : 'N/A'

  return (
    <div className="movie-details-overlay" onClick={onClose}>
      <div className="movie-details-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>✕</button>
        
        <div className="backdrop-hero" style={{ backgroundImage: `url(${backdropUrl})` }}>
          <div className="backdrop-overlay"></div>
        </div>

        <div className="details-content">
          <div className="details-layout">
            <div className="poster-section">
              <img src={posterUrl} alt={details.title} />
            </div>

            <div className="info-section">
              <h1>{details.title}</h1>
              <div className="meta-info">
                <span className="rating">⭐ {rating}</span>
                <span>{releaseYear}</span>
                <span>{runtime}</span>
              </div>
              <div className="genres">{genres}</div>
              <p className="synopsis">{details.overview}</p>

              {videos.length > 0 && (
                <div className="trailer-section">
                  <h3>Trailer</h3>
                  <iframe
                    width="100%"
                    height="315"
                    src={`https://www.youtube.com/embed/${videos[0].key}`}
                    title="Movie Trailer"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}

              {cast.length > 0 && (
                <div className="cast-section">
                  <h3>Cast</h3>
                  <div className="cast-grid">
                    {cast.map((actor) => (
                      <div key={actor.id} className="cast-member">
                        <img
                          src={
                            actor.profile_path
                              ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                              : 'https://via.placeholder.com/185x278?text=No+Photo'
                          }
                          alt={actor.name}
                        />
                        <p className="actor-name">{actor.name}</p>
                        <p className="character-name">{actor.character}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetails
