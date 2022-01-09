import React, { useState } from "react"

const SessionForm = ({ formType, processForm }) => {
  const [form, setForm] = useState({})

  const handleChange = ({ name, value }) => {
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    processForm(form)
  }

  const nameField = (
    <div>
      <label>Name </label>
      <input
        name="name"
        type="text"
        value={form.name}
        onChange={handleChange}
      />
    </div>
  )
  return (
    <form onSubmit={handleSubmit}>
      {formType == "SIGN UP" ? nameField : null}
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

export default SessionForm
