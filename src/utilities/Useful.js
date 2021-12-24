export default class Utilities {

    loadControl = (v, o) => {
        var contenedor = document.getElementById('load-container');
        contenedor.style.visibility = v;
        contenedor.style.opacity = o;
    }

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

    get_current_year() {
        const now = new Date();
        const year = now.getFullYear();
        return year;
    }

    get_current_month() {
        const now = new Date();
        const month = ((now.getMonth() + 1) < 10 ? '0' + (now.getMonth() + 1) : (now.getMonth() + 1));
        return month;
    }

    yearValidator(year){
        let r = false;
        if(parseInt(year) >= 1900 && parseInt(year) <= parseInt(this.get_current_year())) {
            r = true;
        }
        return r;
    }
}
