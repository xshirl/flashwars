import React, { useState, useEffect } from "react"
import styled from "styled-components"

import { getCategories } from "../api/apiCalls"
import Category from "./Category"
import LoggedNav from "./LoggedNav"

const Header = styled.div`
  text-align: center;
  font-size: 30px;
  padding: 20px;
  text-transform: uppercase;
  font-weight: 700;
`
const CategorySection = styled.div`
  display: flex;
  flex-wrap: wrap;
`
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
      <LoggedNav />
      <Header> Categories</Header>
      <CategorySection>
        {categories.map((category) => (
          <Category key={category._id} {...category} />
        ))}
      </CategorySection>
    </div>
  )
}

export default CategoryList
