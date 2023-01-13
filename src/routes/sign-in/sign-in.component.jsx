import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';

import{
    auth,
    signInWithGooglePopup,
    createUserDocumentFromAuth,
    signInWithGoogleRedirect
    } from '../../utils/firebase/firebase.utils';
import { async } from '@firebase/util';

import SignUpForm from '../../components/sign-up-form/sign-up-form.component';


const SignIn = () => {

    useEffect(() => {
        // wrap your async call here
        const getRedirectResults = async () => {
            const response = await getRedirectResult(auth);
            if(response) {
                const userDocRef = await createUserDocumentFromAuth(user);

            }
          
        };
    
        // then call it here
        getRedirectResults();
      }, []);// the ,[] lets the use effect know we need to run it once when mounting
    
    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    };




    return (
        <div> 
            <h1>Sign in page</h1>
            <button onClick={logGoogleUser}>Sign in with google popup</button>
            <button onClick={signInWithGoogleRedirect}>Sign in with google redirect</button>
            <SignUpForm></SignUpForm>
        </div> // there is an issue here
            //when it redirects the app remounts and all states are lost since we went away from the url
            //so we need a way to redirect while still being on our app so we use useEffect that is imported.

    );

};

export default SignIn;