import React from 'react'

const Header = ({ title = "Movie Showcase" }) => {
  return (
    <header className="site-header">
      <h1>{title}</h1>
      <nav>
        <a href="#home">Home</a>
        <a href="#movies">Movies</a>
      </nav>
    </header>
  )
}

export default Header
