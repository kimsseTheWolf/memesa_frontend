import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import App from './MainPage.vue'
import 'ant-design-vue/dist/antd.less'
import router from './router'
import axios from 'axios'
import { VueI18n } from 'vue-i18n'

const i18n = new VueI18n({
    locale: localStorage.getItem("MEMESA_LANG"),
    messages: {
        en : require("@/language/en_us"),
        tw : require("@/language/zh_tw"),
        zh : require("@/language/zh_cn")
    }
})

const app = createApp(App)
app.use(Antd).use(router).mount("#app")

// axios.defaults.baseURL = "http://127.0.0.1:8080"
