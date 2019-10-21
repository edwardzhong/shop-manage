import React,{ useState } from 'react'
import { Link } from 'react-router-dom'
import { getContext } from '../../context'
import './style.scss'

const UserLayout = ({children,tabName}) =>{
    return <>
        <header styleName="header">
            <h2>{tabName}</h2>
            <div styleName="right">
                <Link to="/register">注册</Link>
                <p>|</p>
                <Link to="/login">登录</Link>
                <Link to="/help">帮助中心</Link>
            </div>
        </header>
        <div styleName="content">
        {children}
        </div>
    </>
}

export default UserLayout