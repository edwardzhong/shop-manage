import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import useForm  from '../../common/useForm';
import { getContext } from '../../context'
import '../sign.scss'
import UserLayout from '../../layout/user'
import { Tabs, Icon, Input, Steps, message } from 'antd';
const { TabPane } = Tabs;
const { Step } = Steps;
message.config({
    top: 30,
    duration: 1.5,
});
  
const GetPass = ({history})=>{
	const [ formState, { text, password }] = useForm();
    const { dispatch } = getContext();
    const [nameErr,setNameErr] = useState('');
    const [codeErr,setCodeErr] = useState('');
    const [passErr,setPassErr] = useState('');
    const [pass2Err,setPass2Err] = useState('');
    
    const [curr,setCurr] = useState(0);
    const handleChange = i =>{
        if(i >= curr) return;
        setCurr(i);
    };

    const handleOne = ()=>{
        const values = formState.values;
        if(!values.name){
            message.error('手机号不能为空');
            return;
        }
        setCurr(1);
    };
    const handleTwo = ()=>{
        const values = formState.values;
        if(!values.code){
            message.error('验证码不能为空');
            return;
        }
        setCurr(2);
    };
    const submit = e =>{
        e.preventDefault();
        const values = formState.values;
        const pass = values.pass;
        if(!pass){
            message.error('新密码不能为空');
            return;
        }
        if(pass.length < 6 || pass.length > 16){
            message.error("密码长度必须6-16位");
            return;
        }
        if(!/^(?![0-9]+$)(?![a-zA-Z]+$)[a-zA-Z0-9\-]{6,16}$/.test(pass)){
            message.error('密码必须包含数字和字母');
            return;
        }
        if(values.pass2 != pass){
            message.error('确认密码和新密码不一致');
            return;
        }
        setCurr(3);
        setTimeout(() => {
            history.push('/login');      
        }, 500);
    };
    
    return <UserLayout tabName="找回登录密码">
        <div styleName="step-tabs">
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
                            <Input styleName={nameErr ? 'has-error':''} {...text('name')} maxLength={20} prefix={<Icon type="mobile" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="手机号" />
                        </div>
                        <button className="btn primary" styleName="next" onClick={handleOne}>下一步</button>
                    </div>
                </TabPane>
                <TabPane tab="" key="1">
                    <div styleName="step">
                        <div styleName="form-item">
                            <p>您的手机号：186****1234</p>
                        </div>
                        <div styleName="form-item">
                            <label>验证码：</label>
                            <Input styleName={codeErr ? 'has-error':''} {...text('code')} maxLength={4}  prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="手机验证码" />
                            <button className="btn" styleName="code-btn">获取验证码</button>
                        </div>
                        <button className="btn primary" styleName="next" onClick={handleTwo}>下一步</button>
                    </div>
                </TabPane>
                <TabPane tab="" key="2">
                    <div styleName="step">
                        <div styleName="form-item">
                            <label>新密码：</label>
                            <Input styleName={passErr ? 'has-error':''} {...password('pass')} maxLength={20} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="密码请设置6-16位数字、字母" />
                        </div>
                        <div styleName="form-item">
                            <label>确认密码：</label>
                            <Input styleName={pass2Err ? 'has-error':''} {...password('pass2')} maxLength={20} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="再次输入密码" />
                        </div>
                        <button className="btn primary" styleName="next" onClick={submit}>下一步</button>
                    </div>
                </TabPane>
                </Tabs>
            </div>
        </div>
    </UserLayout>
}

export default GetPass