import axios from "axios";
import { response } from "express";

// GLOBAL CONFIGURATION
axios.defaults.baseURL = "http://127.0.0.1:8080"


export function UserRegisterRequest(username:string, password:string, email:string){
    axios.post("/user/register", {
        "username": username,
        "password": password,
        "email": email
    }).then(response => {
        console.log(response.data)
        return response.data
    })
}
