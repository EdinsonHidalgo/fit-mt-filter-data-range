import React from 'react'

const InputComponent = (props) => {
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
        let v = null;

        if (inputValue !== '') {
            console.log("Entro al if de onChange");
            v = props.toValidate(inputValue);
        }
        console.log("valid: " + v);
        props.changeValue({ value: inputValue, valid: v });
    }

    return (
        <div className={props.divCN}>
            <label className={props.labelCN} htmlFor={props.inputID}><b>{props.labelText}</b></label>
            <input type={props.inputType} id={props.inputID} aria-describedby={props.smallID}
                className={props.valid === null ? inputClassName.form : props.valid ? inputClassName.formValid : inputClassName.formInvalid}
                required={props.required} value={props.value} onChange={onChange} max={props.maxDate} />
            <small className={props.valid === null ? smallClassName.form : props.valid ? smallClassName.formValid : smallClassName.formInvalid}
                id={props.smallID}> {props.smallText} </small>
        </div>
    )
}

export default InputComponent
