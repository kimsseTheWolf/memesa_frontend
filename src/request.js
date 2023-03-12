import axios from "axios";
// import { response } from "express";

// GLOBAL CONFIGURATION
axios.defaults.baseURL = "http://127.0.0.1:8080"


function UserRegisterRequest(username, password, email){
    console.log("Inside function username: ", username)
    axios.post("/user/register", {
        "username": username,
        "password": password,
        "email": email,
    }).then(response => {
        console.log(response.data)
        return response.data
    })
}

export{
    UserRegisterRequest
}