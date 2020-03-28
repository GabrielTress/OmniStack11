import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.2.103:3333' //ip local, seguido da porta
});

export default api;