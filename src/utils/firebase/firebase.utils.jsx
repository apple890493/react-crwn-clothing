// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVjCH1KdaxDCEI4Zj8iQIQ7NygdnJyeS8",
  authDomain: "react-crown-clothing-db.firebaseapp.com",
  projectId: "react-crown-clothing-db",
  storageBucket: "react-crown-clothing-db.appspot.com",
  messagingSenderId: "581740290868",
  appId: "1:581740290868:web:c2477fb4c8738d6f78bb61"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  'prompt': 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth) => {
  //doc(database, collection, uniqu identify)
  const userDocRef = doc(db, 'users', userAuth.uid);
  // console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef); //獲取文檔，特殊的object可以使用一些method來進行判斷 ex:exists()
  // console.log(userSnapshot);

  // TODO if user data does not exist { create / set the doc with data from userAuth} esle { return usrtDocRef}
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, { displayName, email, createdAt });
    } catch (err) {
      console.log('error creating the user', err.message);
    }
  }
  return userDocRef;
}