import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Button, Modal, Form, Dropdown } from "react-bootstrap"
import { createFlashcard } from "../api/apiCalls"
import { verifyuser } from "../api/apiUsers"
import deck from "../../../backend/models/deck"

const AddDeck = ({ show, closeHandler }) => {
  const [deckName, setDeckName] = useState({ difficulty: 1 })
  const [userId, setUserId] = useState()
  useEffect(() => {
    getUser()
  }, [])

  const getUser = async () => {
    const response = await verifyuser()
    setUserId(response.user.id)
  }
  const handleChange = (e) => {
    const { name, value } = e.target
    name == "difficulty"
      ? setFlashcard((prevState) => ({
          ...prevState,
          difficulty: parseInt(value),
        }))
      : setFlashcard((prevState) => ({
          ...prevState,
          [name]: value,
        }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setFlashcard((prevState) => ({
        ...prevState,
        deck: deckId,
        creator: userId,
      }))
      const response = await createFlashcard(deckId, flashcard)
      console.log(response)
      closeHandler()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Modal show={show} onHide={closeHandler}>
      <Modal.Header closeButton>
        <Modal.Title> Add Flashcard </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            className="form-group"
            type="text"
            onChange={handleChange}
            value={deck.name}
            name="name"
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            className="form-group"
            onChange={handleChange}
            value={deck.description}
            name="description"
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label> Public? </Form.Label>
          <Form.Control as="select" name="isPublic" onChange={handleChange}>
            <option value="true">Public</option>
            <option value="false">Private</option>
          </Form.Control>
        </Form.Group>
      </Modal.Body>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Create Deck
      </Button>
      <Button variant="secondary" onClick={closeHandler}>
        Close
      </Button>
    </Modal>
  )
}

export default AddDeck
