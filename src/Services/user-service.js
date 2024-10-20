import { myAxios } from "./helper";


export const signUp = (user)=>{
    return myAxios
    .post("http://localhost:8082/api/users/register",user)
    .then((response) => response.data)
}


export const login = (user)=>{
    return myAxios
    .post("http://localhost:8082/api/users/login",user)
    .then((response) => response.data)
}
