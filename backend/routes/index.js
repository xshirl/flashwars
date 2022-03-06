const { Router } = require("express")
const router = Router()
const controller = require("../controllers")
const restrict = require("../helpers")

router.get("/", (req, res) => res.send("root"))

// users
router.post("/signup", (req, res) => controller.signUp(req, res))
router.post("/signin", (req, res) => controller.signIn(req, res))
router.get("/verifyuser", (req, res) => controller.verifyUser(req, res))
router.get("/profile", (req, res) => controller.userProfile(req, res))
router.get("/profile/:id", (req, res) => controller.publicProfile(req, res))

//categories -- public
router.get("/categories", (req, res) => controller.getCategories(req, res)) // gets all categories
router.get("/categories/:id", (req, res) =>
  controller.getDecksByCategory(req, res)
) // gets public decks by category
router.get("/categories/:id/:deckId", (req, res) =>
  controller.getDeck(req, res)
)

router.get("/decks/:deckId", (req, res) => controller.getDeck(req, res))

router.get("/allDecks", (req, res) => controller.getAllDecks(req, res))
//decks --private
router.get("/profile/:id/decks/", (req, res) => controller.getDecks(req, res)) //returns array of all decks
router.post("/decks", (req, res) => controller.createDeck(req, res)) //create new deck
router.get("/decks/:deckId", (req, res) => controller.getDeck(req, res)) //get user's deck's flaschards
router.delete("/decks/:id", (req, res) => controller.deleteDeck(req, res))
//delete deck

//flashcards
router.get("/cards", (req, res) => controller.getAllFlashcards(req, res))
router.post("/cards/:id", (req, res) => controller.createFlashcard(req, res))
router.get("/cards/:cardId", (req, res) => controller.getFlashcard(req, res))
router.put("/cards/:cardId", (req, res) => controller.editFlashcard(req, res))
router.delete("/cards/:cardId", (req, res) =>
  controller.deleteFlashcard(req, res)
)

router.put("/cards/:cardId/updateUserPoints", (req, res) => {
  controller.updateUserPoints(req, res)
}) //works

//leaderboard and ranks
router.get("/leaderboard", (req, res) => controller.getLeaderboard(req, res)) //works

module.exports = router
