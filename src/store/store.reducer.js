import { compose, createStore, applyMiddleware } from "redux";
//import logger from "redux-logger"; // it is allows use to see what the state and action looks like before

import { rootReducer } from "./root.reducer";

const loggerMiddleware = (store) => (next) => (action) => {
  if (!action.type) {
    return next(action);
  }

  console.log('type', action.type);
  console.log('payload', action.payload);
  console.log('currState', store.getState());

  next(action);
  console.log('next state', store.getState())

}
/*
createStore - 實際創建一個redux store

applyMiddleware - 將多個的中介整合成一個store enhancer
middleWare - 當我們要去操作一個reducer之前會先經過它

compose - 整合多個store enhancer 成一個單一store enhancer

*/

const middleWares = [loggerMiddleware];

const composeEnhancers = compose(applyMiddleware(...middleWares));


export const store = createStore(rootReducer, undefined, composeEnhancers);