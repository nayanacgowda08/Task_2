// helper.js
import axios from "axios";

export const BASE_URL = 
'http://localhost:8082/api';

// 'http://10.65.1.81:8082/api'; 

export const myAxios = axios.create({
    baseURL: BASE_URL,
    
});

