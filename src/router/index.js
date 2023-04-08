import router from "./routes";
import { getToken } from "@/util/tokenUtils";
import { getUserInfo } from "@/api/user/userInfo";
import Cookies from "js-cookie";
import NProgress from "nprogress"
import store from "@/store/index"
NProgress.configure({ showSpinner: false })// NProgress Configuration

console.log("store===========>", store)
router.beforeEach((to, from, next) => {
    NProgress.start()
    if (to.path === "/login") {
        next()
    } else {
        if (getToken()) {
            console.log(" judge = ", store.getters.userInfo === null)
            if (store.getters.userInfo === null) {
                NProgress.set(0.7)
                loadInfo(next, to)
            } else {
                next()
            }
        } else {
            next({ path: '/login' })
        }
    }
})
function loadInfo(next, to) {
    getUserInfo().then(response => {
        if (response.data.userInfo != null) {
            store.dispatch('userInfo/init_userinfo', response.data.userInfo).then(() => {
                console.log("begin next")
                next({ ...to, replace: true })
            })
        } else {
            let obj = { name: '匿名者 记得完善自己的信息哦！' }
            store.dispatch('userInfo/init_userinfo', obj).then(() => {
                console.log("begin next")
                next({ ...to, replace: true })
            })
        }

    })
}
router.afterEach(() => {
    NProgress.done()
})
export default router;
