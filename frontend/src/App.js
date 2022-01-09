import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

import Home from "./components/Home"
import LoginForm from "./components/LoginForm"
import RegisterForm from "./components/RegisterForm"
import Profile from "./components/Profile"
import CategoryList from "./components/CategoryList"
import DeckList from "./components/DeckList"
import Leaderboard from "./components/Leaderboard"
import "./App.css"

function App() {
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
        </Switch>
      </div>
    </Router>
  )
}

export default App
