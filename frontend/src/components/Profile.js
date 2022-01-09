import React, { useState, useEffect } from "react"
import { userProfile } from "../api/apiUsers"
import { verifyuser } from "../api/apiUsers"
const Profile = () => {
  const [info, setInfo] = useState({
    username: undefined,
    name: undefined,
    points: undefined,
    rank: undefined,
    decks: undefined,
  })
  // const [decks, setDecks]

  useEffect(async () => {
    getProfileInfo()
  }, [])

  const getProfileInfo = async () => {
    const user = await verifyuser()
    console.log("user", user)
    const profile = await userProfile(user.user.id)
    console.log("profile", profile)
    setInfo((prevState) => ({
      ...prevState,
      username: profile.user.username,
      name: profile.user.name,
      points: profile.user.points,
      rank: profile.user.rank,
      decks: profile.user.decks,
    }))
  }
  return (
    <div>
      {info.username} {info.points} {info.rank} {info.decks}
    </div>
  )
}
export default Profile
