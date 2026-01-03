import { configureStore } from '@reduxjs/toolkit'
import movieReducer from './reducers/movieReducer'
import selectedMovieReducer from './reducers/selectedMovieReducer'

const store = configureStore({
  reducer: {
    movies: movieReducer,
    selectedMovie: selectedMovieReducer,
  },
})

export default store
