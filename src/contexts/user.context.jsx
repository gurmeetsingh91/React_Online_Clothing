import { createContext, useState,useEffect } from 'react'; 
import { onAuthStateChangedListener } from '../utils/firebase/firebase.utils';


// the actual value you want to accesss
export const UserContext = createContext({

    // empty state for the object 
    currentUser: null,

    // this is the basic function
    setCurrentUser: () => null,
    
});


// the actual component we recieve children this will wrap around any components that need access to the user value
export const  UserProvider = ({children}) => {
    // this will allow us to use the setter and have access to the value inside the wrapped components
    const [currentUser,setCurrentUser] = useState(null);
    const value =  {currentUser,setCurrentUser};
    
 

    useEffect(()=>{

       const unsubscribe = onAuthStateChangedListener ((user)=>{
        if(user){
            createUserDocumentFromAuth(user);
        }
        console.log('user ', user)
        setCurrentUser(user);

       });

       return unsubscribe
            
    },[]);

    return(<UserContext.Provider value={value}>{children}</UserContext.Provider>);

}
