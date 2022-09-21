export default {
    state: {
        density: null,
        parameter: null
    },
    getters: {
        getDensity(state){// 对应着上面state
            return state.density
        },
        getParameter(state){// 对应着上面state
            return state.parameter
        }
    },
    mutations: {
        setDensity(state,density) {
            state.density = density
        },
        setParameter(state,parameter) {
            state.parameter = parameter
        }

    },
    actions: {
    }
}
