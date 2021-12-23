import React from 'react'
import ButtonComponent from '../form/button-component'
import Service from '../../services';
import Utilities from '../../utilities';

const objService = new Service();
const objUtilities = new Utilities();

const DataDownload = ({ start_date, end_date }) => {
    const downloadData = () => {
        objUtilities.loadControl('visible', '100%');
        objService.get_download_data(start_date, end_date).then((response) => {
            objUtilities.loadControl('hidden', '0');
            console.log(response);
        }).catch(function (error) {
            objUtilities.loadControl('hidden', '0');
            objUtilities.toError(error);
        });
    }

    const onClick = (e) => {
        if (start_date !== '' && end_date !== '') { downloadData(); }
        else { alert("Es necesario que selecciones un Mes/Año, antes de realizar la descarga de datos."); }
    }

    return (
        <div className='col-auto form-group d-flex align-items-center'>
            <ButtonComponent divCN="mt-2" btnCN="btn btn-danger px-4" type="button" btnText="Descargar" 
                toClick={onClick}>
            </ButtonComponent>
        </div>
    )
}

export default DataDownload
