import { createI18n } from "vue-i18n"
import { useI18n } from "vue-i18n"

const i18n = createI18n({
    locale: localStorage.getItem("MEMESA_LANGUAGE"),
    fallbackLocale: initializeLanguagePre(),
    messages: {
        en_us: require("@/language/en_us.json"),
        zh_cn: require("@/language/zh_cn.json"),
        zh_tw: require("@/language/zh_tw.json"),
    },
    legacy: false
})

// const translation = useI18n()

function initializeLanguagePre(){
    if (localStorage.getItem("MEMESA_LANGUAGE") == undefined || localStorage.getItem("MEMESA_LANGUAGE") == null){
        localStorage.setItem("MEMESA_LANGUAGE", "zh_cn")
        return "zh_cn"
    }
    else{
        return localStorage.getItem("MEMESA_LANGUAGE")
    }
}

// function t(data){
//     return translation.t(data)
// }

export default{
    initializeLanguagePre,
    i18n,
    
}