import {Outlet,Link} from 'react-router-dom';
import { Fragment,useContext } from 'react';
import { ReactComponent as CrownLogo } from '../../assets/crown.svg';
import './navigation.styles.scss';
import { UserContext } from '../../contexts/user.context';
import { signOutUser } from '../../utils/firebase/firebase.utils';


const Navigation = () => {
    //we have a current user variable now that has the current user once they were signed in
    const {currentUser,setCurrentUser} = useContext(UserContext);
    const signOutHandler = async() => {
        const res = await signOutUser();
        setCurrentUser(null);

    }
    return (
    <Fragment> {/*this is if you dont want to supply a top level tag*/}
        <div className='navigation'>
           
            <Link className='logo-container' to='/'>
                <CrownLogo className='logo'></CrownLogo>
            </Link>

            <div className='nav-links-container'>
                <Link className='nav-link' to='/shop'>
                    SHOP
                </Link>
                {/* when there is a current a user i want you to present a different link  */}
                {
                    currentUser ? (
                        <span className='nav-link' onClick={signOutHandler}>SIGN OUT</span>
                    ) : // IF NO CURRENT USER
                    ( 
                        <Link className='nav-link' to='/auth'>
                            Sign In
                        </Link>
                    )
                }
               
            </div>

        </div>
        <Outlet />
    </Fragment>
    
     );
    
    };

    export default Navigation;