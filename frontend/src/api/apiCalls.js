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

export const getUserDecks = async (id) => {
  try {
    const response = await api.get(`/profile/${id}/decks`)
    return response.data
  } catch (error) {
    throw error
  }
}
export const createFlashcard = async (id, payload) => {
  try {
    const response = await api.post(`/cards/${id}`, payload)
    return response.data
  } catch (error) {
    throw error
  }
}

export const editFlashcard = async (cardId, payload) => {
  try {
    const response = await api.put(`/cards/${cardId}`, payload)
    return response.data
  } catch (error) {
    throw error
  }
}

export const deleteFlashcard = async (cardId) => {
  try {
    const response = await api.delete(`/cards/${cardId}`)
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

export const getFlashcards = async (deckId) => {
  try {
    const response = await api.get(`/decks/${deckId}`)
    return response.data
  } catch (error) {
    throw error
  }
}

export const updateUserPoints = async (cardId, payload) => {
  try {
    const response = await api.put(`/cards/${cardId}/updateUserPoints`, payload)
    return response.data
  } catch (error) {
    throw error
  }
}

export const getFlashcard = async (id) => {
  try {
    const response = await api.get(`/cards/${id}`)
    return response.data
  } catch (error) {
    throw error
  }
}
