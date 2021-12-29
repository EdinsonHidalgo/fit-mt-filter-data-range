import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Data-filter.css';
import Utilities from '../utilities/Useful.js';
import InputComponent from './Input-component';
import ButtonComponent from './Button-component';

const objUtilities = new Utilities();

const DataFilter = () => {
    const YM = objUtilities.get_current_year() + "-" + objUtilities.get_current_month();
    const text = { defaultYM: 'Mes parcial' }

    const [dateYM, setDateYM] = useState({ value: '', valid: null });
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [textSmallYM, setTextSmallYM] = useState(text.defaultYM);

    const filter = async (start_date, end_date) => {
        const url = "http://10.110.42.29:8000/trafic/?start_date=" + start_date + "&end_date=" + end_date;
        try {
            const response = await fetch(url)
                .then(response => response.json())
                .then(data => console.log(data));
            if (response.status === 200) {
                console.log("Respuesta correcta");
            }
        } catch (err) {
            return "Ocurrio un error: " + err;
        }
    }

    const DateRefLastSecond = (date) => {
        let convertedDate = new Date(date);
        convertedDate = new Date(convertedDate.getTime() + 24 * 60 * 60 * 1000 - 1);
        convertedDate = convertedDate.toISOString().split('.')[0];
        return convertedDate;
    }

    const DateRefFirstSecond = (date) => {
        let convertedDate = new Date(date).toISOString().split('.')[0];
        return convertedDate;
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (dateYM.valid && startDate !== '' && endDate !== '') {
            let cStartDate = DateRefFirstSecond(startDate);
            let cEndDate = DateRefLastSecond(endDate);
            filter(cStartDate, cEndDate);
        }
        else { alert("Es necesario que selecciones un Mes/Año valido, antes de realizar la descarga de datos."); }
    }

    useEffect(() => {
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

    useEffect(() => {
        const getYear = () => {
            return startDate.split("-")[0];
        }
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
        </div>
    )
}

export default DataFilter
