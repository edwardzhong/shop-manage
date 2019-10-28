import React,{useState,useEffect} from 'react'
import useForm  from '../../common/useForm';
import { smsCode, changePass} from '../../service'
import { getContext } from '../../context'
import '../sign.scss'
import { Tabs, Icon, Input, Steps, message } from 'antd';
const { TabPane } = Tabs;
const { Step } = Steps;
message.config({
    top: 30,
    duration: 1.5,
});
  
const GetPass = ({history})=>{
	const [ formState, { text, password }] = useForm();
    const { state,dispatch } = getContext();
    const [errInfo,setErrInfo] = useState({ phone:false,code:false,pass:false,pass2:false});
    const [curr,setCurr] = useState(0);

    useEffect(()=>{
        if(!state.loginInfo.token){
            message.error('请先登录');
            setTimeout(() => {
                history.goBack();
            }, 2000);
        }
    },[]);
    
    const handleChange = i =>{
        if(i >= curr) return;
        setCurr(i);
    };

    const handleOne = ()=>{
        const values = formState.values;
        if(!values.phone){
            setErrInfo(Object.assign({...errInfo},{phone:true}));
            message.error('手机号不能为空');
            return;
        }
        setErrInfo(Object.assign({...errInfo},{phone:false}));
        setCurr(1);
    };
    const handleTwo = ()=>{
        const values = formState.values;
        if(!values.code){
            setErrInfo(Object.assign({...errInfo},{code:true}));
            message.error('验证码不能为空');
            return;
        }
        setErrInfo(Object.assign({...errInfo},{code:false}));
        setCurr(2);
    };
    const checkPhone = ()=>{
        const values = formState.values;
        if(!values.phone){
            setErrInfo(Object.assign({...errInfo},{phone:true}));
            message.error('手机号不能为空');
            return false;
        }
        if(!/^(13\d|14[57]|15[012356789]|18\d|17[013678])\d{8}$/.test(values.phone)){
            message.error('请输入正确的手机号');
            return false;
        }
        setErrInfo(Object.assign({...errInfo},{phone:false}));
        return true;
    }

    const getCode = ()=>{
        if(!checkPhone()) return;
        smsCode({ telephone: formState.values.phone }).then(ret=>{
            const data = ret.data;
            if(data.error_code === 0){
                message.success('手机验证码已发送，请注意查收');
            } else {
                message.error(data.msg.join(''));
            }
        },err=>{
            message.error(err.message);
        })
    }

    const submit = e =>{
        e.preventDefault();
        const values = formState.values;
        const pass = values.pass;
        if(!pass){
            setErrInfo(Object.assign({...errInfo},{pass:true}));
            message.error('新密码不能为空');
            return;
        }
        if(pass.length < 6 || pass.length > 16){
            setErrInfo(Object.assign({...errInfo},{pass:true}));
            message.error("密码长度必须6-16位");
            return;
        }
        if(!/^(?![0-9]+$)(?![a-zA-Z]+$)[a-zA-Z0-9\-]{6,16}$/.test(pass)){
            setErrInfo(Object.assign({...errInfo},{pass:true}));
            message.error('密码必须包含数字和字母');
            return;
        }
        setErrInfo(Object.assign({...errInfo},{pass:false}));
        if(values.pass2 != pass){
            setErrInfo(Object.assign({...errInfo},{pass2:true}));
            message.error('确认密码和新密码不一致');
            return;
        }
        setErrInfo(Object.assign({...errInfo},{pass2:false}));
        const hide = message.loading('发送请求..', 0);
        changePass({password:pass}).then(ret=>{
            hide();
            const data = ret.data;
            if(data.error_code === 0){
                setCurr(3);
                history.goBack();
            } else {
                message.error(data.msg.join(''));
            }
        },err=>{
            hide();
            message.error(err.message);
        })
    };
    
    return <div styleName="step-tabs">
        <Steps current={curr} onChange={handleChange}>
            <Step title="填写手机号" />
            <Step title="验证信息" />
            <Step title="充值密码" />
        </Steps>
        {/* <Divider /> */}
        <div>
        <Tabs tabBarStyle={{display:'none'}} activeKey={'' + curr}>
            <TabPane tab="" key="0">
                <div styleName="step">
                    <div styleName="form-item">
                        <label>手机号：</label>
                        <Input styleName={errInfo.phone ? 'has-error':''} {...text('phone')} maxLength={20} prefix={<Icon type="mobile" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="手机号" />
                    </div>
                    <button className="btn primary" styleName="next" onClick={handleOne}>下一步</button>
                </div>
            </TabPane>
            <TabPane tab="" key="1">
                <div styleName="step">
                    <div styleName="form-item">
                        <p>您的手机号：{formState.values.phone}</p>
                    </div>
                    <div styleName="form-item">
                        <label>验证码：</label>
                        <Input styleName={errInfo.code ? 'has-error':''} {...text('code')} maxLength={6}  prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="手机验证码" />
                        <button className="btn" styleName="code-btn" onClick = { getCode }>获取验证码</button>
                    </div>
                    <button className="btn primary" styleName="next" onClick={handleTwo}>下一步</button>
                </div>
            </TabPane>
            <TabPane tab="" key="2">
                <div styleName="step">
                    <div styleName="form-item">
                        <label>新密码：</label>
                        <Input styleName={errInfo.pass ? 'has-error':''} {...password('pass')} maxLength={20} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="密码请设置6-16位数字、字母" />
                    </div>
                    <div styleName="form-item">
                        <label>确认密码：</label>
                        <Input styleName={errInfo.pass2 ? 'has-error':''} {...password('pass2')} maxLength={20} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="再次输入密码" />
                    </div>
                    <button className="btn primary" styleName="next" onClick={submit}>下一步</button>
                </div>
            </TabPane>
            </Tabs>
        </div>
    </div>
}

export default GetPass