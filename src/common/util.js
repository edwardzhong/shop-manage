
/**
 * deep copy
 * @param {Object} p 
 * @param {Object} c 
 */
function deepCopy(p, c) {
    if (null == p || "object" != typeof p) return p;
    var c = c || {};
    for (var i in p) {
        if (typeof p[i] === 'object') {
            c[i] = (p[i].constructor === Array) ? [] : {};
            deepCopy(p[i], c[i]);
        } else if (typeof p[i] === 'function') {
            c[i] = p[i].prototype.constructor;
        } else c[i] = p[i];
    }
    return c;
}

/**
 * stringFormat('xx$1x $3 xxx$2', 11,22,33)
 * @param {String} str 
 * @param  {...any} args 
 */
function stringFormat(str, ...args) {
    // args = args.flat();// Array can be Array, because flat function
    return str.replace(/\$(\d+)/g, function (match, num) {
        let m = args[parseInt(num, 10) - 1];
        return m ? ('' + m) : match;
    });
}

function timeStr(d){
    const M = ('0' + (d.getMonth()+1)).slice(-2);
    const D = ('0' + d.getDate()).slice(-2);
    const date = `${d.getFullYear()}-${M}-${D}`;
    const time = ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + ":" + ("0" + d.getSeconds()).slice(-2);
    return `${date} ${time}`;
}

function formatTime (str) {
    const d = new Date(str);
    const n = new Date();
    const r = n - d;
    const dateStr = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    const timeStr = ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + ":" + ("0" + d.getSeconds()).slice(-2);
    const just = 1000 * 10;
    const min = 1000 * 60;
    const hour = 1000 * 60 * 60;
    const day = hour * 24;
    const month = day * 30;
    let i = timeStr;
    
    if (r < day && n.getDate() - d.getDate() == 0) {
        if (r < just) {
            i = "刚刚";
        } else if (r < min) {
            i = Math.floor(r / 1000) + "秒前";
        } else if (r < hour) {
            i = Math.floor(r / min) + "分钟前";
        } else if (r < hour * 24) {
            i = Math.floor(r / hour) + "小时前";
        }
    } else if (r < day * 2 && new Date(n.getTime() - day).getDate() - d.getDate() == 0) {
        i = `昨天 ${timeStr}`;
    } else if (r < day * 3 && new Date(n.getTime() - day *2).getDate() - d.getDate() == 0) {
        i = `前天 ${timeStr}`;
    } else if (r < day * 8) {
        i = Math.floor(r / day) + "天前";
    } else if (r < day * 30) {
        i = dateStr;
    } else if (r < month * 12) {
        i = Math.floor(r / month) + "个月前";
    } else if (r < day * 365 * 5) {
        i = Math.floor(r / (day * 365)) + "年前";
    } else {
        i = `${dateStr} ${timeStr}`;
    }
    return i;
};

/**
 * html encode
 * html转码
 * @param  {String} str [description]
 * @return {String}     [description]
 */
function htmlEncode(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/ /g, '&nbsp;')
        .replace(/\'/g, '&#39;')
        .replace(/\"/g, '&quot;');
}

/**
 * html decode
 * html解码
 * @param  {String} str [description]
 * @return {String}     [description]
 */
function htmlDecode(str) {
    if (!str) return '';
    return str.replace(/&amp;/g, "&")
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&nbsp;/g, ' ')
        .replace(/&#39;/g, '\'')
        .replace(/&quot;/g, '\"');
}

/**
 * Intercept the first n strings
 * @param {String} str 
 * @param {Number} n 
 */
function getContentSummary(str, n) {
    let replaceHtmlTags = str => str.replace(/<\s*\/?\s*\w+[\S\s]*?>/g, ''),//过滤掉html标签
        pattern = /^[a-zA-Z0-9_\u0392-\u03c9\u0410-\u04F9]+/,
        ret = '', count = 0, m;
    str = replaceHtmlTags(htmlDecode(str));

    while (str.length) {
        if ((m = str.match(pattern))) {//拉丁文字
            count++;
            ret += m[0];
            str = str.substr(m[0].length);
        } else {
            if (str.charCodeAt(0) >= 0x4E00) {//中日韩文字
                count++;
            }
            ret += str.charAt(0);
            str = str.substr(1);
        }
        if (count > n) {
            ret += '...';
            break;
        }
    }
    return ret;
}

/**
 * Count the number of string
 * 计算字符串文字数量(拉丁中日韩字符)
 * @param  {String} str
 * @return {Number} string number
 */
function wordCount(str) {
    var pattern = /[a-zA-Z0-9_\u0392-\u03c9\u0410-\u04F9]+|[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af]+/g;
    var m = str.match(pattern);
    var count = 0;
    if (m === null) return count;
    for (var i = 0; i < m.length; i++) {
        if (m[i].charCodeAt(0) >= 0x4E00) {
            count += m[i].length;
        } else {
            count += 1;
        }
    }
    return count;
}

/**
 * 压缩图像
 * @param {Image} img 
 * @param {Number} size 
 */
function compressPicture(img, size) {
    const canvas = document.createElement("canvas"),
        ctx = canvas.getContext("2d"),
        w = img.width,
        h = img.height;
    if (Math.max(w, h) > size) {
        if (w > h) {
            canvas.width = size;
            canvas.height = (h / w) * size;
        } else {
            canvas.height = size;
            canvas.width = (w / h) * size;
        }
    }
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/jpeg");
}

/**
 * base64 装换为 Blob 对象
 * @param {String} base64 
 */
function dataURLtoBlob(base64) {
    var arr = base64.split(','), 
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
}

//产生随机数字字母
function randomCode (l = 4) {
    let arr = [];
    const codes ='01234567890123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    while(arr.length < l){
        let i = Math.floor(Math.random()*codes.length);
        if(arr.indexOf(i) < 0){
            arr.push(i);
        }
    }
    return arr.map(i => codes[i]);
}
export {
    deepCopy,
    stringFormat,
    timeStr,
    formatTime,
    htmlEncode,
    htmlDecode,
    getContentSummary,
    wordCount,
    compressPicture,
    dataURLtoBlob,
    randomCode
};
