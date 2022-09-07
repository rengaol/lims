import { get_token, get_user } from '../../api/index'
const login = {
    state: {
        token:localStorage.getItem('token') || '',
        id: localStorage.getItem('id') || '',
        name:localStorage.getItem('name') || '',//用户信息
        password:localStorage.getItem('password') || '',
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
            localStorage.setItem('token', token)
        },
        SET_ID: (state, id) => {
            state.id = id
           localStorage.setItem('id', id)
        },
        SET_NAME: (state, name) => {
            state.name = name
            localStorage.setItem('name', name)
        },
        SET_PASSWORD: (state, password) => {
            state.password = password
            localStorage.setItem('password', password)
        }
    },
    actions: {
        //登录
        Login({ commit }, user) {
            return new Promise((resolve, reject) => {
                get_token(user).then((res) => {
                    // if (res.data) {
                        commit('SET_TOKEN', res.data.token)
                        resolve(res)
                    // } else {
                        // resolve(res.data.message)
                    // }
                }).catch((error) => {
                    reject(error)
                })
            })
        },
        //获取用户信息
        GetUserInfo({ commit }) {
            return new Promise((resolve, reject) => {
                get_user().then((res) => {
                    commit('SET_NAME', res.data.name)
                    commit('SET_ID', res.data._id)
                    resolve(res)
                }).catch((error) => {
                    reject(error)
                })
            })
        },
        //退出登录
        Logout({ commit }) {
            get_logout().then((res) => {
                commit('SET_TOKEN', '')
                window.localStorage.clear()
            })
        }
    }

}
export default login