import { modelNames } from "mongoose"
import React, { useState } from "react"
import { useParams, Link } from "react-router-dom"
import { Form, Modal, Button } from "react-bootstrap"
import { updateUserPoints } from "../api/apiCalls"
import LoggedNav from "./LoggedNav"

import checkSimilarity from "../utils/checkStringSimilarity"
const Flashcard = ({ deckId, _id, question, answer, difficulty }) => {
  const [isAnswered, setIsAnswered] = useState(false)
  const [response, setResponse] = useState()
  const [accuracy, setAccuracy] = useState()
  const [showAnswerModal, setShowAnswerModal] = useState(false)
  const [keepAnswer, setKeepAnswer] = useState(false)

  return (
    <div>
      <div>
        <Link
          to={{
            pathname: `/decks/${deckId}/${_id}`,
          }}
        >
          {question}{" "}
        </Link>
      </div>
    </div>
  )
}

export default Flashcard
