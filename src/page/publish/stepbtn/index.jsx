import React from 'react'
import {Icon} from 'antd'
import './style.scss'

const PrevBtn =({ children, clickFn})=>(
    <div styleName="step-btn" onClick={clickFn}>
        <Icon type="left" /><span>{children}</span>
    </div>
)

const NextBtn =({ children, clickFn, disable })=>(
    <div styleName={ disable ? "step-btn gray":"step-btn" } onClick={clickFn}>
        <span>{children}</span><Icon type="right" />
    </div>
)

export { PrevBtn, NextBtn }