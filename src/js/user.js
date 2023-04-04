import axios from "axios"
import qs from "qs"

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

    })
}

export default{
    targetUsername: "",
    targetUserDescription: "",
    targetUserID: 0,
    returnData: {},
    getUserBasicInfo: function (id) {
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
            localStorage.setItem("TEMP_USERINFO", JSON.stringify(data.data.Data))
        }).catch(err =>{
            console.log("Error appears: ")
            console.log(err)
        })
        console.log("Return test: ")
        console.log(returnData)
        return returnData
    },
}