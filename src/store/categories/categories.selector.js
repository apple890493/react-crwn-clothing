import { createSelector } from 'reselect'; //to memorize data and skip useless calculate

const selectCategoryReducer = (state) => {
  console.log('selector 1 fired');
  return state.categories;
};

export const selectCategories = createSelector(
  [selectCategoryReducer], //input selector
  categoriesSlice => {
    console.log('selector 2 fired');
    return categoriesSlice.categories //output selector
  }
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (state) => {
    console.log('selector 3 fired');
    return state.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {})
  });