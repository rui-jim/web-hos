import router from "./routes";
import { getToken } from "@/util/tokenUtils";
import Cookies from "js-cookie";
import NProgress from "nprogress"
import store from "@/store/index"
NProgress.configure({ showSpinner: false })// NProgress Configuration


router.beforeEach((to, from, next) => {
    NProgress.start()
    if (to.path === "/login") {
        next()
    } else {
        if (getToken()) {
            if (store) {
                loadInfo()
            } else {
                next()
            }
            next()
        } else {
            next({ path: '/login' })
        }
    }
})
export function loadInfo() {

}
router.afterEach(() => {
    NProgress.done()
})
export default router;
