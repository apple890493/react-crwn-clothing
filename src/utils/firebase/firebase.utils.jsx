// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  getDocs,
  query,
} from "firebase/firestore";

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

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  'prompt': 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInfo = {}) => {
  if (!userAuth) return;
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
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfo
      });
    } catch (err) {
      console.log('error creating the user', err.message);
    }
  }
  return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);

// 這邊通常不需要前端來建制，但目前沒有後端資料所以之前有使用init一次，之後就不需要使用了
export const addCollectionAndDocuments = async (
  collectionKey,
  objectToAdd
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    console.log('docRef', docRef)
    batch.set(docRef, object)
  })

  console.log('batch', batch);
  await batch.commit();

  console.log('done')
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => doc.data());
  // const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
  //   const { title, items } = docSnapshot.data();
  //   acc[title.toLowerCase()] = items;
  //   return acc;

  //   /*
  //     created the object like the blower:
  //     {
  //       hats: {
  //         title: 'Hats',
  //         items: [
  //           {},
  //           {}
  //         ]
  //       },
  //       shoes: {
  //         title: 'Shoes',
  //         items: [
  //           {},
  //           {}
  //         ]
  //       }
  //       ...etc
  //     }

  //   */
  // }, {});
  // return categoryMap;
};