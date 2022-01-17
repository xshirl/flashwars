import React, { useEffect, useState } from "react"
import { Link, Switch, Route } from "react-router-dom"
import Profile from "./Profile"
import { verifyuser } from "../api/apiUsers"
import { userProfile } from "../api/apiUsers"

import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"

const Home = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState()
  useEffect(() => {
    getUser()
  }, [])

  const getUser = async () => {
    try {
      const userId = await verifyuser()
      if (userId) setUser(userId)
      setLoggedIn(true)
    } catch (error) {
      console.log(error)
    }
  }
  const getProfile = (loggedIn) => {
    const profile = loggedIn && <Profile user={user} />
    return profile
  }

  return (
    <React.Fragment>
      {loggedIn ? (
        getProfile(loggedIn)
      ) : (
        <div>
          <nav className="hero">
            <h1>flash_wars</h1>
            <ul class="menu">
              <li class="item">
                <Link to="/login" style={{ textDecoration: "none" }}>
                  Log In
                </Link>
              </li>
              <li class="item">
                <Link to="/signup" style={{ textDecoration: "none" }}>
                  Sign Up
                </Link>
              </li>
              <li class="item">
                <Link to="/categories" style={{ textDecoration: "none" }}>
                  Categories
                </Link>
              </li>
            </ul>
          </nav>
          <div className="header-text">
            <h3>make studying into a game by competing with your friends</h3>
            <h4>earn points when you get a card right and rise up the ranks</h4>
            <button className="shop-cta">Play Now </button>
          </div>
        </div>
      )}
    </React.Fragment>
  )
}

export default Home
