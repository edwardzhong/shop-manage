import React from 'react'
import {Icon,Divider} from 'antd'
import {PrevBtn,NextBtn} from '../stepbtn'
import './style.scss'

const Pay=({prevStep,nextStep})=>{

    return <>
        <div styleName="pay">
            <h3>支付</h3>
            <p>充值到账可以会有延时，若<span>30分钟</span>内未到账请联系客服</p>
            <div styleName="info">
                <p>本次活动发布</p>
                <p>需押金</p>
                <p>金币</p>
            </div>
            <div styleName="info">
                <p>20单</p>
                <p> <span>1440</span></p>
                <p><span>225.0</span></p>
            </div>
            <Divider/>
            <h4>支付方式</h4>
            <div styleName="pay-label">
                <Icon type="pay-circle" style={{color:'hsl(200,70%,50%)'}} /> 金币支付
            </div>
            <div styleName="pay-item">
                <p>可用金币：(<span>16.00</span>) 1金币 = 1元</p>
                <p>支付：<span>225</span> 金币不足 还差 <span>209</span>金币 <a>前去充值</a></p>
            </div>
            <div styleName="pay-label">
                <Icon type="money-collect" style={{color:'hsl(200,70%,50%)'}} /> 押金支付
            </div>
            <div styleName="pay-item">
                <p>可用金币：(<span>0.00</span>) </p>
                <p>支付：<span>1440</span> 押金不足 还差 <span>1440</span>押金 <a>前去充值</a></p>
            </div>
        </div>
        <footer>
            <PrevBtn clickFn={prevStep}>上一步</PrevBtn>
            <NextBtn clickFn={nextStep}>付款报名活动</NextBtn>
        </footer>
    </>
}

export default Pay