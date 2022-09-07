const getters = {
    collapse: (state) => state.layout.collapse,
    token: (state) => state.login.token,
    name: (state) => state.login.name,
    menuItems: (state) => state.tabs.menuItems,
    
}
export default getters