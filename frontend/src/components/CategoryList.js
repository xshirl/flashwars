import React, { useState, useEffect } from "react"
import { getCategories } from "../api/apiCalls"
import Category from "./Category"

const CategoryList = () => {
  const [categories, setCategories] = useState([])
  useEffect(async () => {
    await fetchCategories()
  }, [])

  const fetchCategories = async () => {
    const response = await getCategories()
    console.log(response)
    setCategories((prevState) => [...prevState, ...response])
  }
  return (
    <div>
      {categories.map((category) => (
        <Category key={category._id} {...category} />
      ))}
    </div>
  )
}

export default CategoryList
