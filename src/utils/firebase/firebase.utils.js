import {initializeApp} from 'firebase/app';
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword

} from 'firebase/auth'

import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCnDLa6XEuqxRYw3Xa0J3wV6g89RScBflo",
    authDomain: "crown-clothing-react-app-3d85d.firebaseapp.com",
    projectId: "crown-clothing-react-app-3d85d",
    storageBucket: "crown-clothing-react-app-3d85d.appspot.com",
    messagingSenderId: "94547974923",
    appId: "1:94547974923:web:c91ef2c9af45e3f830e00e"
};

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters(
    {
        prompt: "select_account"
    }
);

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth,googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth,googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth,additionalInformation={}) => {
    if(!userAuth){
        return;
    }
    const userDocRef = doc(db, 'users', userAuth.uid );

    const userSnapshot = await getDoc(userDocRef);

    //if user data does not exist i want to create andset the data using that snapshot
    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });

        } catch (error) {
            console.log('error creating the user', error.message);

        }
    }

    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async(email, password) => {

     if(!email || !password) return;

    return createUserWithEmailAndPassword(auth,email, password);


};

export const signInAuthUserWithEmailAndPassword = async(email, password) => {

    if(!email || !password) return;

   return signInWithEmailAndPassword(auth,email, password);


};