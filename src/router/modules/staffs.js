// import my1 from "@/view/my/my1"
import Layout from "@/components/layout/index"



const staffs={
    path:"/staffs",
    name:"staffs",
    meta:{title:"职工管理"},
    component:Layout,
    hidden:false,
    children:[
        {
            path:"doctors",
            name:"doctors",
            meta:{title:"医生管理"},
            component:()=>import("@/view/staffs/doctors/index")
        },
        {
            path:"title",
            name:"title",
            meta:{title:"职位管理"},
            component:()=>import("@/view/staffs/title/index")
        },
        {
            path:"depts",
            name:"depts",
            meta:{title:"部门管理"},
            component:()=>import("@/view/staffs/depts/index")
        }
    
    ],
    
}

export default staffs;