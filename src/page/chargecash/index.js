import React from 'react'
import BasicLayout from '../../layout/basic'
import './style.scss'
import { Tabs,Radio } from 'antd';

const { TabPane } = Tabs;
const ChargeCash =()=>{
    return <BasicLayout>
        <div styleName="content">
            <h2>押金充值</h2>
            <p>充值一般 <i>2-3</i>分钟后自动到账，若 <i>30</i>分钟内未到帐请联系客服</p>
            <h3>请选择支付方式</h3>
            <p><i>温馨提示：请确保支付的银行账户为本人账户</i></p>
            <Tabs defaultActiveKey="1">
                <TabPane tab="银行转账(到账快推荐)" renderTabBar ={()=><p>aaa</p>} key="1">
                    <p>
                        <strong>接受汇款的银行账户</strong>
                         &nbsp;充值一般 <i>2-3</i> 分钟到账
                    </p>
                    <div styleName="card">
                        <div styleName="img">

                        </div>
                        <div>
                            <p>户名：aaaa</p>
                            <p>开户行：中信银行</p>
                            <p>账号：6217 3434 2333 2323</p>
                        </div>
                    </div>
                    <div styleName="note">
                        转账是请务必添加<i>转账附言</i> : <i>862887</i>
                    </div>
                    <p styleName="txt">
                        平台最低<i>500</i>起充
                    </p>
                    <p styleName="txt">
                        (此码每次仅可使用一次，如需再次充值请重新获取)
                    </p>
                    <p styleName="txt">
                        <i>温馨提示：如出错或支付完成后超10分钟还没有到账，请提供客服处理</i>
                    </p>
                </TabPane>
                <TabPane tab="网银支付(支持信用卡)" key="2">
                    <Tabs defaultActiveKey="1" type="card">
                        <TabPane tab="储蓄卡" key="1">
                            <Radio.Group defaultValue="1">
                                <Radio value="1">工商银行</Radio>
                                <Radio value="2">中国银行</Radio>
                                <Radio value="3">农业银行</Radio>
                            </Radio.Group>
                            <div styleName="pay">
                                <p><strong>填写充值金额</strong> </p>
                                <p>账户余额：0.00元</p>
                                <p>充值金额：<input type="text" className="input"/> 元 <span>（最低500元起充）</span></p>
                                <button className="btn primary">确认</button>
                            </div>
                        </TabPane>
                        <TabPane tab="信用卡" key="2">
                            <Radio.Group defaultValue="1">
                                <Radio value="1">工商银行</Radio>
                                <Radio value="2">中国银行</Radio>
                                <Radio value="3">农业银行</Radio>
                            </Radio.Group>
                            <div styleName="pay">
                                <p><strong>填写充值金额</strong> </p>
                                <p>账户余额：0.00元</p>
                                <p>充值金额：<input type="text" className="input"/> 元 <span>（最低500元起充）</span></p>
                                <button className="btn primary">确认</button>
                            </div>
                        </TabPane>
                    </Tabs>
                </TabPane>
            </Tabs>
        </div>
    </BasicLayout>
}

export default ChargeCash


