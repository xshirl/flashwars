import React, { useState, useEffect } from "react"
import { getLeaderboard } from "../api/apiCalls"
import RankedUser from "./RankedUser"

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
      {users.map((user) => (
        <RankedUser {...user} />
      ))}
    </div>
  )
}

export default Leaderboard
