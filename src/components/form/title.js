import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

const Title = (props) => {
    return (
        <div className='text-center m-3'>
            <h2><b>{props.text}</b></h2>
        </div>
    )
}

export default Title
