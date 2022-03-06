import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import io from "socket.io-client"

import Home from "./components/Home"
import LoginForm from "./components/LoginForm"
import RegisterForm from "./components/RegisterForm"
import Profile from "./components/Profile"
import CategoryList from "./components/CategoryList"
import DeckList from "./components/DeckList"
import Leaderboard from "./components/Leaderboard"
import AddFlashcard from "./components/AddFlashcard"
import FlashcardList from "./components/FlashcardList"
import Flashcard from "./components/Flashcard"
import Card from "./components/Card"
import Game from "./components/Game"

import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
function App() {
  const [socket, setSocket] = useState()
  useEffect(() => {
    const newSocket = io(`http://localhost:3000`)
    setSocket(newSocket)
    return () => newSocket.close()
  }, [setSocket])

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/signup" component={RegisterForm} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/categories" component={CategoryList} />
          <Route
            exact
            path={["/categories/:id", "/profile/:userId/decks"]}
            component={DeckList}
          />
          <Route exact path="/leaderboard" component={Leaderboard} />
          {/* <Route exact path="/decks/:id" component={AddFlashcard} /> */}
          <Route
            exact
            path={[
              "/categories/:categoryId/:deckId",
              "/profile/:userId/decks/:deckId",
              "/decks/:deckId",
            ]}
            component={FlashcardList}
          />
          <Route
            exact
            path={[
              "/categories/:categoryId/:deckId/:cardId",
              "/profile/:userId/decks/:deckId/:cardId",
              "/decks/:deckId/",
            ]}
            component={Flashcard}
          />
          <Route exact path="/decks/:deckId/:cardId" component={Card} />
          <Route
            exact
            path="/game"
            render={(props) => <Game {...props} socket={socket} />}
          />
        </Switch>
      </div>
    </Router>
  )
}

export default App
