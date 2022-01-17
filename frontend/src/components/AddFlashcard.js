import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Button, Modal, Form, Dropdown } from "react-bootstrap"
import { createFlashcard } from "../api/apiCalls"
import { verifyuser } from "../api/apiUsers"

const AddFlashcard = ({ show, closeHandler }) => {
  const { id } = useParams()
  const [flashcard, setFlashcard] = useState({ difficulty: 1 })
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
      setFlashcard((prevState) => ({ ...prevState, deck: id, creator: userId }))
      const response = await createFlashcard(id, flashcard)
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
          <Form.Label>Question</Form.Label>
          <Form.Control
            className="form-group"
            type="text"
            onChange={handleChange}
            value={flashcard.question}
            name="question"
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Answer</Form.Label>
          <Form.Control
            type="text"
            className="form-group"
            onChange={handleChange}
            value={flashcard.answer}
            name="answer"
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label> Difficulty </Form.Label>
          <Form.Control
            as="select"
            defaultValue={flashcard.difficulty}
            name="difficulty"
            onChange={handleChange}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </Form.Control>
        </Form.Group>
      </Modal.Body>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Add Flashcard
      </Button>
      <Button variant="secondary" onClick={closeHandler}>
        Close
      </Button>
    </Modal>
  )
}

export default AddFlashcard
