import axios from "axios"
import qs from "qs"

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