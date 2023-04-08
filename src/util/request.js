import axios from "axios"
import store from "../store"
import { getToken } from "@/util/tokenUtils"

const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 40000000
})

service.interceptors.request.use(config => {
  console.log("FFFFFFFFFFFFF")
  config.headers["token"] = getToken()
  return config
}, error => {
  console.log(error) // for debug
  Promise.reject(error)
})
service.interceptors.response.use(
  response => {
    console.log("interceptore reponse ", response)
    return response.data
  })
// service.interceptors.response.use(response => {
//   console.log("interceptore reponse ", response)
//   return response
// })
export default service