import './sign-in-form.styles.scss';

import { useState } from 'react';

import {
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from '../../utils/firebase/firebase.utils';
import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component';

const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);

    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async() => {
		await signInWithGooglePopup();
	}

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // eslint-disable-next-line
			const { user } = await signInAuthUserWithEmailAndPassword(email, password);

           	resetFormFields();
        } catch(error) {
            if(error.code === 'auth/invalid-credential') {
                alert('incorrect password or email');
            }
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({
            ...formFields,
            [name]: value
        });
    }

    return (
        <div className='sign-up-container'>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>

            <form onSubmit={handleSubmit}>
                <FormInput
                    label='Email'
                    type='email'
                    name='email'
                    value={email}
                    onChange={handleChange}
                    required />

                <FormInput
                    label='Password'
                    type='password'
                    name='password'
                    autoComplete='new-password'
                    value={password}
                    onChange={handleChange}
                    required />

                <div className='buttons-container'>
                    <Button type='submit'>
                        Sign In
                    </Button>
                    <Button
                        type='button'
                        buttonType='google'
                        onClick={signInWithGoogle}>
                        Google sign in
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default SignInForm;
