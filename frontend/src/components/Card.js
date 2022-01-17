import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Form, Modal, Button } from "react-bootstrap"
import { updateUserPoints } from "../api/apiCalls"
import { getFlashcard } from "../api/apiCalls"
import checkSimilarity from "../utils/checkStringSimilarity"
const Card = ({ _id }) => {
  const [question, setQuestion] = useState()
  const [answer, setAnswer] = useState()
  const [isAnswered, setIsAnswered] = useState(false)
  const [userAnswer, setUserAnswer] = useState()
  const [accuracy, setAccuracy] = useState()
  const [showAnswerModal, setShowAnswerModal] = useState(false)
  const [keepAnswer, setKeepAnswer] = useState(false)
  const { cardId } = useParams()
  useEffect(() => {
    console.log(_id)
    console.log("card", cardId)
    fetchCard(cardId)
  }, [])

  const fetchCard = async (id) => {
    try {
      const response = await getFlashcard(id)
      setQuestion(response.question)
      setAnswer(response.answer)
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (e) => {
    const { value } = e.target
    setUserAnswer(value)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const accuracy = checkSimilarity(answer, userAnswer).toFixed(0)
      setAccuracy(accuracy)
      setIsAnswered(true)
      setShowAnswerModal(true)
      showScore(accuracy)
    } catch (error) {
      console.log(error)
    }
  }

  const closeHandler = () => {
    setShowAnswerModal(!showAnswerModal)
  }

  const updatePoints = async () => {
    try {
      if (accuracy > 85) {
        const response = await updateUserPoints(cardId, {
          points: accuracy,
        })
        console.log(response)
      }

      closeHandler()
    } catch (error) {
      console.log(error)
    }
  }
  const showScore = (accuracy) => {
    isAnswered && (
      <Modal show={showAnswerModal} onHide={closeHandler}>
        <Modal.Body>Score: {accuracy.toFixed(2)}%</Modal.Body>
        <Button onClick={updatePoints}>Continue</Button>
      </Modal>
    )
  }
  return (
    <div>
      <div>{question}</div>
      <div>{answer}</div>
      <div>
        <Form>
          <Form.Group>
            <Form.Label>Your Answer</Form.Label>
            <Form.Control
              type="text"
              className="form-group"
              onChange={handleChange}
              value={userAnswer}
              name="userAnswer"
            ></Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Check Answer
          </Button>
          <Button variant="primary" type="submit">
            Next
          </Button>
        </Form>
        {isAnswered && (
          <Modal show={showAnswerModal} onHide={closeHandler}>
            <Modal.Body>Score: {accuracy}%</Modal.Body>
            <Button onClick={updatePoints}>Continue</Button>
          </Modal>
        )}
      </div>
    </div>
  )
}

export default Card
