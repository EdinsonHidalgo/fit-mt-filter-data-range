import React from 'react'

const ButtonComponent = (props) => {
    return (
        <div className={props.divCN}>
            <button className={props.btnCN} type={props.type} onClick={props.toClick}>{props.btnText}</button>
        </div>
    )
}

export default ButtonComponent
