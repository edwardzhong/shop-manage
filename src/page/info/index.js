import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { getContext } from '../../context'
import { Divider } from 'antd'
import BasicLayout from '../../layout/basic'
import './style.scss'

const Info = ({history}) => {
    const { state, actions } = getContext();

    return <BasicLayout>
        <div styleName="content">
            <h2 styleName="title">账号设置</h2>
            <div styleName="item">
                <h3>登录密码</h3>
                <p>已设置</p>
                <Link to="/getpass">修改</Link>
            </div>
            <div styleName="item">
                <h3>提现密码</h3>
                <p>已设置</p>
                <a>修改</a>
            </div>
            <div styleName="list">
                <h3>联系方式</h3>
                <ul>
                    <li>
                        <h4>QQ</h4>
                        <p>xxxxxxx</p>
                        <a>绑定修改</a>
                    </li>
                    <li>
                        <h4>手机</h4>
                        <p>xxxxxxxxxxxxx</p>
                        <a>验证完成</a>
                    </li>
                </ul>
            </div>
        </div>
    </BasicLayout>
}

export default Info;