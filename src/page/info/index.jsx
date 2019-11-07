import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { getContext } from '../../context'
import { userUpdateSer } from '../../service'
import { Modal, message,Popconfirm } from 'antd'
import './style.scss'
message.config({
    top: 30,
    duration: 1.5,
});

const Info = ({history}) => {
    const { state, dispatch } = getContext();
    const [cvisible, setCVisible ] = useState(false);
    const [visible, setVisible ] = useState(false);
    const [qvisible, setQVisible ] = useState(false);
    const pass = useRef(null)
    const qq = useRef(null)
    const { userInfo } = state;
    
    const openModel = e =>{
        e.preventDefault();
        setVisible(true);
    }
    const openQModel = e =>{
        e.preventDefault();
        setQVisible(true);
    }
    const sendRequest = param =>{
        const hide = message.loading('发送请求..', 0);
        param.id = userInfo.id;
        userUpdateSer(dispatch,param).then(ret=>{
            hide();
            const data = ret.data;
            if(data.error_code === 0){
                pass.current.value = '';
                setVisible(false);
                setQVisible(false);
            } else {
                message.error(data.msg);
            }
        },err=>{
            hide();
            message.error(err.message);
        });
    }
    const confirm = ()=>{
        setCVisible(false);
        sendRequest({tixian_password:pass.current.value});
    }
    const cancel = ()=>{
        setCVisible(false);
    }
    const handleOk =()=>{
        setCVisible(true);
    };
    const handleQOk =()=>{
        sendRequest({qq:qq.current.value});
    }
    const handleCancel =()=>{
        setVisible(false);
        setCVisible(false);
    }
    const handleQCancel =()=>{
        setQVisible(false);
    }
    return <div styleName="content">
        <h2 styleName="title">账号设置</h2>
        <div styleName="item">
            <h3>登录密码</h3>
            <p>已设置</p>
            <Link to="/modifypass">修改</Link>
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
                    <a onClick={openQModel}>{ userInfo.qq?'修改':'添加'}</a>
                </li>
                <li>
                    <h4>手机</h4>
                    <p>{ userInfo.telephone }</p>
                    <a>验证完成</a>
                </li>
            </ul>
        </div>
        <Popconfirm style={{top:'0'}} placement="top"
                visible={cvisible}
                title="确定修改吗？"
                onConfirm={confirm}
                onCancel={cancel}
                okText="确定"
                cancelText="取消"
            >

        <Modal title="修改信息" visible={visible} okText="确定" cancelText="取消" onOk={handleOk} onCancel={handleCancel}>
            <div styleName="form-item">
                <label>提现密码：</label>
                <input className="input" type="password" ref={pass} />
            </div>
        </Modal>
        </Popconfirm>
        <Modal title="修改信息" visible={qvisible} okText="确定" cancelText="取消" onOk={handleQOk} onCancel={handleQCancel}>
            <div styleName="form-item">
                <label>QQ：</label>
                <input className="input" defaultValue = {userInfo.qq} ref={qq}/>
            </div>
        </Modal>
    </div>
}

export default Info

