import React from 'react'
import { ParentCategory as Root } from './BudgetCategoryList.css';

const ParentCategory = ({ name }) => {
  return (
    <Root>
      {name}
    </Root>
  )
}

export default ParentCategory
