import './form-input.styles.scss';

const FormInput = ({label, ...otherProps}) => {

    return(
        <div className="group">
            <input className="form-input"{...otherProps}></input> 
            {/* its before the label so the css can take effect */}
            {label &&( // if label exists then rendor this label
                 <label 
                    className={`${
                    otherProps.value.length ? 'shrink' : '' // if values props is greater then 0 ? append shrink : otherwise dont do nothing 
                    }form-input-label`}>
                    {label}
                </label>
            )}
            
        </div>
    );

};

export default FormInput;