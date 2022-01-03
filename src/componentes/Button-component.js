import React from 'react'
/**
 * Este componente retorna una seccion que contiene los elementos necesarios para modelar un 'boton'.
 * @param {props} props Distintas variables que representan las propiedades usadas en los elemententos necesarios para la 
 * seccion del boton.
 * @returns {html} Fragmento de codigo Html que representa al componente.
 */
const ButtonComponent = (props) => {
    return (
        <div className={props.divCN}>
            <button className={props.btnCN} type={props.type} onClick={props.toClick}>
                <b>{props.btnText}</b>
            </button>
        </div>
    )
}

export default ButtonComponent
