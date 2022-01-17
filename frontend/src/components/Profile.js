import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { userProfile } from "../api/apiUsers"
import { verifyuser } from "../api/apiUsers"
import { Container, Button } from "react-bootstrap"
import LoggedNav from "./LoggedNav"
const Profile = () => {
  const [info, setInfo] = useState({
    username: undefined,
    name: undefined,
    points: undefined,
    rank: undefined,
    decks: undefined,
  })

  useEffect(async () => {
    getProfileInfo()
  }, [])

  const getProfileInfo = async () => {
    const user = await verifyuser()
    const profile = await userProfile(user.user.id)
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
      <LoggedNav />
      <Container>
        <div className="profile">
          <h1 className="profile-header">{info.username}</h1>
          <h3 className="subheader">
            Rank: {info.rank}
            <br />
            Points: {info.points}
          </h3>
          <Button> Create Deck </Button>
          <div> {info.decks}</div>
        </div>
      </Container>
    </div>
  )
}
export default Profile
