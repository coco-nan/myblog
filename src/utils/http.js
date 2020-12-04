import axios from 'axios'

let instance = axios.create({
    timeout: 1000 * 5,
    baseURL:'http://localhost:3000/api/'
});

// instance.defaults.withCredentials = true;
//axios全局配置
// instance.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';

// 请求拦截
instance.interceptors.request.use(
    config => {
        //每次发送请求之前先去判断localStorge中有没有token，
        //如果有，在http请求头加上token，后台会去判断
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = token
            // instance.defaults.headers.common['Authorization'] = token;(刷新不加不上去)
        }
        return config
    }

)

// 响应拦截
instance.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return Promise.resolve(response.data)
        } else {
            return Promise.reject(response);
        }
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
)

export default instance;