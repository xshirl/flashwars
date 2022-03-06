import React, { useState, useEffect } from "react"
import styled from "styled-components"

import { Button, Modal } from "react-bootstrap"
import { verifyuser } from "../api/apiUsers"
import { getGameDecks, getPlayingDeck } from "../api/apiCalls"
import DisplayedCard from "./DisplayedCard"

const Decks = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const Deck = styled.button`
  display: flex;
  padding: 10px;
  color: teal;
  margin: 5px;
  border-radius: 10px;
  outline: none;
  border: 1px solid #eee;
`
const Game = ({ socket }) => {
  console.log("socket", socket)
  const [username, setUsername] = useState()
  const [decks, setDecks] = useState([])
  const [show, setShow] = useState(false)
  const [cards, setCards] = useState()
  const [playingDeck, setPlayingDeck] = useState()
  const [cardIndex, setCardIndex] = useState(0)
  const [displayedCard, setDisplayedCard] = useState()

  useEffect(async () => {
    const response = await verifyuser()
    setUsername(response.user.username)
  }, [])

  const handleReadySubmit = () => {
    console.log("clicced")
    socket.emit("ready", username)
  }

  const fetchGameDecks = async () => {
    const response = await getGameDecks()
    console.log("fetched")
    console.log(response)
    setDecks((prevState) => [...prevState, ...response])
  }

  useEffect(async () => {
    await fetchGameDecks()
  }, [])
  socket.on("showDeckChoices", (startUser) => {
    if (username === startUser) {
      showDecks()
    }
  })

  const closeHandler = () => {
    setShow(false)
  }
  const showDecks = async () => {
    setShow(true)
  }

  const startGame = () => {
    console.log("startGame")
    socket.emit("startGame")
  }

  const fetchPlayingDeck = async (deckId) => {
    console.log("playing deck")
    const response = await getPlayingDeck(deckId)
    setCards(response)
  }

  useEffect(async () => {
    await fetchPlayingDeck()
  }, [playingDeck])

  useEffect(() => {
    changeDisplayedCard(cardIndex)
  }, [cardIndex])

  const incrementCardIndex = () => {
    if (cardIndex < cards.length - 1) {
      setCardIndex(cardIndex + 1)
      changeDisplayedCard(cardIndex)
    }
  }

  const changeDisplayedCard = (cardIndex) => {
    if (cardIndex >= 0 && cardIndex < cards.length) {
      const card = cards.filter((flashcard, index) => index === cardIndex)
      setDisplayedCard(card[0])
    }
  }

  return (
    <div>
      <button onClick={handleReadySubmit}>Ready to Play</button>
      <button onClick={startGame}>Start Game</button>
      <Modal show={show} onHide={closeHandler}>
        <Modal.Header>Pick a deck</Modal.Header>
        <Modal.Body>
          <Decks>
            {decks.map((deck) => (
              <button
                className="optionDeck"
                onClick={() => fetchPlayingDeck(deck._id)}
              >
                {deck.name}
              </button>
            ))}
          </Decks>
        </Modal.Body>

        <Button variant="secondary" onClick={closeHandler}>
          Start Game
        </Button>
      </Modal>

      <div className="cardDisplayContainer">
        <div className="cardDisplay"></div>
      </div>
    </div>
  )
}
export default Game
