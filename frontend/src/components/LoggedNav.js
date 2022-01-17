import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { verifyuser } from "../api/apiUsers"
function LoggedNav() {
  const [userId, setUserId] = useState()
  useEffect(() => {
    getUser()
  }, [])

  const getUser = async () => {
    const userId = await verifyuser()
    if (userId.user) setUserId(userId.user.id)
  }
  return (
    <nav className="loggedNav">
      <h1>flash_wars</h1>
      <ul class="menu">
        <li class="item">
          <Link to="/profile" style={{ textDecoration: "none" }}>
            Profile
          </Link>
        </li>
        <li class="item">
          <Link
            to={`profile/${userId}/decks`}
            style={{ textDecoration: "none" }}
          >
            Decks
          </Link>
        </li>
        <li class="item">
          <Link to="/categories" style={{ textDecoration: "none" }}>
            Categories
          </Link>
        </li>
        <li class="item">
          <Link to="/leaderboard" style={{ textDecoration: "none" }}>
            Leaderboard
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default LoggedNav
