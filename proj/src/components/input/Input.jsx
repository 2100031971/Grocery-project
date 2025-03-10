import React from 'react'
import InputContainer from '../InputContainer/InputContainer';
import './input.css'
function Input(
    { label, type,defaultValue,onChange,onBlur,name,error},
    ref
) {
    const getErrorMessage=()=>{
        if(!error) return;
        if(error.message) return error.message;

        switch(error.type){
            case 'required':
                return 'This Field is Required';
            case 'minLength':
                return 'Field is too short';
            default:
                return '*';
        }
    }

  return (
    <InputContainer label={label}>
        <input
        defaultValue={defaultValue}
        className='input'
        type={type}
        placeholder={label}
        ref={ref}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        />
        {error && <div className='error'>{getErrorMessage()}</div>}
    </InputContainer>
  )
}

export default React.forwardRef(Input)