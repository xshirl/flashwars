import api from "./apiConfig"

// CATEGORIES

export const getCategories = async () => {
  try {
    const response = await api.get("/categories")
    return response.data
  } catch (error) {
    throw error
  }
}

export const getDecksByCategory = async (id) => {
  try {
    const response = await api.get(`/categories/${id}`)
    return response.data
  } catch (error) {
    throw error
  }
}

export const getUserDecks = async () => {
  try {
    const response = await api.get(`/profile/decks`)
    return response.data
  } catch (error) {
    throw error
  }
}
export const createFlashcard = async (id, payload) => {
  try {
    const response = await api.post(`/decks/${id}`, payload)
    return response.data
  } catch (error) {
    throw error
  }
}

export const editFlashcard = async (deckId, cardId, payload) => {
  try {
    const response = await api.put(`/decks/${deckId}/${cardId}`, payload)
    return response.data
  } catch (error) {
    throw error
  }
}

export const deleteFlashcard = async (deckId, cardId) => {
  try {
    const response = await api.delete(`/decks/${deckId}/${cardId}`)
  } catch (error) {
    throw error
  }
}

export const createDeck = async (payload) => {
  try {
    const response = await api.post("/decks", payload)
    return response.data
  } catch (error) {
    throw error
  }
}

export const deleteDeck = async (id) => {
  try {
    const response = await api.delete(`/decks/${id}`)
  } catch (error) {
    throw error
  }
}

export const getLeaderboard = async () => {
  try {
    const response = await api.get("/leaderboard")
    return response.data
  } catch (error) {
    throw error
  }
}
