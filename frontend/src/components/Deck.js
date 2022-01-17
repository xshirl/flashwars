import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Button, Modal } from "react-bootstrap"
import AddFlashcard from "./AddFlashcard"

const Deck = ({ name, _id, flashcards, categoryId }) => {
  const [showCreateModal, setShowCreateModal] = useState(false)

  const handleCloseModal = () => setShowCreateModal(false)
  const handleShowModal = () => setShowCreateModal(true)

  return (
    <div>
      <Link
        to={{ pathname: `/decks/${_id}` }}
        style={{ textDecoration: "none" }}
      >
        <span className="deckName">{name}</span>{" "}
      </Link>
      {flashcards}
    </div>
  )
}
export default Deck
