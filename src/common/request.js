import axios from 'axios'
import { stringify } from 'qs'
import Storage from './storage'
const storage = new Storage('account');

axios.defaults.baseURL = 'http://118.31.61.9:8181/index.php?_t='+Math.random()+'&r=';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

axios.interceptors.request.use(function(config) {
    let data = config.method == "get" ? config.params || {} : config.data || {};
    let account = storage.get();
    if (account && account.token) {
        Object.assign(data,{token:account.token});
    }
    config.data = stringify(data);
    return config;
});

axios.interceptors.response.use(function(res) {
    if (res.data.code == 200) {
        if (res.config.url.search(/\/login\/sign/i) > -1 && res.data.data) {
            storage.save(res.data.data);
        }
        if (res.config.url.search(/\/login\/signout/i) > -1) {
            storage.clear();
        }
    }
    return res.data;
});

export const post = (url, param) => axios.post(url, param);
export const get = (url, param) => axios.get(url, param);
