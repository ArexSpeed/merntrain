import { useMemo } from 'react'
import { connect } from 'react-redux';
import { groupBy } from 'lodash';
import ToggleableList from 'components/ToggableList.js';
import ParentCategory from './ParentCategory';
import CategoryItem from './CategoryItem';

const BudgetCategoryList = ({ budgetedCategories, allCategories }) => {
  const budgetedCategoriesByParent = useMemo(
    () => groupBy(
      budgetedCategories,
      item => allCategories.find(category => category.id === item.categoryId).parentCategory.name
    ),
    [budgetedCategories, allCategories]
  );
    console.log(budgetedCategoriesByParent, 'group')

    const listItems = Object.entries(budgetedCategoriesByParent).map(([parentName, categories]) => ({
      id: parentName,
      Trigger: ({ onClick }) => (
        <ParentCategory
          name={parentName}
          onClick={onClick}
        />
      ),  
      children: categories.map(budgetedCategory => {
        const { name } = allCategories.find(category => category.id === budgetedCategory.categoryId)
        return(
          <CategoryItem
            key={budgetedCategory.id}
            name={name}
          />
        )
      })
    }))
  return (
    <div>
      <ToggleableList
        items={listItems}
      />
    </div>
  )
}

export default connect(state => ({
  budgetedCategories: state.budget.budgetedCategories,
  allCategories: state.common.allCategories
}))(BudgetCategoryList)
