import React from "react"
import { Link } from "react-router-dom"

function Header() {
  return (
    <div>
      <nav className="hero">
        <h1>flash_wars</h1>
        <ul class="menu">
          <li class="item">
            <Link to="/login">Log In</Link>
          </li>
          <li class="item">
            <Link to="/signup">Sign Up</Link>
          </li>
          <li class="item">
            <Link to="/textbooks">Categories</Link>
          </li>
        </ul>
      </nav>
      <div className="header-text">
        <h3>make studying into a game by competing with your friends</h3>
        <h4>earn points when you get a card right and rise up the ranks</h4>
        <button className="shop-cta">Play Now </button>
      </div>
    </div>
  )
}

export default Header
