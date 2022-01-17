import React, { useState, useEffect } from "react"
import { getLeaderboard } from "../api/apiCalls"
import RankedUser from "./RankedUser"
import LoggedNav from "./LoggedNav"
const Leaderboard = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetchLeaderboard()
  }, [])

  const fetchLeaderboard = async () => {
    try {
      const response = await getLeaderboard()
      setUsers((prevState) => [...prevState, ...response])
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <LoggedNav />
      <div className="leaderboard">
        <h1 className="profile-header">Leaderboard </h1>
        <h2 className="subheader">Rank | Username | Points </h2>
        {users.map((user) => (
          <RankedUser {...user} />
        ))}
      </div>
    </div>
  )
}

export default Leaderboard
