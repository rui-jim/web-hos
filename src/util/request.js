import axios from "axios"
import store from "../store"
import { getToken } from "@/util/tokenUtils"

const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 40000000
})

service.interceptors.request.use(config => {
  config.headers["token"] = getToken()
  return config
}, error => {
  console.log(error) // for debug
  Promise.reject(error)
})
service.interceptors.response.use(response => {
  return response.data
})
export default service