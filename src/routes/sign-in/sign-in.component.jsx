import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

function SighIn() {
  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGooleUser}>Sign in with google popup</button>
    </div>
  );
};


async function logGooleUser() {
  const { user } = await signInWithGooglePopup();
  const userDocRef = createUserDocumentFromAuth(user);
}

export default SighIn;