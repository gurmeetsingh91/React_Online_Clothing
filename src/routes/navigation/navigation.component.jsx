import {Outlet,Link} from 'react-router-dom';
import { Fragment,useContext } from 'react';
import { ReactComponent as CrownLogo } from '../../assets/crown.svg';
import  {NavigationContainer,NavLinks,NavLink,LogoContainer} from './navigation.styles.jsx';
import { UserContext } from '../../contexts/user.context';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { CartContext } from '../../contexts/cart.context';



const Navigation = () => {
    //we have a current user variable now that has the current user once they were signed in
    const {currentUser, setCurrentUser} = useContext(UserContext);
    const {isCartOpen} = useContext(CartContext);
  
    const signOutHandler =async () => {
        await signOutUser();
        setCurrentUser(null);
    }


    return (
    <Fragment> {/*this is if you dont want to supply a top level tag*/}
        <NavigationContainer>
           
            <LogoContainer to='/'>
                <CrownLogo className='logo'></CrownLogo>
            </LogoContainer>

            <NavLinks>
                <NavLink to='/shop'>
                    SHOP
                </NavLink>
                {/* when there is a current a user i want you to present a different link  */}
                {
                    currentUser ? (
                        <NavLink as='span' onClick={signOutHandler}>SIGN OUT</NavLink>
                    ) : // IF NO CURRENT USER
                    ( 
                        <NavLink to='/auth'>
                            Sign In
                        </NavLink>
                    )
                }
                <CartIcon></CartIcon>
               
            </NavLinks>
             {/* truthy value if both are true components are always true return the last thing  */}
                {isCartOpen && <CartDropdown></CartDropdown>}
        </NavigationContainer>
        <Outlet />
    </Fragment>
    
     );
    
    };

    export default Navigation;