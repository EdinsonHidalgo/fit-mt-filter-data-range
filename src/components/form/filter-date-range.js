import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import InputComponent from './input-component';
import ButtonComponent from './button-component';

const FilterDateRange = () => {
    const now = new Date();
    const today = now.getFullYear() + "-" + ((now.getMonth() + 1) < 10 ? '0' + (now.getMonth() + 1) : (now.getMonth() + 1));
    // YYYY-MM-DD
    // const today = now.getFullYear() + "-" + ((now.getMonth() + 1) < 10 ? '0' + (now.getMonth() + 1) : (now.getMonth() + 1)) +
    //     "-" + (now.getDate() < 10 ? '0' + now.getDate() : now.getDate());

    const text = {
        defaultSD: 'Fecha en la que comienza el filtro',
        inValidSD: 'La fecha de inicio NO puede ser posterior a la fecha final',
        defaultED: 'Fecha en la que termina el filtro',
        inValidED: 'La fecha final NO puede ser anterior a la fecha de inicio'
    }

    const [startDate, setStartDate] = useState({ value: '', valid: null });
    const [endDate, setEndDate] = useState({ value: '', valid: null });
    const [textSmallSD, setTextSmallSD] = useState(text.defaultSD);
    const [textSmallED, setTextSmallED] = useState(text.defaultED);

    const toSubmit = (e) => {
        e.preventDefault();
        if(startDate.valid && endDate.valid) {
            alert("Datos que se enviaran a la API (Rango de fechas para el filtro de datos): " + 
                "\n1.- " + startDate.value + " (Fecha de inicio)\n2.- " + endDate.value + " (Fecha final)");
            //TODO enviar datos a API ("Instalar axios para la coneccion")
            setStartDate({ value: '', valid: null });
            setEndDate({ value: '', valid: null });
            setTextSmallSD(text.defaultSD);
            setTextSmallED(text.defaultED);
        }
        else {
            alert("Es necesario que corrijas todos los errores de los campos, antes de realizar el envio de datos.");
        }
    }

    const toValStartDate = () => {
        let v = null;

        if (startDate.value !== '') {
            if (endDate.value !== '') {
                if (startDate.value > endDate.value) {
                    v = false;
                }
                else {
                    v = true;
                    setEndDate({ ...endDate, valid: true });
                }
            }
            else { v = true; }
        }
        else {
            if (endDate.value !== '') {
                setEndDate({ ...endDate, valid: true });
            }
        }
        setStartDate({ ...startDate, valid: v });
    }

    const toValEndDate = () => {
        let v = null;

        if (endDate.value !== '') {
            if (startDate.value !== '') {
                if (endDate.value < startDate.value) {
                    v = false;
                }
                else {
                    v = true;
                    setStartDate({ ...startDate, valid: true });
                }
            }
            else { v = true; }
        }
        else {
            if (startDate.value !== '') {
                setStartDate({ ...startDate, valid: true });
            }
        }
        setEndDate({ ...endDate, valid: v });
    }

    useEffect(() => {
        switch (startDate.valid) {
            case false: setTextSmallSD(text.inValidSD); break;
            default: setTextSmallSD(text.defaultSD); break;
        }
    }, [startDate.valid, text.inValidSD, text.defaultSD]);

    useEffect(() => {
        switch (endDate.valid) {
            case false: setTextSmallED(text.inValidED); break;
            default: setTextSmallED(text.defaultED); break;
        }
    }, [endDate.valid, text.inValidED, text.defaultED]);

    return (
        <div className='card container shadow-sm'>
            {/* <div className='d-flex justify-content-center'> this goes one level up, to size by default, remove container in level up*/}
            <form className='row align-items-center justify-content-center m-3' onSubmit={toSubmit}>
                <div className='form-group col-lg row'>
                    <InputComponent divCN="form-group col-md mb-2" labelCN="form-label" labelText="Fecha de inicio" inputID="start-date"
                        inputType="month" required={true} value={startDate.value} changeValue={setStartDate} smallID="desc-start-date"
                        smallText={textSmallSD} maxDate={today} toValidate={toValStartDate} valid={startDate.valid}>
                    </InputComponent>

                    <InputComponent divCN="form-group col-md mb-2" labelCN="form-label" labelText="Fecha final" inputID="end-date"
                        inputType="month" required={true} value={endDate.value} changeValue={setEndDate} smallID="desc-end-date"
                        smallText={textSmallED} maxDate={today} toValidate={toValEndDate} valid={endDate.valid}>
                    </InputComponent>
                </div>

                <ButtonComponent divCN="form-group col-auto" btnCN="btn btn-primary px-4" type="submit"
                    btnText="Filtrar">
                </ButtonComponent>
            </form>
            {/* </div> */}
        </div>
    )
}

export default FilterDateRange
