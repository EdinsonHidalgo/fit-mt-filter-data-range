import React from 'react'

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
