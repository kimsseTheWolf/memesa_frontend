function initializeLanguagePre(){
    if (localStorage.getItem("MEMESA_LANGUAGE") == undefined || localStorage.getItem("MEMESA_LANGUAGE") == null){
        localStorage.setItem("MEMESA_LANGUAGE", "zh_cn")
        return "zh_cn"
    }
    else{
        return localStorage.getItem("MEMESA_LANGUAGE")
    }
}

export default{
    initializeLanguagePre
}