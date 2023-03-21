import {GoogleSignInButton,BaseButton,InvertedButton} from './button.styles.jsx';



// we know we have 3 different buttons with thier own styling so what we can do is 
//create some sort of variable

export const BUTTON_TYPE_CLASSES = {


    base:'base',
    google:'google-sign-in',
    inverted:'inverted'

};

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) => (
    {
        [BUTTON_TYPE_CLASSES.base]:BaseButton,
        [BUTTON_TYPE_CLASSES.google]:GoogleSignInButton,
        [BUTTON_TYPE_CLASSES.inverted]:InvertedButton

    }[buttonType]
)

const Button = ({ children, buttonType, ...otherProps }) =>
{

    const CustomButton = getButton(buttonType);

    return(
        <CustomButton {...otherProps} > {children} </CustomButton>
    );

};


export default Button;