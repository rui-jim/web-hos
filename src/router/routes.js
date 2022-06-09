import Vue from 'vue'
import Router from 'vue-router'
import Layout from "@/components/layout/index"
import patients from "./modules/patients.js"
import staffs from "./modules/staffs.js"
import treat from "./modules/treat.js"

Vue.use(Router)

export default new Router({
  mode: "history",
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: Layout,
      redirect: "/index",
      hidden: true,
      children: [
        {
          path: "index",
          name: "mindexy1",
          component: () => import("@/view/welcome/index")
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import("@/view/login/index"),
      hidden: true,
    },
    staffs,
    patients,
    treat
  ]
})

