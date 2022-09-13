import { CATEGORIES_ACTION_TYPE } from "./categories.types";

const CATEGORIES_INITAL_STATE = { categories: [] };

export const categoriesReducer = (state = CATEGORIES_INITAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case CATEGORIES_ACTION_TYPE.SET_CATEGORIES:
      return {
        ...state,
        categories: payload
      }
    default:
      return state;
  }
};