import React from 'react'
import ButtonComponent from '../form/button-component'

const DataDownload = () => {
    return (
        <div className='d-flex justify-content-center'>
            <div className='card shadow-sm width-card-to-one-element'>
                <div className='m-4'>
                    <ButtonComponent divCN="form-group d-flex justify-content-center" btnCN="btn btn-danger px-4" type="submit"
                        btnText="Descargar">
                    </ButtonComponent>
                </div>
            </div>
        </div>
    )
}

export default DataDownload
