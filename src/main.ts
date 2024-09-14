import './assets/main.css'

import {createApp} from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from "@/router";
// 引入和风天气图标
import 'qweather-icons/font/qweather-icons.css'

// 引入Markdown-it相关样式
import 'highlight.js/styles/default.css'
import 'github-markdown-css/github-markdown-light.css'
import '@mdi/font/css/materialdesignicons.css';

let app = createApp(App);
app.use(ElementPlus)
app.use(router)
app.mount('#app')
