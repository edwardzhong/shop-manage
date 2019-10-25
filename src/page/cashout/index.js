import React from 'react'
import BasicLayout from '../../layout/basic'
import './style.scss'

const Cashout =()=>{
    return <BasicLayout>
        <div styleName="content">
            <h2>押金提现</h2>
            <div styleName="block">
                <div>
                    <label>押金：</label>
                    <p><i>0.00</i>元</p>
                </div>
                <div>
                    <label>退款方式：</label>
                    <p>原路返回(3-7个工作日) <span>钱款原路返回到您之前的账户</span></p>
                </div>
                <div>
                    <label>提取金额：</label>
                    <p><input type="text" className="input"/> <span>每次最少提现5元</span></p>
                </div>
                <div>
                    <label></label>
                    <p>提现操作平台将收取0.3%的手续费，手续费最低2元/笔</p>
                </div>                
                <div>
                    <label></label>
                    <p><i>预计两个工作日内完成（法定假日和双休日顺延）平台提现操作和到账时间以各大银行为准，预计3-5个工作日内</i></p>
                </div>
                <div>
                    <label>实际到账金额：</label>
                    <p><i>0.00</i>元</p>
                </div>
                <div>
                    <label>提现密码：</label>
                    <p><input type="text" className="input"/> <a>找回提现密码</a></p>
                </div>
                <div>
                    <label></label>
                    <button className="btn primary">申请提现</button>
                </div>
            </div>
            <h2>温馨提示</h2>
            <p>1、请确保您输入的提现金额，以及支付宝或银行账号信息准确无误</p>
            <p>2、请确保您输入的提现金额，以及支付宝或银行账号信息准确无误</p>
            <p>3、请确保您输入的提现金额，以及支付宝或银行账号信息准确无误</p>
            <p>4、请确保您输入的提现金额，以及支付宝或银行账号信息准确无误</p>
        </div>
    </BasicLayout>
}

export default Cashout