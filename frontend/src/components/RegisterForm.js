import React, { useState } from "react"
import { signup } from "../api/apiUsers"

const RegisterForm = () => {
  const [form, setForm] = useState({})

  const handleChange = ({ name, value }) => {
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await signup({
        username: form.username,
        name: form.name,
        password: form.password,
      })
      console.log(response)
      setForm({})
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Name </label>
      <input
        name="name"
        type="text"
        value={form.name}
        onChange={handleChange}
      />
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
    </form>
  )
}

export default RegisterForm
