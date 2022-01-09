import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

import { getDecksByCategory, getUserDecks } from "../api/apiCalls"

import Deck from "./Deck"

const DeckList = () => {
  const [decks, setDecks] = useState([])
  const { id, userId } = useParams()
  useEffect(() => {
    id ? fetchDecksByCategory(id) : fetchDecksByUser(userId)
  }, [])

  const fetchDecksByCategory = async (userId) => {
    const response = await getDecksByCategory(userId)
    setDecks((prevState) => [...prevState, ...response])
  }

  const fetchDecksByUser = async (userId) => {
    const response = await getUserDecks(userId)
    setDecks((prevState) => [...prevState, ...response])
  }

  return (
    <div>
      {decks.map((deck) => (
        <Deck key={deck._id} {...deck} />
      ))}
    </div>
  )
}

export default DeckList
