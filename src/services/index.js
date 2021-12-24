import axios from 'axios';
const API_URL = 'http://10.110.42.29:8000';

export default class Service {
    async get_filtered_data(start_date, end_date) {
        let sd = "2021-08-20T12:00:00";
        let ed = "2021-08-20T13:00:00";

        alert("Datos que se enviaran a la API (Rango de fechas para el filtro de datos): " +
            "\n1.- " + sd + " (start_date)\n2.- " + ed + " (end_date)");

        const url = `${API_URL}/trafic/?start_date=` + sd + `&end_date=` + ed;
        return await axios.get(url);
    }
}