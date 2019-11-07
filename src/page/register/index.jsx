import React,{useState,useRef,useEffect} from 'react'
import { Link } from 'react-router-dom'
import useForm  from '@/common/useForm';
import { registerSer,smsCode } from '@/service'
import { getContext } from '@/context'
import { randomCode } from '@/common/util'
import '../sign.scss'
import { Icon, Input, message } from 'antd';
message.config({
    top: 30,
    duration: 1.5,
});

const Register =({history})=>{
    const [ formState, { text, password }] = useForm();
    const [phoneErr,setPhoneErr] = useState('');
    const [imgErr,setImgErr] = useState('');
    const [codeErr,setCodeErr] = useState('');
    const [passErr,setPassErr] = useState('');
    const [codes,setCodes] = useState(randomCode());
    const canvasRef = useRef(null);
    const {dispatch} = getContext();

    useEffect(() => {
        drawCode(codes);
        return ()=>{
            console.log('destroy')
        };
    },codes);

    // 产生图形验证码
    const drawCode = arr =>{
        const canvas = canvasRef.current;
        const h = canvas.height;
        const w = canvas.width;
        const ctx = canvas.getContext('2d');
        ctx.font = '80px Verdana';
        ctx.textAlign='left';
        ctx.textBaseline='middle';
        ctx.lineWidth = 4;
        ctx.clearRect(0,0,w,h);

        //随机线条
        for(let i=0;i<50;i++){
            let hsl = Math.floor(Math.random()*360);
            let sx = Math.floor(Math.random()*w);
            let sy = Math.floor(Math.random()*h/2);
            let dx = Math.floor(Math.random()*w);
            let dy = Math.floor(Math.random()*(h-h/2)+h/2);
            ctx.save();
            ctx.strokeStyle= 'hsl('+ hsl +',80%,80%)';
            ctx.beginPath();
            ctx.moveTo(sx,sy);
            ctx.lineTo(dx,dy);
            ctx.stroke();
            ctx.restore();
        }
        // 随机字符
        arr.forEach((a,i)=>{
            let hsl = Math.floor(Math.random()*360);
            let rot = (Math.floor(Math.random() * 2) * 2 - 1) * Math.random() * Math.PI/6;
            ctx.save();
            ctx.translate(40 + i* 60, h/2);
            ctx.rotate(rot);
            ctx.fillStyle= 'hsl('+ hsl +',40%,40%)';
            ctx.fillText(a, 0,0);
            ctx.restore();
        });
    };

    const updateCode = () =>{
        setCodes(randomCode());
    };

    const checkPhone = ()=>{
        const values = formState.values;
        if(!values.phone){
            setPhoneErr('手机号不能为空');
            return false;
        }
        if(!/^(13\d|14[57]|15[012356789]|18\d|17[013678])\d{8}$/.test(values.phone)){
            setPhoneErr('请输入正确的手机号');
            return false;
        }
        setPhoneErr('');
        return true;
    }
    const submit = e => {
        e.preventDefault();
        if(!checkPhone()) return;
        const values = formState.values;
        const imgcode = values.imgcode;
        if(!imgcode){
            setImgErr('图形码不能为空');
            return;
        }
        if(imgcode.toLowerCase() != codes.join('').toLowerCase()){
            setImgErr('图形码不正确');
            return;
        }
        setImgErr('');

        if(!values.code){
            setCodeErr('手机验证码不能为空');
            return;
        }
        setCodeErr('');

        const pass = values.pass;
        if(!pass){
            setPassErr('密码不能为空');
            return;
        }
        if(pass.length < 6 || pass.length > 16){
            setPassErr("密码长度必须6-16位");
            return;
        }
        if(!/^(?![0-9]+$)(?![a-zA-Z]+$)[a-zA-Z0-9\-]{6,16}$/.test(pass)){
            setPassErr('密码必须包含数字和字母');
            return;
        }
        setPassErr('');
        const hide = message.loading('发送请求..', 0);
        registerSer(dispatch,{ telephone: values.phone, password: values.pass, sms_code: values.code}).then(ret=>{
            hide();
            const data = ret.data;
            console.log(data);
            if(data.error_code === 0){
                history.push('/login');
            } else {
                message.error(data.msg);
            }
        },err => {
            hide();
            console.log(ret);
            message.error(err.message);
        });
    }
    const getCode = ()=>{
        if(!checkPhone()) return;
        smsCode({ telephone: formState.values.phone }).then(ret=>{
            const data = ret.data;
            if(data.error_code === 0){
                message.success('手机验证码已发送，请注意查收');
            } else {
                message.error(data.msg);
            }
        },err=>{
            message.error(err.message);
        })
    }

    return <div styleName="tabs">
        <div>
            <div styleName="form-item">
                <Input styleName={phoneErr ? 'has-error':''} {...text('phone')} maxLength={20} prefix={<Icon type="mobile" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="手机号" />
            </div>
            <div styleName="error">{phoneErr}</div>
            <div styleName="form-item">
                <Input styleName={imgErr ? 'has-error':''} {...text('imgcode')} maxLength={4} prefix={<Icon type="barcode" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="图形码" />
                <canvas ref={canvasRef} styleName="code-img" onClick={updateCode} />
            </div>
            <div styleName="error">{imgErr}</div>
            <div styleName="form-item">
                <Input styleName={codeErr ? 'has-error':''} {...text('code')} maxLength={6}  prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="手机验证码" />
                <button className="btn" styleName="code-btn" onClick={getCode}>获取验证码</button>
            </div>
            <div styleName="error">{codeErr}</div>
            <div styleName="form-item">
                <Input styleName={passErr ? 'has-error':''} {...password('pass')} maxLength={20} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="密码请设置6-16位数字、字母" />
            </div>
            <div styleName="error">{passErr}</div>
            <button className="btn primary" styleName="btn-block" onClick={submit}> 注册 </button>
            <div styleName="links">
                <p>我同意<Link to="/protocal">服务协议</Link></p>
                <p>已有账号<Link to="/login">立即登录</Link></p>
            </div>
            <div styleName="error"></div>
        </div>
    </div>
}

export default Register
