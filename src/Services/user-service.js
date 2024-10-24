import { myAxios } from "./helper";
import { BASE_URL } from "./helper";

export const signUp = (user)=>{
    return myAxios
    .post(`${BASE_URL}/users/register`,user)
    .then((response) => response.data)
}


export const login = (user)=>{
    return myAxios
    .post(`${BASE_URL}/users/login`,user)
    .then((response) => response.data)
}
