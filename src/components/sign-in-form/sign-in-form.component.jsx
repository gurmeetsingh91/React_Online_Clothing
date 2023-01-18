import { async } from "@firebase/util";
import { useState } from "react";
import { 
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth,
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword
     } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
const defaultFormFields = {
   
    email:'',
    password:'',
   
}
import './sign-in-form.styles.scss';
import Button from '../button/button.component.jsx';

const SignInForm = () => {

    const[formFields,setFormFields] = useState(defaultFormFields);
    const {email,password,confirmPassword} = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            const response =  await signInAuthUserWithEmailAndPassword(
                email,
                password)
            resetFormFields();
        }catch(error){
            switch(error.code){
                case 'auth/wrong-password':
                    alert('incorrect password for email');
                    break;// dont check the subsequent cases
                case 'auth/user-not-found':
                    alert('incorrect email');
                    break;

            }
            console.log(error);
        };
    };
    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    };

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields,[name]: value}); //the ... operate is the same as this.formfield.display 
        // name and this.formfield.email and so on


    };


    return (
        <div className="sign-up-container">
            <h2>Already Have an Account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                
                <FormInput
                    label="Email"
                    type='email' 
                    required 
                    onChange={handleChange} 
                    name="email" 
                    value={email}>

                </FormInput>
                
             
                <FormInput
                    label="Password"
                    type='password' 
                    required 
                    onChange={handleChange} 
                    name="password" 
                    value={password}>
                </FormInput>
                
                <div className="buttons-container">
                    <Button type='submit'>Sign in </Button>
                    <Button type='button' buttonType= 'google' onClick={logGoogleUser}>Google Sign in</Button>
                </div>
            </form>
        </div>

    );
}

export default SignInForm;