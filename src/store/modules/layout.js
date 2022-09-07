import { get_menu } from '../../api/index'
const layout = {
    state: {
        collapse: false,
    },
    mutations: {
        CHANGE_COLLAPSE: (state) => {
            state.collapse = !state.collapse
        },

    },
    actions: {
        //  切换展开收起
        changeCollapse: ({ commit }) => {
            commit('CHANGE_COLLAPSE')
        },
    }
}

export default layout