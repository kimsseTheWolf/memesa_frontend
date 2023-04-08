import { createApp } from 'vue'
import language from './js/language'
import Antd from 'ant-design-vue'
import App from './MainPage.vue'
import 'ant-design-vue/dist/antd.less'
import router from './router'
import axios from 'axios'

// Globalization Configuration

const app = createApp(App)
app.use(Antd).use(router).use(language.i18n).mount("#app")

// axios.defaults.baseURL = "http://127.0.0.1:8080"
