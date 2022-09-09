import { createContext, useState, useEffect, useReducer } from 'react';
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";
import { createAction } from "../utils/reducer/reducer.utils";

// context still need it, caz vlaue that we expose
export const UserContext = createContext({
  //這邊需要儲存一個defalut值;
  currentUser: null,
  setCurrentUser: () => null,
});

export const USER_ACTION_TYPE = {
  SET_CURRENT_USER: 'SET_CURRENT_USER'
};

const userReducer = (state, action) => {
  // console.log('state', state, 'action', action)
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPE.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload
      }
    default:
      throw new Error(`error in type ${type} in userReducer`)
  }
}

const INITAL_STATE = { currentUser: {} };

export const UserProvider = ({ children }) => {
  //const [currentUser, setCurrentUser] = useState(null);
  const [{ currentUser }, dispatch] = useReducer(userReducer, INITAL_STATE);
  // console.log('currentUser', currentUser)
  const setCurrentUser = (user) => {
    dispatch(
      createAction(USER_ACTION_TYPE.SET_CURRENT_USER, user)
      //createAction instead of origin  {
      //   type: USER_ACTION_TYPE.SET_CURRENT_USER,
      //   payload: user
      // }
    )
  };

  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      // console.log(user)
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []); //only wokr once on init
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
};

/*
範例利用 context feature 將 App 包在context 的 component 都能取用資訊這個 context 裡的資訊，在其他component也能操儲存的值
  <UserContext.Provider>
    <App />
  </UserContext.Provider>

  ** Provider用來改變value；useContext用來傳遞value
*/

/*
範例利用 Reducer
  const userReducer = (state, action) => {
    //根據stata, action 來返回對象
    return {
      currentUser:
    }
  }
*/

/*
兩者不同的地方在於
useState()是整個變化
useReducer是根據狀態與動作變化
*/