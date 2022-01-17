import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Container } from "react-bootstrap"
import { getDecksByCategory, getUserDecks } from "../api/apiCalls"

import Deck from "./Deck"
import LoggedNav from "./LoggedNav"

const DeckList = () => {
  const [decks, setDecks] = useState([])
  const { id, userId } = useParams()
  useEffect(() => {
    id ? fetchDecksByCategory(id) : fetchDecksByUser(userId)
  }, [])

  const fetchDecksByCategory = async (id) => {
    const response = await getDecksByCategory(id)
    setDecks((prevState) => [...prevState, ...response])
  }

  const fetchDecksByUser = async (userId) => {
    const response = await getUserDecks(userId)
    setDecks((prevState) => [...prevState, ...response])
  }

  return (
    <div>
      {" "}
      <LoggedNav />
      <Container>
        <h2 className="profile-header"> Public Decks </h2>
        <div className="deckContainer">
          {decks.map((deck) => (
            <div className="deck">
              <Deck key={deck._id} categoryId={id} {...deck} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default DeckList
