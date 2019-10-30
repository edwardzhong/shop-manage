import axios from 'axios'
import config from '../config/app'

axios.defaults.baseURL = config.url;
axios.defaults.timeout = 20000;
axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

axios.interceptors.request.use(function(config) {
    const info = localStorage.getItem("loginInfo");
    const params = config.method == "get" ? config.params || {} : config.data || {};
    if (info) {
        const obj = JSON.parse(info);
        if(obj.token){
            config.headers.Authorization = 'Bearer ' + obj.token;
        }
    }
    params._t = Math.random();
    return config;
});

// //response拦截器
// axios.interceptors.response.use(res => {
//     if (res.status === 200) {
//         if (res.headers.authorization) {
//             localStorage.setItem('token', res.headers.authorization);
//         }
//         if (res.config.url.search(/\/logout/i) > -1) {
//             localStorage.removeItem('token');
//         }
//     }
//     return res.data;
// });

export const get = (url, param) => axios.get(url, { params: param });
export const post = (url, param) => axios.post(url, param);
export const put = (url, param) => axios.put(url, param);
export const del = (url, param) => axios.delete(url, {data: param});
