import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import App from './MainPage.vue'
import 'ant-design-vue/dist/antd.less'
import router from './router'
import axios from 'axios'

const app = createApp(App)
app.use(Antd).use(router).mount("#app")

axios.defaults.baseURL = "http://127.0.0.1:8080"
