import { createSelector } from "reselect";

const selectCategoryReducer = (state) => state.categories;
export const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categoreisSlice) => categoreisSlice.isLoading
);

export const selectCategoriesMap = (state) => state.categories.categoriesMap;
