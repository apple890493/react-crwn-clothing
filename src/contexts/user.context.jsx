import { createContext, useState, useEffect } from 'react';
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
  //這邊需要儲存一個defalut值;
  currentUser: null,
  setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      console.log(user)
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
*/