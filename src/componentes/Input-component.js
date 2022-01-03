import React from 'react'
/**
 * Este componente retorna una seccion que contiene los elementos necesarios para modelar un 'input'.
 * @param {props} props Distintas variables que representan las propiedades usadas en los elemententos necesarios para la 
 * seccion del campo.
 * @returns {html} Fragmento de codigo Html que representa al componente.
 */
const InputComponent = ({ value, changeValue, valid, divCN, labelCN, labelText, inputID, inputType, required, minDate, maxDate, smallID, smallText}) => {
    /**
     * Esta constante almacena las posibles opciones que permiten dar un control dinamico de la propiedad 'className' del 
     * elemento 'input'.
     */
    const inputClassName = {
        form: "form-control",
        formValid: "form-control is-valid",
        formInvalid: "form-control is-invalid"
    }
    /**
     * Esta constante almacena las posibles opciones que permiten dar un control dinamico de la propiedad 'className' del 
     * elemento 'small'.
     */
    const smallClassName = {
        form: "form-text text-mute",
        formValid: "form-text text-success",
        formInvalid: "form-text text-danger"
    }
    /**
     * Esta funcion permite almacenar el valor seleccionado o digitado en el 'input'.
     */
    const onChange = (e) => {
        let inputValue = e.target.value;
        changeValue((prevState ) => {
            return {...prevState, value: inputValue }
        });
    }

    return (
        <div className={divCN}>
            <label className={labelCN} htmlFor={inputID}><b>{labelText}</b></label>
            <input type={inputType} id={inputID} aria-describedby={smallID} max={maxDate} min={minDate}
                className={valid === null ? inputClassName.form : valid ? inputClassName.formValid : inputClassName.formInvalid}
                required={required} value={value} onChange={onChange} />
            <small className={valid === null ? smallClassName.form : valid ? smallClassName.formValid : smallClassName.formInvalid}
                id={smallID}> {smallText} </small>
        </div>
    )
}

export default InputComponent
