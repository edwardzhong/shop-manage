import React,{useState} from 'react'
import { Route, Redirect, Switch, Link } from 'react-router-dom'
import UserLayout from '../../layout/user'
import { getContext } from '../../context'
import useForm  from '../../common/useForm';
import { Tabs, Form, Icon, Input, Button } from 'antd';
import '../sign.scss'

const { TabPane } = Tabs;

const Login = ({ history }) => {
	const [ formState, { text, password }] = useForm();
    const { dispatch } = getContext();
    const [nameErr,setNameErr] = useState('');
    const [passErr,setPassErr] = useState('');
    const [mobileErr,setMobileErr] = useState('');
    const [codeErr,setCodeErr] = useState('');
	const passSubmit = e => {
        e.preventDefault();
        const values = formState.values;
        if(!values.name){
            setNameErr('用户名不能为空');
            return;
        }
        setNameErr('');
        if(!values.pass){
            setPassErr('密码不能为空');
            return;
        }
        setPassErr('');
        history.push('/');
		// try {
		// 	Toast.loading('loading...', 0);
		// 	const ret = await loginService(dispatch,formState.values);
		// 	Toast.hide();
		// 	if(ret.isSucc){
		// 		history.push('/');
		// 	} else {
		// 		Toast.fail(ret.msg, 2);
		// 	}
		// } catch (err) {
		// 	Toast.hide();
		// 	Toast.fail(err.message, 2);
		// }
	};

    const codeSubmit = async e=>{
        e.preventDefault();
        const values = formState.values;
        if(!values.mobile){
            setMobileErr('手机号不能为空');
            return;
        }
        setMobileErr('');
        if(!values.code){
            setCodeErr('验证码不能为空');
            return;
        }
        setCodeErr('');
    }
    const handleChange = key =>{
        if(key==1){
            history.push('/login/pass');
        } else {
            history.push('/login/code');
        }
    };
	return <UserLayout tabName="商家登录">
        <Switch>
            <Route path="/login/pass">
                <Tabs styleName="tabs" size="middle" defaultActiveKey="1" onChange={handleChange}>
                    <TabPane tab="密码登录" key="1">
                        <Form onSubmit={passSubmit}>
                            <div styleName="form-item">
                                <Input styleName={nameErr ? 'has-error':''} {...text('name')} maxLength={20} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="手机号" />
                            </div>
                            <div styleName="error">{nameErr}</div>
                            <div styleName="form-item">
                                <Input styleName={passErr ? 'has-error':''} {...password('pass')} maxLength={20} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="密码" />
                            </div>
                            <div styleName="error">{passErr}</div>
                            <Button type="primary" htmlType="submit" block> 登录 </Button>
                            <div styleName="links">
                                <Link to="/getpass">忘记密码</Link>
                                <Link to="/register">商家注册</Link>
                            </div>
                            <div styleName="error"></div>
                        </Form>
                    </TabPane>
                    <TabPane tab="手机无密码登录" key="2"/>
                </Tabs>
            </Route>
            <Route path="/login/code">
                <Tabs styleName="tabs" size="middle" defaultActiveKey="2" onChange={handleChange}>
                    <TabPane tab="密码登录" key="1"/>
                    <TabPane tab="手机无密码登录" key="2">
                        <Form onSubmit={codeSubmit}>
                            <div styleName="form-item">
                                <Input styleName={mobileErr ? 'has-error':''} {...text('mobile')} maxLength={20} prefix={<Icon type="mobile" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="手机号" />
                            </div>
                            <div styleName="error">{mobileErr}</div>
                            <div styleName="form-item">
                                <Input styleName={codeErr ? 'has-error':''} {...text('code')} maxLength={4} prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="验证码" />
                                <Button styleName="code-btn">获取验证码</Button>
                            </div>
                            <div styleName="error">{codeErr}</div>
                            <Button type="primary" htmlType="submit" block> 登录 </Button>
                            <div styleName="links center">
                                <Link to="/register">商家注册</Link>
                            </div>
                        </Form>
                    </TabPane>
                </Tabs>
            </Route>
            <Redirect to="/login/pass"/>
        </Switch>
    </UserLayout>
};

export default Login