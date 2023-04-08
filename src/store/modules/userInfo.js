
const state = {
    userInfo: null
}

const mutations = {
    DROP_USERINFO: (state) => {
        state.userInfo = null
    },
    INIT_USERINFO: (state, userInfo) => {
        state.userInfo = userInfo
    }
}

const actions = {
    init_userinfo({ commit }, userInfo) {
        commit("INIT_USERINFO", userInfo)
        console.log("begin commit userinfo")
    },
    drop_userinfo({ commit }) {
        commit("DROP_USERINFO")
    }
}

const store = {
    namespaced: true,
    state,
    mutations,
    actions
}
export default store