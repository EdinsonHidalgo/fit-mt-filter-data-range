import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import InputComponent from './input-component';
import ButtonComponent from './button-component';
import Service from '../../services';
import Utilities from '../../utilities';

const objService = new Service();
const objUtilities = new Utilities();

const DataFilter = ({toStartDate, toEndDate}) => {
    const now = new Date();
    const year = now.getFullYear();
    const month = ((now.getMonth() + 1) < 10 ? '0' + (now.getMonth() + 1) : (now.getMonth() + 1));
    const YM = year + "-" + month;
    const text = { defaultYM: 'Mes parcial' }

    const [dateYM, setDateYM] = useState({ value: '', valid: null });
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [textSmallYM, setTextSmallYM] = useState(text.defaultYM);

    const filter = (start_date, end_date) => {
        objUtilities.loadControl('visible', '100%');
        objService.get_filtered_data(start_date, end_date).then((response) => {
            objUtilities.loadControl('hidden', '0');
            console.log(response);
        }).catch(function (error) {
            objUtilities.loadControl('hidden', '0');
            objUtilities.toError(error);
        });
    }

    const toSubmit = (e) => {
        e.preventDefault();
        if (dateYM.valid) {
            let cStartDate = DateRefFirstSecond(startDate);
            let cEndDate = DateRefLastSecond(endDate);
            toStartDate(cStartDate);
            toEndDate(cEndDate);
            filter(cStartDate, cEndDate);
        }
        else {
            alert("Es necesario corrijas todos los datos de los campos, antes de realizar el envio de datos.");
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

    useEffect(() => {
        const toValidDate = () => {
            let v = null;
            if (dateYM.value !== '') {
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
            if (parseInt(getYear()) === parseInt(year) && parseInt(getMonth()) === parseInt(month)) {
                let day = new Date().getDate();
                lastDay = (day < 10 ? '0' + day : day);
            }
            else {
                lastDay = new Date(getYear(), getMonth(), 0).getDate();
            }
            let lEndDate = getYear() + "-" + getMonth() + "-" + lastDay;
            setEndDate(lEndDate);
        }
    }, [startDate, year, month]);

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
        <div className='d-flex justify-content-center'>
            <div className='card shadow-sm width-card-to-one-element'>
                <form className='m-4' onSubmit={toSubmit}>
                    <div className='form-group'>
                        <InputComponent divCN="form-group mb-3" labelCN="form-label" labelText="Mes/Año" inputID="start-date"
                            inputType="month" required={true} value={dateYM.value} changeValue={setDateYM} smallID="desc-start-date"
                            smallText={textSmallYM} maxDate={YM} valid={dateYM.valid}>
                        </InputComponent>
                    </div>

                    <ButtonComponent divCN="form-group d-flex justify-content-center" btnCN="btn btn-primary px-4" type="submit"
                        btnText="Filtrar Datos">
                    </ButtonComponent>
                </form>
            </div>
        </div>
    )
}

export default DataFilter
