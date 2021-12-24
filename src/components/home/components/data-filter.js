import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/styles.css';
import { CSVLink } from 'react-csv';
import Service from '../../../services/service';
import Utilities from '../../../utilities/Useful';
import InputComponent from '../../form/input-component';
import ButtonComponent from '../../form/button-component'
import TableComponent from '../../list/table-component';

const objService = new Service();
const objUtilities = new Utilities();

const DataFilter = () => {
    const YM = objUtilities.get_current_year() + "-" + objUtilities.get_current_month();
    const text = { defaultYM: 'Mes parcial' }
    const csvLink = useRef();

    const [dateYM, setDateYM] = useState({ value: '', valid: null });
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [textSmallYM, setTextSmallYM] = useState(text.defaultYM);
    const [data, setData] = useState(null);
    const [headers, setHeaders] = useState(null);
    const [response, setResponse] = useState(null);

    const fillHeaders = () => {
        const header = [
            { label: 'FirstColumn', key: 'firstColumn' },
            { label: 'SecondColumn', key: 'secondColumn' },
            { label: 'ThirdColumn', key: 'thirdColumn' }
        ];
        return header;
    }

    const fillData = () => {
        const data = [
            { firstColumn: "firstData", secondColumn: "secondData", thirdColumn: "thirdData" },
            { firstColumn: "firstData", secondColumn: "secondData", thirdColumn: "thirdData" },
            { firstColumn: "firstData", secondColumn: "secondData", thirdColumn: "thirdData" }
        ];
        return data;
    }

    const filter = (start_date, end_date) => {
        objUtilities.loadControl('visible', '100%');
        objService.get_filtered_data(start_date, end_date).then((response) => {
            objUtilities.loadControl('hidden', '0');
            setResponse(response);
            console.log(response);
        }).catch(function (error) {
            setResponse('');
            objUtilities.loadControl('hidden', '0');
            objUtilities.toError(error);
        });
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

    const csvReport = {
        data: data,
        headers: headers,
        filename: 'Report.csv'
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (data !== null && headers !== null) {
            csvLink.current.link.click();
        }
        else { alert("Es necesario que selecciones un Mes/Año, antes de realizar la descarga de datos."); }
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

    useEffect(() => {
        if (dateYM.valid && startDate !== '' && endDate !== '') {
            let cStartDate = DateRefFirstSecond(startDate);
            let cEndDate = DateRefLastSecond(endDate);
            filter(cStartDate, cEndDate);
        }
    }, [dateYM.valid, startDate, endDate]);

    useEffect(() => {
        if (response !== null) {
            setData(fillData());
            setHeaders(fillHeaders());
        }
    }, [response]);

    return (
        <div className='container'>
            <div className='card shadow-sm'>
                <form className='m-3 row d-flex justify-content-center' onSubmit={onSubmit}>
                    <div className='form-group col'>
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
            <br />
            {data === null && headers === null ? null :
                <div className='card shadow-sm'>
                    <TableComponent data={data} header={headers}></TableComponent>
                    <CSVLink ref={csvLink} {...csvReport}></CSVLink>
                </div>
            }
        </div>
    )
}

export default DataFilter
