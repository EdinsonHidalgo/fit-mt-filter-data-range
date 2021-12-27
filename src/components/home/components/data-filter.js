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
            { label: 'ap_mac', key: 'ap_mac' },
            { label: 'client_type', key: 'client_type' },
            { label: 'ip', key: 'ip' },
            { label: 'user_mac', key: 'user_mac' },
            { label: 'band', key: 'band' },
            { label: 'trafico_in', key: 'trafico_in' },
            { label: 'trafico_out', key: 'trafico_out' },
            { label: 'site', key: 'site' },
            { label: 'site_id', key: 'site_id' },
            { label: 'ap_group', key: 'ap_group' },
            { label: 'nombre_sede', key: 'nombre_sede' },
            { label: 'dda', key: 'dda' },
            { label: 'estado_instalacion', key: 'estado_instalacion' },
            { label: 'ubicacion', key: 'ubicacion' },
            { label: 'cod_iso', key: 'cod_iso' },
            { label: 'tipo_sitio_desc', key: 'tipo_sitio_desc' },
            { label: 'grupo', key: 'grupo' },
            { label: 'ip_wlan', key: 'ip_wlan' },
            { label: 'mac_apoutdoor', key: 'mac_apoutdoor' },
            { label: 'nombre_departamento', key: 'nombre_departamento' },
            { label: 'municipio_pdet', key: 'municipio_pdet' },
            { label: 'ip_wan', key: 'ip_wan' },
            { label: 'banda_down', key: 'banda_down' },
            { label: 'longitud', key: 'longitud' },
            { label: 'cod_dane_depar', key: 'cod_dane_depar' },
            { label: 'nombre_institucion_ed', key: 'nombre_institucion_ed' },
            { label: 'cod_dane_sede', key: 'cod_dane_sede' },
            { label: 'energia_desc', key: 'energia_desc' },
            { label: 'cod_servicio', key: 'cod_servicio' },
            { label: 'ip_prod_1', key: 'ip_prod_1' },
            { label: 'detalle_sitio', key: 'detalle_sitio' },
            { label: 'id_beneficiario', key: 'id_beneficiario' },
            { label: 'ip_prod_2', key: 'ip_prod_2' },
            { label: 'detalle_sitio_desc', key: 'detalle_sitio_desc' },
            { label: 'latitud', key: 'latitud' },
            { label: 'grupo_instalacion', key: 'grupo_instalacion' },
            { label: 'energia', key: 'energia' },
            { label: 'operador_cod', key: 'operador_cod' },
            { label: 'cod_centro_poblado', key: 'cod_centro_poblado' },
            { label: 'mac_2apoutdoor', key: 'mac_2apoutdoor' },
            { label: 'mac_indoor', key: 'mac_indoor' },
            { label: 'tipo_sitio', key: 'tipo_sitio' },
            { label: 'cod_dane_muni', key: 'cod_dane_muni' },
            { label: 'nombre_centro_pob', key: 'nombre_centro_pob' },
            { label: 'banda_up', key: 'banda_up' },
            { label: 'matricula', key: 'matricula' },
            { label: 'grupo_desc', key: 'grupo_desc' },
            { label: 'region', key: 'region' },
            { label: 'nombre_municipio', key: 'nombre_municipio' },
            { label: 'cod_dane_institucion_edu', key: 'cod_dane_institucion_edu' },
            { label: 'timestamp', key: 'timestamp' },
            { label: 'ancho_banda_carga', key: 'ancho_banda_carga' },
            { label: 'ancho_banda_descarga', key: 'ancho_banda_descarga' },
            { label: 'consumo', key: 'consumo' },
            { label: 'concurrenciaConexiones', key: 'concurrenciaConexiones' }
        ];
        return header;
    }

    const fillData = () => {
        const data = [
            { ap_mac: "exampleData1", client_type: "exampleData2", ip: "exampleData3", user_mac: "exampleData4", band: "exampleData5", trafico_in: "exampleData6", trafico_out: "exampleData7", site: "exampleData8", site_id: "exampleData9", ap_group: "exampleData10", nombre_sede: "exampleData11", dda: "exampleData12", estado_instalacion: "exampleData13", ubicacion: "exampleData14", cod_iso: "exampleData15", tipo_sitio_desc: "exampleData16", grupo: "exampleData17", ip_wlan: "exampleData18", mac_apoutdoor: "exampleData19", nombre_departamento: "exampleData20", municipio_pdet: "exampleData21", ip_wan: "exampleData22", banda_down: "exampleData23", longitud: "exampleData24", cod_dane_depar: "exampleData25", nombre_institucion_ed: "exampleData26", cod_dane_sede: "exampleData27", energia_desc: "exampleData28", cod_servicio: "exampleData29", ip_prod_1: "exampleData30", detalle_sitio: "exampleData31", id_beneficiario: "exampleData32", ip_prod_2: "exampleData33", detalle_sitio_desc: "exampleData34", latitud: "exampleData35", grupo_instalacion: "exampleData36", energia: "exampleData37", operador_cod: "exampleData38", cod_centro_poblado: "exampleData39", mac_2apoutdoor: "exampleData40", mac_indoor: "exampleData41", tipo_sitio: "exampleData42", cod_dane_muni: "exampleData43", nombre_centro_pob: "exampleData44", banda_up: "exampleData45", matricula: "exampleData46", grupo_desc: "exampleData47", region: "exampleData48", nombre_municipio: "exampleData49", cod_dane_institucion_edu: "exampleData50", timestamp: "exampleData51", ancho_banda_carga: "exampleData52", ancho_banda_descarga: "exampleData53", consumo: "exampleData54", concurrenciaConexiones: "exampleData55" },
            { ap_mac: "exampleData1", client_type: "exampleData2", ip: "exampleData3", user_mac: "exampleData4", band: "exampleData5", trafico_in: "exampleData6", trafico_out: "exampleData7", site: "exampleData8", site_id: "exampleData9", ap_group: "exampleData10", nombre_sede: "exampleData11", dda: "exampleData12", estado_instalacion: "exampleData13", ubicacion: "exampleData14", cod_iso: "exampleData15", tipo_sitio_desc: "exampleData16", grupo: "exampleData17", ip_wlan: "exampleData18", mac_apoutdoor: "exampleData19", nombre_departamento: "exampleData20", municipio_pdet: "exampleData21", ip_wan: "exampleData22", banda_down: "exampleData23", longitud: "exampleData24", cod_dane_depar: "exampleData25", nombre_institucion_ed: "exampleData26", cod_dane_sede: "exampleData27", energia_desc: "exampleData28", cod_servicio: "exampleData29", ip_prod_1: "exampleData30", detalle_sitio: "exampleData31", id_beneficiario: "exampleData32", ip_prod_2: "exampleData33", detalle_sitio_desc: "exampleData34", latitud: "exampleData35", grupo_instalacion: "exampleData36", energia: "exampleData37", operador_cod: "exampleData38", cod_centro_poblado: "exampleData39", mac_2apoutdoor: "exampleData40", mac_indoor: "exampleData41", tipo_sitio: "exampleData42", cod_dane_muni: "exampleData43", nombre_centro_pob: "exampleData44", banda_up: "exampleData45", matricula: "exampleData46", grupo_desc: "exampleData47", region: "exampleData48", nombre_municipio: "exampleData49", cod_dane_institucion_edu: "exampleData50", timestamp: "exampleData51", ancho_banda_carga: "exampleData52", ancho_banda_descarga: "exampleData53", consumo: "exampleData54", concurrenciaConexiones: "exampleData55" },
            { ap_mac: "exampleData1", client_type: "exampleData2", ip: "exampleData3", user_mac: "exampleData4", band: "exampleData5", trafico_in: "exampleData6", trafico_out: "exampleData7", site: "exampleData8", site_id: "exampleData9", ap_group: "exampleData10", nombre_sede: "exampleData11", dda: "exampleData12", estado_instalacion: "exampleData13", ubicacion: "exampleData14", cod_iso: "exampleData15", tipo_sitio_desc: "exampleData16", grupo: "exampleData17", ip_wlan: "exampleData18", mac_apoutdoor: "exampleData19", nombre_departamento: "exampleData20", municipio_pdet: "exampleData21", ip_wan: "exampleData22", banda_down: "exampleData23", longitud: "exampleData24", cod_dane_depar: "exampleData25", nombre_institucion_ed: "exampleData26", cod_dane_sede: "exampleData27", energia_desc: "exampleData28", cod_servicio: "exampleData29", ip_prod_1: "exampleData30", detalle_sitio: "exampleData31", id_beneficiario: "exampleData32", ip_prod_2: "exampleData33", detalle_sitio_desc: "exampleData34", latitud: "exampleData35", grupo_instalacion: "exampleData36", energia: "exampleData37", operador_cod: "exampleData38", cod_centro_poblado: "exampleData39", mac_2apoutdoor: "exampleData40", mac_indoor: "exampleData41", tipo_sitio: "exampleData42", cod_dane_muni: "exampleData43", nombre_centro_pob: "exampleData44", banda_up: "exampleData45", matricula: "exampleData46", grupo_desc: "exampleData47", region: "exampleData48", nombre_municipio: "exampleData49", cod_dane_institucion_edu: "exampleData50", timestamp: "exampleData51", ancho_banda_carga: "exampleData52", ancho_banda_descarga: "exampleData53", consumo: "exampleData54", concurrenciaConexiones: "exampleData55" }
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
