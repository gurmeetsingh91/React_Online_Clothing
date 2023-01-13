import { async } from "@firebase/util";
import { useState } from "react";
import { createAuthUserWithEmailAndPassword,createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
    displayName:'',
    email:'',
    password:'',
    confirmPassword:''
}

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
        <div>
            <h1>Sign up with your email and password</h1>
            <form onSubmit={handleSubmit}>
                <label>Display Name</label>
                <input type='text' required onChange={handleChange} name="displayName" value={displayName}></input>

                <label>Email</label>
                <input type='text' required onChange={handleChange} name="email" value={email}></input>
                
                <label>Password</label>
                <input type='text' required onChange={handleChange} name="password" value={password}></input>
                
                <label>Confirm Password</label>
                <input type='text' required onChange={handleChange} name="confirmPassword" value={confirmPassword}></input>

                <button type='submit'>Sign Up </button>

            </form>
        </div>

    );
}

export default SignUpForm;