import Axios from "../utils/request";
import qs from "qs";
//登录
export const get_token = (data) => {
    return Axios({
        method: 'POST',
        url: '/api/users/login',
        data: qs.parse(data)
    })
}
//用户信息
export const get_user = (data) => {
    return Axios({
        method: 'get',
        url: '/api/user',
        data: qs.parse(data)
    })
}
//菜单
export const get_menu = (data) => {
    return Axios({
        method: 'get',
        url: '/api/menu',
        data: qs.parse(data)
    })
}
//获取表格数据
export const get_sample = (data,method) => {
    return Axios({
        method: method,
        url: '/api/sample',
        data: qs.parse(data)
    })
}
// //添加表格数据
// export const get_Addsample = (data) => {
//     return Axios({
//         method: 'post',
//         url: '/api/sample',
//         data: qs.parse(data)
//     })
// }
