import config from "@/config";

const formatoFecha = (fechaSinFormato) => {

    const dateFormatted = new Date(fechaSinFormato);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    const fechaEspanol = Intl.DateTimeFormat("es-ES", options).format(dateFormatted);

    return fechaEspanol;
    
}


export default formatoFecha;