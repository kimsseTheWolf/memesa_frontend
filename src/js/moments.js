import axios from "axios"
import qs from 'qs'

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
        console.log(fileList.length)
        if (fileList.length == 0){
            console.log("No pictures to commit, skipping...")
            res({status: true, data: ["0", "0", "0", "0"]})
        }
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
        console.log("Upload list: ", urlList)
        let targetFormData = new FormData()
        targetFormData["content"] = content
        targetFormData["imgaes"] = urlList
        targetFormData["public"] = isPublic
        
        let targetData = {
            "content": content,
            "images": qs.stringify(urlList),
            "public": isPublic
        }
        console.log(qs.stringify({
            images: urlList,
            content: content,
            isPublic: isPublic
        }))
        axios({
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": localStorage.getItem("MEMESA_TOKEN")
            },
            method: "post",
            url: "/api/moments/add",
            data: qs.stringify({
                images: urlList,
                content: content,
                isPublic: isPublic
            }, {indices: false})
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

function getUserMoments(id){
    return new Promise((res, rej) => {
        let targetData = {
            "id": id
        }
        axios({
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": localStorage.getItem("MEMESA_TOKEN")
            },
            method: "post",
            url: "/api/moments/getMyMoments",
            data: qs.stringify(targetData)
        }).then(data => {
            if (data.data.Code != 200){
                res({status: false, data: undefined})
            }
            res({status: true, data: data})
        }).catch(err => {
            console.log(err)
            res({status: false, data: undefined})
        })
    })
}

export default{
    uploadMoment,
    uploadMomentToDatabase,
    getUserMoments
}