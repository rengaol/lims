
const tabs = {
    state: {
        menuItems: [{ path: '/', name: '首页' }],
        tab: ''
    },
    mutations: {
        MENUITEM: (state, tab) => {
            state.tab = tab
        }
    },
    actions: {
        //
        removeMenuItem: ({ commit }, tab) => {
            commit('MENUITEM', tab)
        }
    }
}
export default tabs