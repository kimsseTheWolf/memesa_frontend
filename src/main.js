import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import Antd from 'ant-design-vue'
import App from './MainPage.vue'
import 'ant-design-vue/dist/antd.less'
import router from './router'
import axios from 'axios'
import language from './js/language'

// Globalization Configuration
const i18n = createI18n({
    locale: localStorage.getItem("MEMESA_LANGUAGE"),
    fallbackLocale: language.initializeLanguagePre(),
    messages: {
        en_us: require("@/language/en_us.json"),
        zh_cn: require("@/language/zh_cn.json"),
        zh_tw: require("@/language/zh_tw.json"),
    }
})

const app = createApp(App)
app.use(Antd).use(router).use(i18n).mount("#app")

// axios.defaults.baseURL = "http://127.0.0.1:8080"
