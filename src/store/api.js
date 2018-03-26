import axios from 'axios'
//const api = axios.create({baseURL: 'https://3a712a28.ngrok.io/api'});

const api = axios.create({baseURL: 'http://localhost:8000/api'});

export default api
