import React from 'react'
import {Checkbox, Radio, Divider} from 'antd'
import './style.scss'

const ChargeCoin =()=>{
    return <div styleName="content">
        <h2>商家购买金币</h2>
        <h3>1.请选择充值金币</h3>
        <ul styleName="list">
            <Radio.Group defaultValue="1">
                <li><Radio value="1">100金币体验包</Radio> <i>100元</i></li>
                <li><Radio value="2">500金币体验包</Radio><i>500元</i></li>
                <li><Radio value="3">1000金币体验包</Radio><i>1000元</i></li>
                <li><Radio value="4">2000金币体验包</Radio><i>2000元</i></li>
            </Radio.Group>
            <li styleName="pay-li">
                <div>您已选择购买<i>500</i>金币体验包</div>
                <p>需支付<i>500</i>元</p>
            </li>
        </ul>
        <Divider/>
        <h3>2.支付</h3>
        <div>
            <Checkbox>使用押金支付(可用押金<i>0.00</i>元) </Checkbox>
        </div>
        <div styleName="pay">
            <p>确认支付：<i>500</i>元</p>
        </div>
        <div>
            温馨提示：<i>商家报名活动需要使用金币支付给买手及平台服务费，不能作押金，不可提现，仅作平台消费</i>
        </div>
        <div styleName="pay">
            <p>押金不足，还差<i>500</i>元，<a>前去充值</a></p>
        </div>
    </div>
}

export default ChargeCoin

