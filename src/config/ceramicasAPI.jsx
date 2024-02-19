import axios from "axios"

const ceramicasAPI = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
})

export default ceramicasAPI