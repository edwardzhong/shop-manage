import * as qiniu from "qiniu-js";
import { getQiniuToken } from "@/service";
import { compressPicture, dataURLtoBlob } from './util'

const config = {
    useCdnDomain: true,
    region: qiniu.region.z2
};
const putExtra = {
    fname: "",
    params: {},
    mimeType: ["image/png", "image/jpeg", "image/jpg", "image/gif" ,"video/mp4"]
};
const upload = (file, opt={}) => {
    opt.type = opt.type || 'image';
    return new Promise((resolve,reject)=>{
        if (!file) {
            return reject({ code: -1, message: "file not exist" });
        }
    
        if (opt.type == 'image' &&  ["image/png", "image/jpeg", "image/jpg", "image/gif"].indexOf(file.type) === -1) {
            return reject({ code: -1, message: "请上传正确格式的图片" });
        }
    
        const size = opt.size || 2;
        const fileSize = Math.floor(file.size / 1024);
        if (fileSize > 1024 * size) {
            return reject({ code: -1, message: "上传大小不能超过" + size + "M" });
        }

        if(!window.FileReader) {
            return reject({ code: -1, message: "浏览器不支持上传" });
        }
    
        const reader = new FileReader();
        reader.onloadend = e => {
            const img = new Image();
            img.src = e.target.result;
            img.onload = function() {
                const base64 = compressPicture(img, 400);
                getQiniuToken().then(res => {
                    if (!res.data.data.token) {
                        return reject({ code: -1, data: res.data, message: "获取token失败" });
                    }
                    const observable = qiniu.upload( dataURLtoBlob(base64), new Date().getTime() + '' + Math.floor(Math.random()*10000), res.data.data.token , null, config );
                    // (onProgress, onError, onComplate)
                    observable.subscribe(()=>{}, err => {
                        reject(err);
                    }, ret => {
                        ret.domain_name = res.data.data.domain_name;
                        resolve(ret)
                    });
                },reject);
            };
            img.onerror = reject;
        };
        reader.readAsDataURL(file);
    });
};

export default upload;
