import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import pages from '../../config/page'
import './style.scss'

const UserLayout = ({children, isLink}) =>{
    const { pathname } = useLocation();
    const page = pages.filter(p=>p.path == pathname)[0];
    return <>
        <header styleName="header">
            <h2>{page.title}</h2>
            {
                isLink && <div styleName="right">
                    <Link to="/register">注册</Link>
                    <p>|</p>
                    <Link to="/login">登录</Link>
                    <p>|</p>
                    <Link to="/">首页</Link>
                    <p>|</p>
                    <Link to="/help">帮助中心</Link>
                </div>
            }
        </header>
        <div styleName="content">
        {children}
        </div>
    </>
}

export default UserLayout