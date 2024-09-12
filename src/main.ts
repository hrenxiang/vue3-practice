import './assets/main.css'

import {createApp} from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from "@/router";
// 引入和风天气图标
import 'qweather-icons/font/qweather-icons.css'

import 'highlightjs/styles/default.css'
import 'github-markdown-css/github-markdown.css'
import '@mdi/font/css/materialdesignicons.css';

let app = createApp(App);
app.use(ElementPlus)
app.use(router)
app.mount('#app')
