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
import SignInForm from '../../components/sign-in-form/sign-in-form.component';
import './authentication.styles.scss';


const Authentication = () => {

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
    
  




    return (
        <div className='authentication-container'> 
            
            
            <SignInForm></SignInForm>
            <SignUpForm></SignUpForm>
      
            <div> 
                <button className='googleRedirect' onClick={signInWithGoogleRedirect}>Sign in with google redirect</button>
            </div>
        </div> // there is an issue here
            //when it redirects the app remounts and all states are lost since we went away from the url
            //so we need a way to redirect while still being on our app so we use useEffect that is imported.
           

    );

};

export default Authentication;