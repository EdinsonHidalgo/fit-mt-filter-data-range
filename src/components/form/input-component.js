import React, {useEffect} from 'react'

const InputComponent = ({ value, changeValue, valid, toValidate, divCN, labelCN, labelText, inputID, inputType, required, maxDate, smallID, smallText}) => {
    const inputClassName = {
        form: "form-control",
        formValid: "form-control is-valid",
        formInvalid: "form-control is-invalid"
    }

    const smallClassName = {
        form: "form-text text-mute",
        formValid: "form-text text-success",
        formInvalid: "form-text text-danger"
    }

    const onChange = (e) => {
        let inputValue = e.target.value;
        changeValue((prevState ) => {
            return {...prevState, value: inputValue }
        });
    }

    useEffect(() => { 
        toValidate(); 
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return (
        <div className={divCN}>
            <label className={labelCN} htmlFor={inputID}><b>{labelText}</b></label>
            <input type={inputType} id={inputID} aria-describedby={smallID}
                className={valid === null ? inputClassName.form : valid ? inputClassName.formValid : inputClassName.formInvalid}
                required={required} value={value} onChange={onChange} max={maxDate} />
            <small className={valid === null ? smallClassName.form : valid ? smallClassName.formValid : smallClassName.formInvalid}
                id={smallID}> {smallText} </small>
        </div>
    )
}

export default InputComponent
