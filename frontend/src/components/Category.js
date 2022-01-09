import React from "react"
import { Link } from "react-router-dom"

const Category = ({ key, name, _id, decks }) => {
  return (
    <Link to={{ pathname: `/categories/${_id}`, state: { decks } }}>
      {name}
    </Link>
  )
}

export default Category
