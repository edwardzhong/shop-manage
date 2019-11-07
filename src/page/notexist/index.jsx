import React from 'react'
import {Link} from 'react-router-dom'
import './style.scss'

const NotExist = ()=>(
    <div styleName="content">
        <h1>404</h1>
        <p>Sorry, the page you visited does not exist.</p>
        <Link to="/"><button className="btn primary">返回首页</button></Link>
    </div>
)

export default NotExist