import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Data-filter.css';
import Utilities from '../utilities/Useful.js';
import InputComponent from './Input-component';
import ButtonComponent from './Button-component';
/**
 * Esta constante almacena una instancia, que permite acceder a algunos metodos utilizados dentro del componente.
 */
const objUtilities = new Utilities();
/**
 * Este componente retorna una tarjeta que contiene, la seccion para campo de Mes/Año, y el boton de descarga.
 * @returns {html} Fragmento de codigo Html que representa al componente.
 */
const DataFilter = () => {
    /**
     * Esta constante almacena el dato del año y mes actual.
     */
    const YM = objUtilities.get_current_year() + "-" + objUtilities.get_current_month();
    /**
     * Esta constante almacena los distintos textos que se mostraran debajo del campo de 'Mes/Año'.
     */
    const text = { defaultYM: 'Mes parcial' }
    /**
     * Esta constante almacena el estado de la fecha seleccionada en el campo Mes/Año. La clave 'value' almacena el dato 
     * en formato 'YYYY-MM'. La clave 'valid' almacena el estado de validacion del campo.
     */
    const [dateYM, setDateYM] = useState({ value: '', valid: null });
    /**
     * Esta constante almacena el estado de la fecha de inicio (mes parcial), teniendo encuenta la seleccion en el campo 
     * Mes/Año, en formato 'YYYY-MM-DD'.
     */
    const [startDate, setStartDate] = useState('');
    /**
     * Esta constante almacena el estado de la fecha de final (mes parcial), teniendo en cuenta la seleccion en el campo 
     * Mes/Año, en formato 'YYYY-MM-DD'.
     */
    const [endDate, setEndDate] = useState('');
    /**
     * Esta constante almacena el estado del mensaje que se mostrara debajo del campo de 'Mes/Año'.
     */
    const [textSmallYM, setTextSmallYM] = useState(text.defaultYM);
    /**
     * Esta constante almacena el estado que permite controlar el mensaje de "Cargando...".
     */
    const [loading, setLoading] = useState(null);
    /**
     * Este metodo permite realizar una consulta 'GET' (por defecto) a la API. 
     * @param {String} start_date Fecha de inicio que se enviara como primer parametro en la consulta API
     * @param {String} end_date Fecha final que se enviara como segundo parametro en la consulta API
     * @returns {void}
     */
    const filter = async (start_date, end_date) => {
        setLoading(true);
        const sd = "2021-11-30T16:00:00";
        const ed = "2021-11-30T16:10:00";
        const url = "http://10.110.42.29:8000/trafic/?start_date=" + sd + "&end_date=" + ed;
        try {
            const response = await fetch(url)
            // .then(response => response.json())
            // .then(data => console.log(data));
            // if (response.status === 200) {
            //     console.log("Respuesta correcta");
            // }
            console.log(response);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            objUtilities.toError(err);
        }
    }
    /**
     * Este metodo permite ajustar el formato de una fecha.
     * @param {String} date Fecha en formato 'YYYY-MM-DD'.
     * @returns {String} Retorna la fecha del ultimo dia, a la ultima hora, en formato 'YYYY-MM-DDTHH:MM:SS'.
     */
    const DateRefLastSecond = (date) => {
        let convertedDate = new Date(date);
        convertedDate = new Date(convertedDate.getTime() + 24 * 60 * 60 * 1000 - 1);
        convertedDate = convertedDate.toISOString().split('.')[0];
        return convertedDate;
    }
    /**
     * Este metodo permite ajustar el formato de una fecha.
     * @param {String} date Fecha en formato 'YYYY-MM-DD'.
     * @returns {String} Retorna la fecha del primer dia, a primera hora, en formato 'YYYY-MM-DDTHH:MM:SS'.
     */
    const DateRefFirstSecond = (date) => {
        let convertedDate = new Date(date).toISOString().split('.')[0];
        return convertedDate;
    }
    /**
     * Este metodo evita el envio de datos, realiza una ultima verificacion de los datos y los ajusta para el posterior 
     * envio de los mismos, como parametros, en una consulta API.
     * @param {event} e Evento que se lanza en el elemento del componente.
     */
    const onSubmit = (e) => {
        e.preventDefault();
        if (dateYM.valid && startDate !== '' && endDate !== '') {
            let cStartDate = DateRefFirstSecond(startDate);
            let cEndDate = DateRefLastSecond(endDate);
            filter(cStartDate, cEndDate);
        }
        else { alert("Es necesario que selecciones un Mes/Año valido, antes de realizar la descarga de datos."); }
    }
    /**
     * Este hook se ejecutara cada vez que el componente se renderice, por el cambio en la clave 'value', del estado 
     * 'dateYM'.
     */
    useEffect(() => {
        /**
         * Este metodo permite validar la fecha almacenada en la clave 'value', y almacenar el resultado en la clave 
         * 'valid', del estado 'dateYM'. 
         */
        const toValidDate = () => {
            let v = null;
            setStartDate('');
            setEndDate('');
            if (dateYM.value !== '' && objUtilities.yearValidator(dateYM.value.split('-')[0])) {
                v = true;
                setStartDate(dateYM.value + "-01");
            }
            setDateYM((prevState) => {
                return { ...prevState, valid: v }
            });
        }
        toValidDate();
    }, [dateYM.value]);
    /**
     * Este hook se ejecutara cada vez que el componente se renderice, por el cambio en el estado 'startDate'. Permite 
     * generar la fecha del ultimo dia del 'Mes/Año' seleccionado (mes parcial).
     */
    useEffect(() => {
        /**
         * Este metodo permite obtener el año, almacenado en el estado 'startDate'.
         * @returns {String} Retorna el primer elemento del array generado mediante la division de la cadena de texto, 
         * almacenada en el estado 'startDate'.
         */
        const getYear = () => {
            return startDate.split("-")[0];
        }
        /**
         * Este metodo permite obtener el mes, almacenado en el estado 'startDate'.
         * @returns {String} Retorna el segundo elemento del array generado mediante la division de la cadena de texto, 
         * almacenada en el estado 'startDate'.
         */
        const getMonth = () => {
            return startDate.split("-")[1];
        }
        if (startDate !== '') {
            let lastDay = '';
            if (parseInt(getYear()) === parseInt(objUtilities.get_current_year()) &&
                parseInt(getMonth()) === parseInt(objUtilities.get_current_month())) {
                let day = new Date().getDate();
                lastDay = (day < 10 ? '0' + day : day);
            }
            else {
                lastDay = new Date(getYear(), getMonth(), 0).getDate();
            }
            let lEndDate = getYear() + "-" + getMonth() + "-" + lastDay;
            setEndDate(lEndDate);
        }
    }, [startDate]);
    /**
     * Este hook se ejecutara cada vez que el componente se renderice, por el cambio el estado 'startDate','endDate' y 
     * la clave 'valid' del estado 'dateYM'. Selecciona el mensaje que se mostrara en el campo 'Mes/Año'.
     */
    useEffect(() => {
        switch (dateYM.valid) {
            case true:
                setTextSmallYM(text.defaultYM + ": " + startDate + " al " + endDate + "");
                break;

            default:
                setTextSmallYM(text.defaultYM);
                break;
        }
    }, [dateYM.valid, startDate, endDate, text.defaultYM]);

    return (
        <div className='card shadow-sm'>
            <form className='m-3 row d-flex justify-content-center' onSubmit={onSubmit}>
                <div className='form-group col-auto'>
                    <InputComponent divCN="max-width-input"
                        labelCN="form-label" labelText="Mes/Año" inputID="start-date" inputType="month" required={true}
                        value={dateYM.value} changeValue={setDateYM} smallID="desc-start-date" smallText={textSmallYM}
                        maxDate={YM} minDate={'1900-01'} valid={dateYM.valid}>
                    </InputComponent>
                </div>

                <div className='form-group col-auto d-flex align-items-center'>
                    <ButtonComponent divCN="line-input" btnCN="btn btn-danger px-4" type="submit"
                        btnText="Descargar">
                    </ButtonComponent>
                </div>
            </form>
            {loading ? <h2 className='text-center mb-4'>Cargando...</h2> : null}
        </div>
    )
}

export default DataFilter
