const bcrypt = require("bcrypt")
const db = require("../db")
const User = require("../backend/models/user")
const Flashcard = require("../backend/models/flashcard")
const Deck = require("../backend/models/deck")
const Category = require("../backend/models/category")

db.on("error", console.error.bind(console, "MongoDB connection error:"))
const SALT_ROUNDS = 11

const createSeedData = async () => {
  await User.deleteMany()
  await Category.deleteMany()
  await Deck.deleteMany()
  await Flashcard.deleteMany()

  const users = [
    {
      username: "xshirl",
      name: "Shirley",
      password_digest: bcrypt.hashSync("123456", SALT_ROUNDS),
      decks: [
        // seededDecks[0]["_id"],
        // seededDecks[1]["_id"],
        // seededDecks[2]["_id"],
        // seededDecks[3]["_id"],
        // seededDecks[4]["_id"],
      ],
    },
    {
      username: "rende",
      name: "Ender",
      password_digest: bcrypt.hashSync("123456", SALT_ROUNDS),
      decks: [
        // seededDecks[5]["_id"],
        // seededDecks[6]["_id"],
        // seededDecks[7]["_id"],
      ],
    },
    {
      username: "harrypotter",
      name: "Harry Potter",
      password_digest: bcrypt.hashSync("123456", SALT_ROUNDS),
      decks: [],
    },
    {
      username: "frodo",
      name: "Frodo",
      password_digest: bcrypt.hashSync("123456", SALT_ROUNDS),
      decks: [],
    },
    {
      username: "neo",
      name: "Thomas",
      password_digest: bcrypt.hashSync("123456", SALT_ROUNDS),
      decks: [],
    },
    {
      username: "spike",
      name: "Spike",
      password_digest: bcrypt.hashSync("123456", SALT_ROUNDS),
      decks: [],
    },
  ]

  const seededUsers = await User.insertMany(users)
  console.log("Successfully created users!")
  const categories = [
    {
      name: "Biology",
      decks: [
        // seededDecks[0]["_id"],
        // seededDecks[1]["_id"],
        // seededDecks[2]["_id"],
        // seededDecks[3]["_id"],
        // seededDecks[4]["_id"],
      ],
    },
    {
      name: "Computer Science",
      decks: [
        // seededDecks[5]["_id"],
        // seededDecks[6]["_id"],
        // seededDecks[7]["_id"],
      ],
    },
    {
      name: "Chemistry",
      decks: [],
    },
    { name: "Math", decks: [] },
    { name: "Physics", decks: [] },
    { name: "Psychology", decks: [] },
    { name: "History", decks: [] },
  ]

  const seededCategories = await Category.insertMany(categories)
  console.log("Successfully created categories!")
  const decks = [
    {
      name: "Genetics",
      creator: seededUsers[0]["_id"],
      isPublic: true,
      category: seededCategories[0]["_id"],
      flashcards: [],
    },
    {
      name: "Physiology",
      creator: seededUsers[0]["_id"],
      isPublic: true,
      category: seededCategories[0]["_id"],
      flashcards: [],
    },
    {
      name: "Anatomy",
      creator: seededUsers[0]["_id"],
      isPublic: true,
      category: seededCategories[0]["_id"],
      flashcards: [],
    },
    {
      name: "Molecular Biology",
      creator: seededUsers[0]["_id"],
      isPublic: true,
      category: seededCategories[0]["_id"],
      flashcards: [],
    },
    {
      name: "Neuroscience",
      creator: seededUsers[0]["_id"],
      isPublic: true,
      category: seededCategories[0]["_id"],
      flashcards: [],
    },
    {
      name: "Data Structures and Algorithms",
      creator: seededUsers[1]["_id"],
      isPublic: true,
      category: seededCategories[1]["_id"],
      flashcards: [],
    },
    {
      name: "Machine Learning",
      creator: seededUsers[1]["_id"],
      isPublic: true,
      category: seededCategories[1]["_id"],
      flashcards: [],
    },
    {
      name: "Artificial Intelligence",
      creator: seededUsers[1]["_id"],
      isPublic: true,
      category: seededCategories[1]["_id"],
      flashcards: [],
    },
  ]

  const seededDecks = await Deck.insertMany(decks)
  seededUsers[0].decks.push(seededDecks[0]["_id"])
  seededUsers[0].decks.push(seededDecks[1]["_id"])
  seededUsers[0].decks.push(seededDecks[2]["_id"])
  seededUsers[0].decks.push(seededDecks[3]["_id"])
  seededUsers[0].decks.push(seededDecks[4]["_id"])
  seededUsers[1].decks.push(seededDecks[5]["_id"])
  seededUsers[1].decks.push(seededDecks[6]["_id"])
  seededUsers[1].decks.push(seededDecks[7]["_id"])
  seededCategories[0].decks.push(seededDecks[0]["_id"])
  seededCategories[0].decks.push(seededDecks[1]["_id"])
  seededCategories[0].decks.push(seededDecks[2]["_id"])
  seededCategories[0].decks.push(seededDecks[3]["_id"])
  seededCategories[0].decks.push(seededDecks[4]["_id"])
  seededCategories[1].decks.push(seededDecks[5]["_id"])
  seededCategories[1].decks.push(seededDecks[6]["_id"])
  seededCategories[1].decks.push(seededDecks[7]["_id"])
  console.log("Successfully created decks!")
  const flashcards = [
    {
      question: "What are the phases of mitosis?",
      answer: "Prophase, prometaphase, metaphase, anaphase, telophase",
      difficulty: 2,
      creator: seededUsers[0]["_id"],
      deck: seededDecks[0]["_id"],
    },
  ]

  const seededFlashcards = await Flashcard.insertMany(flashcards)
  console.log(seededFlashcards)
  seededDecks[0].flashcards.push(seedFlashcards[0]["_id"])
}

const run = async () => {
  try {
    await createSeedData()
    console.log("created seed")
    db.close()
  } catch (error) {
    console.log(error)
  }
}

run()
