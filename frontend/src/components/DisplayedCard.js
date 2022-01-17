import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Form, Modal, Button } from "react-bootstrap"
import { updateUserPoints } from "../api/apiCalls"
import { getFlashcard } from "../api/apiCalls"
import checkSimilarity from "../utils/checkStringSimilarity"
const DisplayedCard = ({
  question,
  answer,
  incrementIndex,
  decrementIndex,
}) => {
  const [isAnswered, setIsAnswered] = useState(false)
  const [userAnswer, setUserAnswer] = useState()
  const [accuracy, setAccuracy] = useState()
  const [showAnswerModal, setShowAnswerModal] = useState(false)
  const { cardId } = useParams()
  const [showAnswer, setShowAnswer] = useState(false)

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
    <div className="display">
      <div className="cardDisplay">
        <button className="arrowIcon" onClick={decrementIndex}>
          <i className=" fa fa-arrow-left fa-3x"></i>
        </button>
        <div className="displayQuestion">
          {!showAnswer && question}
          {showAnswer && answer}
        </div>

        <button className="arrowIcon" onClick={incrementIndex}>
          <i className=" fa fa-arrow-right fa-3x"></i>
        </button>
      </div>

      <div className="userAnswerForm">
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
          <Button
            variant="primary"
            className="submitButton"
            type="submit"
            onClick={handleSubmit}
          >
            Check Answer
          </Button>
          <Button
            variant="primary"
            className="submitButton"
            onClick={() => setShowAnswer(!showAnswer)}
          >
            {showAnswer ? "Hide Answer" : "Show Answer"}
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

export default DisplayedCard
