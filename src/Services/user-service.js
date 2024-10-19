import { myAxios } from "./helper";

export const signUp = (user)=>{
    return myAxios
    .post("api/v1/auth/register",user)
    .then((response) => response.data)
}


export const login = (user)=>{
    return myAxios
    .post("api/v1/auth/login",user)
    .then((response) => response.data)
}
