import axios from "axios"
import QueryString from "qs"
import avatar from "@/js/avatar"

function getUserBasicInfo (id) {
    return new Promise((res, rej) => {
        let userToken = localStorage.getItem("MEMESA_TOKEN")
        let returnData = this.returnData
        console.log(id)
        axios({
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": userToken
            },
            method: 'get',
            url: '/api/user/getUserBasicInfo/' + id,
        }).then(data => {
            // transport the data to the inpage functions
            if (data.data.Code != 200){
                res(null)
            }
            res(data.data.Data)
        }).catch(err =>{
            console.log("Error appears: ")
            console.log(err)
            res(null)
        })
    })
}

function register (username, password, email){
    return new Promise((res, rej) => {
        let data = {
            "username": username,
            "password": password,
            "email": email
        }
        axios({
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "post",
            url: "/api/user/register",
            data: QueryString.stringify(data)
        }).then(info => {
            if (info.data.Code == 200){
                res(true)
            }
            res(false)
        }).catch(err => {
            res(false)
        })
    })
}

function login (username, password, keepAlive) {
    return new Promise((res, rej) => {
        // generate metadata
        let data = {
            "username": username,
            "password": password,
            "keepAlive": keepAlive,
        }
        // request
        axios({
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "post",
            url: "/api/user/login",
            data: QueryString.stringify(data)
        }).then((info) => {
            console.log(info)
            const token = info.data.Data.token
            localStorage.setItem("MEMESA_TOKEN", token)
            // send a request to get the user avatar
            let avatarAddress = avatar.getUserAvatarAddress(username.value)
            localStorage.setItem("MEMESA_AVATAR", avatarAddress)
            res(true)
        }).catch((err) => {
            console.log(err)
            res(false)
        })
    })
}

function getUserInfo(userToken){
    return new Promise((res, rej) => {
        axios({
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": userToken
            },
            method: "post",
            url: "/api/user/getUserInfo"
        }).then(data => {
            if (data.data.Code == 200){
                res(data.data.Data)
            }
            res(null)
        }).catch(err => {
            console.log(err)
            res(null)
        })
    })
}

function modifyBasicUserInformation(newUsername, newDescription){
    return new Promise((res, rej) => {
        let userToken = localStorage.getItem("MEMESA_TOKEN")
        let requestData = {
            "username": newUsername,
            "description": newDescription,
        }
        console.log(requestData)
        // send request
        axios({
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": userToken
            },
            method: "post",
            url: "/api/user/modifyBasicUserInfo",
            data: QueryString.stringify(requestData)
        }).then(data => {
            if (data.data.Code == 200){
                // get and reapply the new token from the respond
                localStorage.removeItem("MEMESA_TOKEN")
                localStorage.setItem("MEMESA_TOKEN", data.data.Data)
                res(true)
            }
            else{
                res(false)
            }
            
        }).catch(err => {
            console.log(err)
            res(false)
        })
    })
}

function deleteUser(){
    return new Promise((res, rej) => {
        // send a request to the server that to delete the user from the database
        axios({
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": localStorage.getItem("MEMESA_TOKEN")
            },
            method: "post",
            url: "/api/user/deleteUser"
        }).then(data => {
            if (data.data.Code == 200){
                localStorage.clear()
                res(true)
            }
            else{
                res(false)
            }
        }).catch(err => {
            console.log(err)
            res(false)
        })
    })
}

export default{
    getUserBasicInfo,
    register,
    login,
    getUserInfo,
    modifyBasicUserInformation,
    deleteUser,
}