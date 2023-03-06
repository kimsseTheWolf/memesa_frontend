import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import App from './MainPage.vue'
import 'ant-design-vue/dist/antd.less'
import router from './router'

const app = createApp(App)
app.use(Antd).use(router).mount("#app")
