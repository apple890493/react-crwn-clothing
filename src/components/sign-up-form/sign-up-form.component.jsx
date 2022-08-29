import { useState, useContext } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import { UserContext } from "../../contexts/user.context";

import FormInput from '../form-input/form-input.component';
import Button from "../button/button.component";
import './sign-up-form.styles.scss';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
};

function SignUpForm() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  // const { setCurrentUser } = useContext(UserContext);
  const resetForms = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = ($event) => {
    const { name, value } = $event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const hadleSubmit = async ($event) => {
    $event.preventDefault();

    console.log(formFields);

    if (formFields.password !== formFields.confirmPassword) {
      alert('passwords do not match');
      return;
    }

    //外部資料取得會有失敗的可能性，所以使用try catch
    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password);

      // setCurrentUser(user);

      //displayName is null on user object, so can not directly use it.
      const userDocRef = await createUserDocumentFromAuth(user, { displayName });
      resetForms();
      if (userDocRef) {
        alert('Thanks for signing up!');
      }
    } catch (error) {
      alert('oops! something wrong!')
      console.log('error issue:', error.code)
    }
  };

  return (
    <div className="sign-up-container">
      <h2>I do not have a account</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={hadleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          onChange={handleChange}
          name="displayName"
          value={displayName}
          required />

        <FormInput
          label="Email"
          type="email"
          onChange={handleChange}
          name="email"
          value={email}
          required />

        <FormInput
          label="Password"
          type="password"
          onChange={handleChange}
          name="password"
          value={password}
          required />

        <FormInput
          label="Confirm Password"
          type="password"
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
          required />

        <Button type="submit" buttonTitle="Sign Up" />
      </form>
    </div>
  )
};

export default SignUpForm;