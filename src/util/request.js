import axios from "axios"
import store from "../store"
// import {getToken} from "@/utils/auth"

const service = axios.create({
    baseURL:process.env.BASE_API,
    timeout:40000000
})

service.interceptors.request.use(config=>{
  config.headers["token"]="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJteSIsImlhdCI6MTY1NDUxNTgwMywiZXhwIjoxNjU0Nzc1MDAzLCJuYW1lIjoidXNlciJ9.-mtS31AOs_IsHMKvE-pFsfAcFw8Y-dLpQONZMTOaVFw"
  return config
},error => {
    // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})
service.interceptors.response.use(response=>{
    return response.data
})
export default service