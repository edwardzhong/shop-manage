import React, { useState } from 'react'
import { Route, Redirect, Switch, Link } from 'react-router-dom'
import { getContext } from '@/context'
import { loginSer, smsCode } from '@/service'
import useForm from '@/common/useForm';
import { Tabs, Icon, Input, message } from 'antd';
import '../sign.scss'
message.config({
    top: 30,
    duration: 1.5,
});

const { TabPane } = Tabs;

const Login = ({ history }) => {
    const [formState, { text, password }] = useForm();
    const { dispatch } = getContext();
    const [nameErr, setNameErr] = useState('');
    const [passErr, setPassErr] = useState('');
    const [phoneErr, setPhoneErr] = useState('');
    const [codeErr, setCodeErr] = useState('');
    const passSubmit = e => {
        e.preventDefault();
        const values = formState.values;
        if (!values.name) {
            setNameErr('手机号不能为空');
            return;
        }
        setNameErr('');
        if (!values.pass) {
            setPassErr('密码不能为空');
            return;
        }
        setPassErr('');
        const hide = message.loading('发送请求..', 0);
        loginSer(dispatch, {
            telephone: values.name,
            password: values.pass,
            way: "code"
        }).then(ret => {
            hide();
            const data = ret.data;
            if (data.error_code === 0) {
                history.push('/')
            } else {
                message.error(data.msg);
            }
        }, err => {
            hide();
            message.error(err.message);
        });
    };

    const checkPhone = () => {
        const values = formState.values;
        if (!values.phone) {
            setPhoneErr('手机号不能为空');
            return false;
        }
        if (!/^(13\d|14[57]|15[012356789]|18\d|17[013678])\d{8}$/.test(values.phone)) {
            setPhoneErr('请输入正确的手机号');
            return false;
        }
        setPhoneErr('');
        return true;
    }

    const codeSubmit = e => {
        e.preventDefault();
        if (!checkPhone()) return;
        const values = formState.values;
        setCodeErr('');
        const hide = message.loading('发送请求..', 0);
        loginSer(dispatch, {
            telephone: values.phone,
            sms_code: values.code,
            way: "sms"
        }).then(ret => {
            hide();
            const data = ret.data;
            if (data.error_code === 0) {
                history.push('/')
            } else {
                message.error(data.msg);
            }
        }, err => {
            hide();
            message.error(err.message);
        });
    }

    const getCode = () => {
        if (!checkPhone()) return;
        smsCode({ telephone: formState.values.phone }).then(ret => {
            const data = ret.data;
            if (data.error_code === 0) {
                message.success('手机验证码已发送，请注意查收');
            } else {
                message.error(data.msg);
            }
        }, err => {
            message.error(err.message);
        })
    }

    const handleChange = key => {
        if (key == 1) {
            history.push('/login/pass');
        } else {
            history.push('/login/code');
        }
    };

    return <Switch>
        <Route path="/login/pass">
            <Tabs styleName="tabs" size="middle" defaultActiveKey="1" onChange={handleChange}>
                <TabPane tab="密码登录" key="1">
                    <div styleName="form">
                        <div styleName="form-item">
                            <Input styleName={nameErr ? 'has-error' : ''} {...text('name')} maxLength={20} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="手机号" />
                        </div>
                        <div styleName="error">{nameErr}</div>
                        <div styleName="form-item">
                            <Input styleName={passErr ? 'has-error' : ''} {...password('pass')} maxLength={20} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="密码" />
                        </div>
                        <div styleName="error">{passErr}</div>
                        <button styleName="btn-block" className="btn primary" onClick={passSubmit}> 登录 </button>
                        <div styleName="links">
                            <Link to="/findpass">忘记密码</Link>
                            <Link to="/register">商家注册</Link>
                        </div>
                        <div styleName="error"></div>
                    </div>
                </TabPane>
                <TabPane tab="手机无密码登录" key="2" />
            </Tabs>
        </Route>
        <Route path="/login/code">
            <Tabs styleName="tabs" size="middle" defaultActiveKey="2" onChange={handleChange}>
                <TabPane tab="密码登录" key="1" />
                <TabPane tab="手机无密码登录" key="2">
                    <div styleName="form">
                        <div styleName="form-item">
                            <Input styleName={phoneErr ? 'has-error' : ''} {...text('phone')} maxLength={20} prefix={<Icon type="mobile" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="手机号" />
                        </div>
                        <div styleName="error">{phoneErr}</div>
                        <div styleName="form-item">
                            <Input styleName={codeErr ? 'has-error' : ''} {...text('code')} maxLength={6} prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="验证码" />
                            <button className="btn" styleName="code-btn" onClick={getCode}>获取验证码</button>
                        </div>
                        <div styleName="error">{codeErr}</div>
                        <button styleName="btn-block" className="btn primary" onClick={codeSubmit}> 登录 </button>
                        <div styleName="links center">
                            <Link to="/register">商家注册</Link>
                        </div>
                    </div>
                </TabPane>
            </Tabs>
        </Route>
        <Redirect to="/login/pass" />
    </Switch>
};

export default Login