import axios from "axios"

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

async function uploadMoment(fileList){
    let accessToken = await generateAccessToken()
    return new Promise((res, rej) => {
        // Generate form data
        let formDataList = []
        for (let i = 0; i < fileList.length; i++){
            let targetFormData = new FormData()
            targetFormData.append("smfile", fileList[i])
            targetFormData.append("format", "json")
            formDataList.push(targetFormData)
        }
        // Start Upload the images to the image server
        let returnList = []
        for (let i = 0; i < formDataList.length; i++){
            axios({
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": accessToken,
                },
                method: "post",
                url: "/imgAPI/upload",
                data: formDataList[i],
            }).then(data => {
                if (data.data.success != true && data.data.code != 'image_repeated'){
                    res({status: false, data: []})
                }
                // collect the url and append to the return list
                if (data.data.code == 'image_repeated'){
                    returnList.push(data.data.images)
                }
                else {
                    returnList.push(data.data.data.url)
                }
            }).catch(err => {
                console.log(err)
                res({status: false, data: []})
            })
        }
        // finish all the steps, return data
        res({status: true, data: returnList})
    })

}

async function uploadMomentToDatabase(content, urlList, isPublic){
    return new Promise((res, rej) => {
        let targetData = {
            "content": content,
            "images": urlList,
            "public": isPublic
        }
        axios({
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": localStorage.getItem("MEMESA_TOKEN")
            },
            method: "post",
            url: "/api/moments/add",
        }).then(data => {
            if (data.data.Code != 200){
                res(false)
            }
            res(true)
        }).catch(err => {
            console.log(err)
            res(false)
        })
    })
}

export default{
    uploadMoment,
    uploadMomentToDatabase
}