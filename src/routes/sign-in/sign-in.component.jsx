import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import {
  createUserDocumentFromAuth,
  signInWithGooglePopup,
} from '../../utils/firebase/firebase.utils';

const SignIn = () => {
	const logGoogleUser = async() => {
		const { user } = await signInWithGooglePopup();

		// eslint-disable-next-line
		const userDocRef = await createUserDocumentFromAuth(user);
	}

	return (
		<div>
			<h1>Sign In Page</h1>
			<button onClick={logGoogleUser}>
				Sign In with Google Popup
			</button>

			<SignUpForm />
		</div>
	);
}

export default SignIn;