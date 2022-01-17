import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getFlashcards } from "../api/apiCalls"
import Flashcard from "./Flashcard"
import { Button, Modal } from "react-bootstrap"
import AddFlashcard from "./AddFlashcard"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import LoggedNav from "./LoggedNav"
import DisplayedCard from "./DisplayedCard"
const FlashcardList = () => {
  const [flashcards, setFlashcards] = useState([])
  const { deckId } = useParams()
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [cardIndex, setCardIndex] = useState(0)
  const [displayedCard, setDisplayedCard] = useState()
  const handleCloseModal = () => setShowCreateModal(false)
  const handleShowModal = () => setShowCreateModal(true)

  const fetchFlashcards = async (id) => {
    try {
      const flashcards = await getFlashcards(id)
      setFlashcards((prevState) => [...prevState, ...flashcards])
      setDisplayedCard(flashcards[0])
      setCardIndex(0)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchFlashcards(deckId)
  }, [])

  useEffect(() => {
    changeDisplayedCard(cardIndex)
  }, [cardIndex])

  const incrementCardIndex = () => {
    if (cardIndex < flashcards.length - 1) {
      setCardIndex(cardIndex + 1)
      changeDisplayedCard(cardIndex)
    }
  }
  const decrementCardIndex = () => {
    if (cardIndex > 0) {
      setCardIndex(cardIndex - 1)
      changeDisplayedCard(cardIndex)
    }
  }

  const changeDisplayedCard = (cardIndex) => {
    if (cardIndex >= 0 && cardIndex < flashcards.length) {
      const card = flashcards.filter((flashcard, index) => index === cardIndex)
      setDisplayedCard(card[0])
    }
  }

  return (
    <div>
      <LoggedNav />
      {/* {flashcards.map((flashcard) => (
        <Flashcard deckId={deckId} {...flashcard} />
      ))} */}
      <Button variant="primary" onClick={handleShowModal}>
        Create Flashcard
      </Button>
      {showCreateModal && (
        <AddFlashcard
          show={showCreateModal}
          deckId={deckId}
          closeHandler={handleCloseModal}
        />
      )}

      <div className="cardDisplayContainer">
        <div className="cardDisplay">
          <DisplayedCard
            decrementIndex={decrementCardIndex}
            incrementIndex={incrementCardIndex}
            {...displayedCard}
          />
        </div>
      </div>
    </div>
  )
}

export default FlashcardList
