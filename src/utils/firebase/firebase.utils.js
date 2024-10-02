import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
} from 'firebase/auth';
import {
  doc,
  getDoc,
  getFirestore,
  setDoc,
} from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyBVRc_k_pWysVpRgBEnePTKt4uBtreZxkA',
	authDomain: 'crwn-clothing-db-d10a3.firebaseapp.com',
	projectId: 'crwn-clothing-db-d10a3',
	storageBucket: 'crwn-clothing-db-d10a3.appspot.com',
	messagingSenderId: '467814483762',
	appId: '1:467814483762:web:fd6a903f438d335c09392b'
};

// eslint-disable-next-line
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
	prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
	if(!userAuth) {
		return;
	}

	const userDocRef = doc(db, 'users', userAuth.uid);

	console.log(userDocRef);

	const userSnapshot = await getDoc(userDocRef);

	console.log(userSnapshot);
	console.log(userSnapshot.exists());

	if(!userSnapshot.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
				...additionalInformation
			})
		} catch (error) {
			console.log('error creating the user', error.message);
		}
	}

	return userDocRef;
};


export const createAuthUserWithEmailAndPassword = async (email, password) => {
	if(!email || !password) {
		return;
	}

	return (
		await createUserWithEmailAndPassword(auth, email, password)
	);
}
