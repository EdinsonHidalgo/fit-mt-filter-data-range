export default class Utilities {
    /**
     * Este metodo permite mostrar en consola, las posible propiedades que se manejan dentro de un error.
     * @param {error} err Error que retorna durante una solicitud de metodos HTTP.
     */
    toError = (err) => {
        if (err.response) {
            // Request made and server responded
            console.log("Data: " + err.response.data);
            console.log("Status: " + err.response.status);
            console.log(err.response.headers);
        } else if (err.request) {
            // The request was made but no response was received
            console.log(err.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', err.message);
        }
    }
    /**
     * Este metodo permite generar el año actual.
     * @returns {String} Retorna el año actual.
     */
    get_current_year() {
        const now = new Date();
        const year = now.getFullYear();
        return year;
    }
    /**
     * Este metodo permite generar el mes actual.
     * @returns {String} Retorna el mes actual.
     */
    get_current_month() {
        const now = new Date();
        const month = ((now.getMonth() + 1) < 10 ? '0' + (now.getMonth() + 1) : (now.getMonth() + 1));
        return month;
    }
    /**
     * Este metodo permite validar que el año no sea menor a 1900, ni mayor al año actual.
     * @param {String} year Año que se desea validar.
     * @returns {Boolean} Retorna una bandera que representa la validacion del año.
     */
    yearValidator(year) {
        let r = false;
        if (parseInt(year) >= 1900 && parseInt(year) <= parseInt(this.get_current_year())) {
            r = true;
        }
        return r;
    }
    /**
     * Este metodo permite validar que el mes se encuentre en un formato correcto.
     * @param {String} month Mes que se desea validar.
     * @returns {Boolean} Retorna una bandera que representa la validacion del mes.
     */
     monthValidator(month) {
        let r = false;
        if (month.length === 2 && parseInt(month) >= 1 && parseInt(month) <= 12) {
            r = true;
        }
        return r;
    }
    /**
     * Este metodo permite validar que el formato de fecha.
     * @param {String} date Fecha que se desea validar.
     * @returns {Boolean} Retorna una bandera que representa la validacion del campo.
     */
    dateValidator(date) {
        let r = false;
        let cadena = date.split('-');
        if (cadena.length === 2) {
            if(this.yearValidator(cadena[0]) && this.monthValidator(cadena[1])) {
                r = true;
            }
        }
        return r;
    }
}
