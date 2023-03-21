import {FormInputLabel,Input,Group} from'./form-input.styles.jsx';

const FormInput = ({label, ...otherProps}) => {

    return(
        <Group>
            <Input {...otherProps}></Input> 
            {/* its before the label so the css can take effect */}
            {label &&( // if label exists then rendor this label
                 <FormInputLabel shrink={ otherProps.value.length} >
                    {label}
                </FormInputLabel>
            )}
            
        </Group>
    );

};

export default FormInput;