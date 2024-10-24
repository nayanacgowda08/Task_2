// helper.js
import axios from "axios";

export const BASE_URL = 'http://10.65.1.81:8082/api'; // Change this to your desired base URL

export const myAxios = axios.create({
    baseURL: BASE_URL,
    // You can uncomment and customize headers if needed
    // headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${localStorage.getItem('token')}`
    // }
});

// api.js
// import { myAxios } from "./helper";

// Define your endpoints relative to the base URL
// export const ENDPOINTS = {
//     register: '/api/users/register',
//     login: '/api/users/login',
//     uploadProduct: (merchantId) => `/api/service/merchant/${merchantId}/upload`,
//     uploadFile: (merchantId) => `/api/service/merchant/${merchantId}/upld`,
//     getProductById: (id) => `/api/service/merchant/products/${id}`
// };

// export const signUp = (user) => {
//     return myAxios
//         .post(ENDPOINTS.register, user)
//         .then((response) => response.data);
// };

// export const login = (user) => {
//     return myAxios
//         .post(ENDPOINTS.login, user)
//         .then((response) => response.data);
// };

// export const uploadProduct = (merchantId, productDto) => {
//     return myAxios
//         .post(ENDPOINTS.uploadProduct(merchantId), productDto)
//         .then((response) => response.data);
// };

// export const uploadFile = (merchantId, productRequest) => {
//     return myAxios
//         .post(ENDPOINTS.uploadFile(merchantId), productRequest)
//         .then((response) => response.data);
// };

// export const getProductById = (id) => {
//     return myAxios
//         .get(ENDPOINTS.getProductById(id))
//         .then((response) => response.data);
// };
