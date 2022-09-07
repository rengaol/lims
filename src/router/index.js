import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
import Layout from '../layout/index.vue'
const routes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/Login.vue') // 路由懒加载，优化访问性能
    },
    {
        path: '/',
        component: Layout,
        name: 'layout',
        // component: () => import('../layout/index.vue'), // 路由懒加载，优化访问性能
        redirect: '/',

        children: [
            {
                path: '/',
                name: 'home',
                component: () => import('../views/Home.vue'),
                meta: {
                    icon: "HomeFilled",
                    title: "首页"
                }
            },
        ]
    },
    {
        path: '/data',
        component: Layout,
        name: 'data',
        meta: {
            icon: "DataLine",
            title: "数据管理"
        },
        children: [
            {
                path: '/data-table',
                name: 'table',
                component: () => import('../views/Datatable.vue'),
                meta: {
                    icon: "",
                    title: "样本列表"
                }
            },
            {
                path: '/data-timeline',
                name: 'timeline',
                component: () => import('../views/Datatimeline.vue'),
                meta: {
                    icon: "",
                    title: "样本流程"
                }
            },
            {
                path: '/data-site',
                name: 'site',
                component: () => import('../views/Datasite.vue'),
                meta: {
                    icon: "",
                    title: "样本位置"
                }
            },
        ]
    },

    {
        path: '/demo',
        name: 'demo',
        component: () => import('../views/Demo.vue')
    }]
const router = createRouter({
    history: createWebHistory(),
    routes
})

// router.beforeEach((to, from, next) => {
//     // 判断有没有登录
//     const isLogin = localStorage.getItem('token') ? true : false;
//     // 如果当前访问的是登录页面或者注册页面可以让它进入
//     if (to.path == '/login') {
//         next()
//     } else {
//         // 如果isLogin为true表示已经登录了;就让它正常进入就可以 ,如果没登录就让他进入登录页面
//         isLogin ? next() : next('/login')
//     }
// })
export default router