import './button.styles.scss';



// we know we have 3 different buttons with thier own styling so what we can do is 
//create some sort of variable

const BUTTON_TYPE_CLASSES ={

    google:'google-sign-in',
    inverted:'inverted'

};

const Button = ({ children, buttonType, ...otherProps }) =>
{
    return(
        <button className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
            {...otherProps} 
        >

            {children}

        </button>
    );

};


export default Button;