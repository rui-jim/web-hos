
const state = {
    userInfo: {},
}

const mutations = {
    DROP_USERINFO: (state) => {
        state.userInfo = {}
    },
    INIT_USERINFO: (state, userInfo) => {
        console.log(" store userinfo ", userInfo)
        state.userInfo = userInfo
    }
}

const actions = {
    init_tag({ commit }, userInfo) {
        commit("DROP_USERINFO", userInfo)
    },
    drop_tag({ commit }) {
        commit("INIT_USERINFO")
    }
}

const store = {
    namespaced: true,
    state,
    mutations,
    actions
}
export default store