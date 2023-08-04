import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'


const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 10000
})


service.interceptors.request.use(
  config => {
  

    if (store.getters.token) {
      config.headers['Authorization'] = `Bearer ${store.getters.token}`      // config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {

    console.log(error) // for debug
    return Promise.reject(error)
  }
)

//响应拦截
service.interceptors.response.use(

  response => {
    console.log('response.data',response.data);
    const { success , message} = response.data

    // console.log('success');
    // console.log('data');


    

       if(success){
            return  response.data 
       }else{
         Message.error({ type: 'error', message })
         return Promise.reject(new Error(message))
       }

       },
        error => {
          Message.error(message)
          return Promise.reject(error)
        }
)   

export default service
