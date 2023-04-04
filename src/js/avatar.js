import axios from "axios"
import QueryString from 'qs'

let username = "kimsseTheWolf"
let password = "Jinbohan@070401"

function generateAccessToken(){
    return new Promise((res, rej) => {
        let targetToken
        axios({
            method: "post",
            url: "/imgAPI/token?username="+username+"&password="+password,
        }).then(data => {
            // get status
            if (data.data.success != true){
                targetToken = "false"
                console.log(data)
                console.log("Request success but error occured while API processing")
                res(null)
            }
            else {
                targetToken = data.data.data.token
                console.log(targetToken)
                console.log("API Token gathered successfully")
                res(targetToken)
            }
        }).catch (err => {
            console.log(err)
            targetToken = "false"
            res(null)
        })
    })
}

async function uploadAvatar(targetAvatar){
    let avatarToken = await generateAccessToken()
    return new Promise((res, rej) => {
        // Generate new request data
        let formData = new FormData()
        formData.append("smfile", targetAvatar)
        formData.append("format", "json")
        // send the request
        axios({
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": avatarToken,
            },
            method: "post",
            url: "/imgAPI/upload",
            data: formData,
        }).then(data => {
            if (data.data.success != true && data.data.code != 'image_repeated'){
                console.log(data.data)
                res(false)
            }
            // gather the url of the image
            if (data.data.code == 'image_repeated'){
                localStorage.setItem("MEMESA_AVATAR", data.data.images)
            }
            else {
                let userAvatarAddress = data.data.data.url
                // save the url in local and our own server
                localStorage.setItem("MEMESA_AVATAR", userAvatarAddress)
            }
            // upload this link to the server
            let requestData = {
                "address": localStorage.getItem("MEMESA_AVATAR")
            }
            axios({
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": localStorage.getItem("MEMESA_TOKEN")
                },
                method: "post",
                url: "/api/avatar/add",
                data: QueryString.stringify(requestData)
            }).then(data => {
                if (data.data.Code != 200){
                    res(false)
                }
                res(true)
            }).catch(err => {
                res(false)
            })
        }).catch(err => {
            res(false)
        })
    })
}

function getUserAvatarAddress(isForSelf, id=0){
    return new Promise((res, rej) => {
        let userToken = localStorage.getItem("MEMESA_TOKEN")
        let targetAvatar = ""
        let targetUrl = ""
        if (isForSelf){
            targetUrl = "/api/avatar/get"
        }
        else{
            targetUrl = "/api/avatar/getAny"
        }
        axios({
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": userToken
            },
            method: "post",
            url: targetUrl,
            data: QueryString.stringify({
                "userId": id
            })
        }).then(data => {
            console.log("Request finished")
            console.log(data)
            // get the status from the data
            if (data.data.Code == 200){
                // success
                console.log(data.data.Data.userAvatar)
                targetAvatar = data.data.Data.userAvatar
                if (isForSelf){
                    localStorage.setItem("MEMESA_AVATAR", data.data.Data.userAvatar)
                }
                else{
                    localStorage.setItem("TEMP_USERAVATAR", data.data.Data.userAvatar)
                }
                
                res(true)
            }
            else{
                targetAvatar = ""
                res(false)
            }
        })
    })
}

export default{
    generateAccessToken,
    getUserAvatarAddress,
    uploadAvatar,
}