import axios from "axios"
import QueryString from 'qs'

export default{
    externalServerAddress: "",
    username: "",
    password: "",
    apiBaseAddress: "https://sm.ms/api/v2/",
    generateAccessToken: function (){
        let requireData = {
            "username": this.username,
            "password": this.password
        }
        let targetToken = ""
        // send request
        axios({
            data: QueryString.stringify(requireData),
            method: "post",
            url: this.apiBaseAddress + "/token"
        }).then(data => {
            // get status
            if (data.data.success != "true"){
                targetToken = "false"
            }
            else {
                targetToken = data.data.data.token
            }
        })
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
            url: "/avatar/get",
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