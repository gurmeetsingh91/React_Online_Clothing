import { async } from "@firebase/util";
import { useState } from "react";
import { createAuthUserWithEmailAndPassword,createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
const defaultFormFields = {
    displayName:'',
    email:'',
    password:'',
    confirmPassword:''
}
import './sign-up-form.styles.scss';
import Button from '../button/button.component.jsx';

const SignUpForm = () => {

    const[formFields,setFormFields] = useState(defaultFormFields);
    const {displayName, email,password,confirmPassword} = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(password != confirmPassword) {
            alert("passwords do not match");
            return;
        };
        try{
            const {user} = await createAuthUserWithEmailAndPassword(
                email,
                password
                );

            await createUserDocumentFromAuth(user,{displayName});

            resetFormFields();
            


        }catch(error){
            if(error.code == "auth/email-already-in-use"){
                alert("cannot create a user that already exists")
            };
            console.log(error);

        };
       
        //confirm if the password matches
        //check if we authenticated that user
        //create a user document
;
    };

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields,[name]: value}); //the ... operate is the same as this.formfield.display 
        // name and this.formfield.email and so on


    };


    return (
        <div className="sign-up-container">
            <h2>Dont Have an Account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                
                <FormInput
                    label="Display Name"
                    type='text'
                    required 
                    onChange={handleChange} 
                    name="displayName" 
                    value={displayName}>

                </FormInput>

               
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
                
                
                <FormInput
                    label ="Confirm Password"
                    type='password'
                    required
                    onChange={handleChange} 
                    name="confirmPassword" 
                    value={confirmPassword}>

                </FormInput>

                <Button type='submit'>Sign Up </Button>

            </form>
        </div>

    );
}

export default SignUpForm;