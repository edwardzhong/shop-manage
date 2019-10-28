import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { getContext } from '../../context'
import { userUpdateService } from '../../service'
import { Modal, message } from 'antd'
import './style.scss'
message.config({
    top: 30,
    duration: 1.5,
});

const Info = ({history}) => {
    const { state, dispatch } = getContext();
    const [visible, setVisible ] = useState(false);
    const pass = useRef(null)
    const qq = useRef(null)
    const { userInfo } = state;
    
    const openModel = e =>{
        e.preventDefault();
        setVisible(true);
    }
    const handleOk =()=>{
        
        const hide = message.loading('发送请求..', 0);
        userUpdateService(dispatch,{tixian_password:pass.current.value, qq:qq.current.value,id:userInfo.id}).then(ret=>{
            hide();
            const data = ret.data;
            if(data.error_code === 0){
                pass.current.value = '';
                setVisible(false);
            } else {
                message.error(data.msg);
            }
        },err=>{
            hide();
            message.error(err.message);
        });
    };
    const handleCancel =()=>{
        setVisible(false);
    }
    return <div styleName="content">
        <h2 styleName="title">账号设置</h2>
        <div styleName="item">
            <h3>登录密码</h3>
            <p>已设置</p>
            <Link to="/getpass">修改</Link>
        </div>
        <div styleName="item">
            <h3>提现密码</h3>
            <p>{ userInfo.tixian_password?'已设置':'未设置'}</p>
            <a onClick={openModel}>{ userInfo.tixian_password?'修改':'添加'}</a>
        </div>
        <div styleName="list">
            <h3>联系方式</h3>
            <ul>
                <li>
                    <h4>QQ</h4>
                    <p>{userInfo.qq}</p>
                    <a onClick={openModel}>{ userInfo.qq?'修改':'添加'}</a>
                </li>
                <li>
                    <h4>手机</h4>
                    <p>{ userInfo.telephone }</p>
                    <a>验证完成</a>
                </li>
            </ul>
        </div>
        <Modal title="修改信息" visible={visible} okText="确定" cancelText="取消" onOk={handleOk} onCancel={handleCancel}>
            <div styleName="form-item">
                <label>提现密码：</label>
                <input className="input" ref={pass} />
            </div>
            <div styleName="form-item">
                <label>QQ：</label>
                <input className="input" defaultValue = {userInfo.qq} ref={qq}/>
            </div>
        </Modal>
    </div>
}

export default Info
