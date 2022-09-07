import { createStore } from "vuex";
import getters from './getters.js';
import layout from './modules/layout'
import login from './modules/login'
import tabs from './modules/tabs'
const store = new createStore({
    modules: {
        layout,
        login,
        tabs
    },
    getters,
});

export default store;