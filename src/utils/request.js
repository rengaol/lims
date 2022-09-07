import Axios from 'axios'
import qs from 'qs'
import { ElMessage, ElMessageBox } from 'element-plus'
import 'element-plus/es/components/message-box/style/index'
import 'element-plus/es/components/message/style/index'
import router from '../router'
import store from '../store'
Axios.defaults.baseURL = import.meta.env.VITE_APP_BASEAPI
console.log(Axios.defaults.baseURL)
const redirectLogin = function redirectLogin() {
    router.push({
        name: 'login',
        query: {
            redirect: router.currentRoute.value.fullPath
        }
    })

}
Axios.defaults.timeout = 50000;
Axios.defaults.withCredentials = true;


Axios.interceptors.request.use(config => {
    console.log(router.currentRoute.value.fullPath, '计划大纲和')
    if (config.method === 'post') {
        if (config.responseType === 'form') {
            const data = qs.parse(config.data);
            config.headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
            };
            config.data = qs.stringify({
                ...data,
            })
        } else {
            const data = qs.parse(config.data);
            config.headers = {
                'Content-Type': 'application/json',
            };
        }
    } else if (config.method === 'get') {
        config.params = { ...config.data }
    }
    let token = localStorage.getItem('token');
    if (token) {

        config.headers.Authorization = 'Bearer ' + token;
    }


    return config;
}, error => {
    return Promise.reject(error);
})

Axios.defaults.validateStatus = status => {
    return /^(2|3)\d{2}$/.test(status);
}

Axios.interceptors.response.use((response) => {
    return response
}, async (error) => {
    const { response } = error;
    if (response) {
        const { status } = response
        if (status == 400) {
            // ElMessage.error('请求参数错误')
            ElMessage.error('Request parameter error')
        } else if (status == 401) {
            if (!store.state.login.token) {
                redirectLogin()
                return Promise.reject(error)
            }
            redirectLogin();

        } else if (status == 403) {
            // ElMessage.error('没有权限，请联系管理员')
            ElMessage.error(`${response.data.message}`)
        } else if (status == 404) {
            // ElMessage.error('请求资源不存在');
            ElMessage.error(`${response.data.message}`)
            // router.push('/404')

        } else if (status == 429) {
            // ElMessage.error('请求资源不存在');
            ElMessage.error(`${response.data.message}`)
            // router.push('/404')
        } else if (404 < status < 500) {
            ElMessageBox.alert(response.data.message, error.message)
        } else if (status >= 500) {
            // ElMessage.error('服务端错误，请联系管理员')
            ElMessage.error('Server error, please contact the administrator')
        } else if (error.request) {
            // ElMessage.error('请求超时，请刷新重试')
            ElMessage.error(`${response.data.message}`)
        } else {
            // ElMessage.error(`请求失败:${error.message}`)
            ElMessage.error(`${response.data.message}`)
        }
        return Promise.reject(error)
    }
})

export default Axios
