import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import InputComponent from './input-component';
import ButtonComponent from './button-component';

const FilterDateRange = () => {
    const today = new Date().toISOString().split('T')[0];
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
        // console.log("startDate: " + startDate.value);
        // console.log("endDate: " + endDate.value);
        // console.log(today);
    }

    const toValStartDate = (inputValue) => {
        console.log("startDate: " + inputValue + "   endDate: " + endDate.value);
        let v = true;
        setTextSmallSD(text.defaultSD);

        if (endDate.value !== '') {
            if (inputValue > endDate.value) {
                console.log("Entro en if de toVal");
                v = false;
                setTextSmallSD(text.inValidSD);
            }
            else {
                setEndDate({...endDate, valid: true });
                setTextSmallED(text.defaultED);
            }
        }
        return v;
    }

    const toValEndDate = (inputValue) => {
        console.log("startDate: " + inputValue + "   endDate: " + endDate.value);
        let v = true;
        setTextSmallED(text.defaultED);

        if (startDate.value !== '') {
            if (inputValue < startDate.value) {
                console.log("Entro en if de toVal");
                v = false;
                setTextSmallED(text.inValidED);
            }
            else {
                setStartDate({...startDate, valid: true });
                setTextSmallSD(text.defaultSD);
            }
        }
        return v;
    }

    return (
        <div className='card container shadow-sm'>
            {/* <div className='d-flex justify-content-center'> this goes one level up, to size by default, remove container in level up*/}
            <form className='row align-items-center justify-content-center m-3' onSubmit={toSubmit}>
                <div className='form-group col-lg row'>
                    <InputComponent divCN="form-group col-md mb-2" labelCN="form-label" labelText="Fecha de inicio" inputID="start-date"
                        inputType="date" required={true} value={startDate.value} changeValue={setStartDate} smallID="desc-start-date"
                        smallText={textSmallSD} maxDate={today} toValidate={toValStartDate} valid={startDate.valid}>
                    </InputComponent>

                    <InputComponent divCN="form-group col-md mb-2" labelCN="form-label" labelText="Fecha final" inputID="end-date"
                        inputType="date" required={true} value={endDate.value} changeValue={setEndDate} smallID="desc-end-date"
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
