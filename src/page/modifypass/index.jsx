import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import useForm  from '../../common/useForm';
import { changePass } from '../../service'
import { getContext } from '../../context'
import '../sign.scss'
import { Icon, Input, message } from 'antd';
message.config({
    top: 30,
    duration: 1.5,
});

const ModifyPass =({history})=>{
    const context = getContext();
    const { state } = context;
    const [ formState, { text, password }] = useForm();
    const [rpassErr,setRPassErr] = useState('');
    const [passErr,setPassErr] = useState('');
    const [pass2Err,setPass2Err] = useState('');
    useEffect(()=>{
        if(!state.loginInfo.token){
            message.error('请先登录');
            setTimeout(() => {
                history.goBack();
            }, 1000);
        }
    },[]);

    const submit = e => {
        e.preventDefault();
        const values = formState.values;
        if(!values.rpass){
            setRPassErr('原密码不能为空');
            return;
        }
        setRPassErr('');

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
        if(pass !== values.pass2){
            setPass2Err('修改密码与确认密码不一致');
            return;
        }
        setPass2Err('');

        const hide = message.loading('发送请求..', 0);
        changePass({raw_password:values.rpass,password:pass}).then(ret=>{
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


    return <div styleName="tabs">
        <div>
            <div styleName="form-item">
                <Input styleName={rpassErr ? 'has-error':''} {...password('rpass')} maxLength={20} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="原密码" />
            </div>
            <div styleName="error">{rpassErr}</div>
            <div styleName="form-item">
                <Input styleName={passErr ? 'has-error':''} {...password('pass')} maxLength={20} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="密码请设置6-16位数字、字母" />
            </div>
            <div styleName="error">{passErr}</div>
            <div styleName="form-item">
                <Input styleName={pass2Err ? 'has-error':''} {...password('pass2')} maxLength={20} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="确认密码" />
            </div>
            <div styleName="error">{pass2Err}</div>
            <button className="btn primary" styleName="btn-block" onClick={submit}> 确认 </button>
            <div styleName="error"></div>
        </div>
    </div>
}

export default ModifyPass
