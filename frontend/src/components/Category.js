import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

const Category = ({ key, name, _id, decks }) => {
  return (
    <div className="category">
      <Link to={{ pathname: `/categories/${_id}`, state: { decks } }}>
        {name}
      </Link>
    </div>
  )
}

export default Category
