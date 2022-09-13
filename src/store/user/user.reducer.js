import { USER_ACTION_TYPE } from "./user.types";

const INITAL_STATE = { currentUser: {} };

export const userReducer = (state = INITAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPE.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload
      }
    default:
      // throw new Error(`error in type ${type} in userReducer`)
      return state;
  }
}
