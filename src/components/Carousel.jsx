import React, { useState } from 'react'

const Carousel = ({ items = [] }) => {
  const [index, setIndex] = useState(0)

  const handlePrev = () => {
    setIndex((prevIndex) => (prevIndex === 0 ? items.length - 1 : prevIndex - 1))
  }

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1))
  }

  if (items.length === 0) {
    return <div className="carousel">No items to display</div>
  }

  const currentItem = items[index]
  const imageUrl = currentItem.backdrop_path
    ? `https://image.tmdb.org/t/p/w1280${currentItem.backdrop_path}`
    : currentItem.poster_path
    ? `https://image.tmdb.org/t/p/w1280${currentItem.poster_path}`
    : 'https://via.placeholder.com/1280x320?text=No+Image'

  return (
    <div className="carousel">
      <button className="carousel-btn carousel-btn-prev" onClick={handlePrev}>
        ‹
      </button>
      <div className="carousel-slide">
        <img src={imageUrl} alt={currentItem.title} />
        <div className="carousel-info">
          <h2>{currentItem.title}</h2>
        </div>
      </div>
      <button className="carousel-btn carousel-btn-next" onClick={handleNext}>
        ›
      </button>
    </div>
  )
}

export default Carousel
