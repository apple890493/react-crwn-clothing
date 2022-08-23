import { useState } from "react";
import { signInWithGooglePopup, createUserDocumentFromAuth, signInWithGoogleRedirect, auth, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";

/* sample for signInWithGoogleRedirect
import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";
*/

import './sign-in-form.styles.scss';
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";

const defaultFormFields = {
  email: '',
  password: ''
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  };
  /* sample for signInWithGoogleRedirect
  useEffect(() => {
    async function fetchData() {
      const resp = await getRedirectResult(auth);
      if (resp) {
        const userDocRef = createUserDocumentFromAuth(resp.user);
      }
    }
    fetchData();
  }, []); //empty array means work on first init
  */

  const resetForms = () => {
    setFormFields(defaultFormFields);
  };

  const hadleSubmit = async ($event) => {
    $event.preventDefault();

    try {
      const resp = await signInAuthUserWithEmailAndPassword(email, password);
      console.log(resp);
      resetForms();
    } catch (error) {
      switch (error.code) {
        case 'auth/user-not-found':
          alert('user-not-found');
          break;
        case 'auth/wrong-password':
          alert('wrong-password')
          break;
        default:
          console.log('error issue:', error.code)
          alert('oops! something wrong!')
      }
    }
  }

  const handleChange = ($event) => {
    const { name, value } = $event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={hadleSubmit}>
        <FormInput
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          required />

        <FormInput
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          required />

        <div className="buttons-container">
          <Button type="submit" buttonTitle="SIGN IN" />
          <Button type="button" onClick={signInWithGoogle} buttonTitle="Google" buttonType="google" />

          {/* sample for signInWithGoogleRedirect 
          <button onClick={signInWithGoogleRedirect}>Sign in with google redirect</button> 
        */}
        </div>
      </form>
    </div>
  )
};

export default SignInForm;