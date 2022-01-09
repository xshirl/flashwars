import React, { useState } from "react"
import { Redirect } from "react-router"
import { signin } from "../api/apiUsers"

const LoginForm = () => {
  const [form, setForm] = useState({})
  const [loggedIn, setLoggedIn] = useState(false)
  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await signin({
        username: form.username,
        password: form.password,
      })
      console.log(response)
      setForm({})
      setLoggedIn(true)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    loggedIn ? <Redirect to="/profile" /> : 
    <form onSubmit={handleSubmit}>
      <label>Username </label>
      <input
        name="username"
        type="text"
        value={form.username}
        onChange={handleChange}
      />
      <label>Password</label>
      <input
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  )
}

export default LoginForm
