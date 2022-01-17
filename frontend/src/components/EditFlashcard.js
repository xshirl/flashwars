import React, { useEffect, useStates } from "react"
import { useParams } from "react-router-dom"
import { editFlashcard } from "../api/apiCalls"

const EditFlashcard = async ({ flashcard }) => {
  const [flashcard, setFlashcard] = useState(flashcard)
  const { cardId } = useParams()
  const handleChange = (e) => {
    const { name, value } = e.target
    setFlashcard((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await editFlashcard(cardId, flashcard)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Question</label>
      <textarea
        onChange={handleChange}
        name="question"
        value={flashcard.question}
      />
      <label>Answer</label>
      <textarea
        onChange={handleChange}
        name="answer"
        value={flashcard.answer}
      />
      <label>Difficulty (5 is most)</label>
      <select
        value={flashcard.difficulty}
        onChange={handleChange}
        name="difficulty"
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
    </form>
  )
}

export default EditFlashcard
