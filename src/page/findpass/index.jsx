import React,{ useState } from 'react'
import { Link } from 'react-router-dom'
import useForm  from '@/common/useForm';
import { findPass,smsCode } from '@/service'
import '../sign.scss'
import { Icon, Input, message } from 'antd';
message.config({
    top: 30,
    duration: 1.5,
});

const FindPass =({history})=>{
    const [ formState, { text, password }] = useForm();
    const [phoneErr,setPhoneErr] = useState('');
    const [codeErr,setCodeErr] = useState('');
    const [passErr,setPassErr] = useState('');
    const [pass2Err,setPass2Err] = useState('');
    const values = formState.values;
    const checkPhone = ()=>{
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
        if(values.pass2 !== pass){
            setPass2Err('修改密码与确认密码不一致');
            return;
        }
        setPass2Err('');

        const hide = message.loading('发送请求..', 0);
        findPass({ telephone: values.phone, password:pass, sms_code:values.code }).then(ret=>{
            hide();
            const data = ret.data;
            if(data.error_code === 0){
                history.goBack();
            } else {
                message.error(data.msg);
            }
        },err=>{
            hide();
            message.error(err.message);
        })
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
                <Input styleName={codeErr ? 'has-error':''} {...text('code')} maxLength={6}  prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="手机验证码" />
                <button className="btn" styleName="code-btn" onClick={getCode}>获取验证码</button>
            </div>
            <div styleName="error">{codeErr}</div>
            <div styleName="form-item">
                <Input styleName={passErr ? 'has-error':''} {...password('pass')} maxLength={20} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="密码请设置6-16位数字、字母" />
            </div>
            <div styleName="error">{passErr}</div>
            <div styleName="form-item">
                <Input styleName={pass2Err ? 'has-error':''} {...password('pass2')} maxLength={20} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="确认密码" />
            </div>
            <div styleName="error">{pass2Err}</div>
            <button className="btn primary" styleName="btn-block" onClick={submit}> 确认 </button>
            <div styleName="links center">
                <Link to="/login">返回登录</Link>
            </div>
            <div styleName="error"></div>
        </div>
    </div>
}

export default FindPass
