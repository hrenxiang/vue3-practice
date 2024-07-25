import {createRouter, createWebHistory} from 'vue-router'
import Home from '@/views/Home.vue'
import AboutDetail from "@/views/AboutDetail.vue";

const router = createRouter({
    // history 模式 不带 #
    history: createWebHistory(),
    // hash 模式 带 #
    // history: createWebHashHistory(),
    routes: [
        {
            // name可选：给路由规则命名
            name: 'zhuye',
            path: '/home',
            component: Home
        },
        {
            name: 'guanyu',
            path: '/about',
            // component: About,
            children: [
                {
                    name: 'guanyudetail',
                    path: 'detail',
                    component: AboutDetail
                }
            ]
        }
    ]
})
export default router