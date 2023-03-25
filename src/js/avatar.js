import axios from "axios"
import QueryString from 'qs'

export default{
    externalServerAddress: "",
    username: "kimsseTheWolf",
    password: "Jinbohan@070401",
    apiBaseAddress: "https://sm.ms/api/v2",
    getAvatarAddress: function(){
        return localStorage.getItem("MEMESA_AVATAR")
    },
    generateAccessToken: function (){
        let requireData = {
            "username": this.username,
            "password": this.password
        }
        let targetToken = ""
        // send request
        axios({
            method: "post",
            url: "/imgAPI/token?username="+this.username+"&password="+this.password,
        }).then(data => {
            // get status
            if (data.data.success != true){
                targetToken = "false"
                console.log(data)
                console.log("Request success but error occured while API processing")
                // return targetToken
            }
            else {
                targetToken = data.data.data.token
                console.log(targetToken)
                console.log("API Token gathered successfully")
                localStorage.setItem("AVATAR_TOKEN", targetToken)
                // return targetToken
            }
        }).catch (err => {
            console.log(err)
            targetToken = "false"
            // return targetToken
        })
        console.log(targetToken)
        return targetToken
    },
    getUserAvatarAddress: function (username){
        let userToken = localStorage.getItem("MEMESA_TOKEN")
        axios({
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": userToken
            },
            method: "post",
            url: "/api/avatar/get",
        }).then(data => {
            console.log(data)
            // get the status from the data
            if (data.data.Code == 200){
                // success
                return data.data.Data.address
            }
            else{
                return ""
            }
        })
    },
}