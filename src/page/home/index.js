import React from 'react'
import { Link } from 'react-router-dom'
import BasicLayout from '../../layout/basic'
import { Avatar, Tabs, Button, Input, Icon, Progress,Divider} from 'antd'
import { getContext } from '../../context'
import './style.scss'

const Home = ({ history }) => {
    const { state, actions } = getContext();
    
    return <BasicLayout history={history}>
        <div styleName="content">
            <div styleName="user">
                <div styleName="left">
                    <div styleName="avatar">
                        <Avatar icon="user" size="large" style={{width:'50px',height:'50px'}} />
                    </div>
                    <div>
                        <p>ID：151xxxxxx</p>
                        <p>会员等级：VIP会员</p>
                    </div>
                </div>
                <div styleName="right">
                    <div styleName="cash">
                        <header>
                            <div>
                                <Icon type="pay-circle" style={{color:'hsl(205, 87%, 49%)'}}/>
                                <span> 押金</span>
                            </div>
                            <a>充值押金&gt;&gt;></a>
                        </header>
                        <div styleName="body">
                            <div styleName="percent">
                                <Progress type="circle" percent={25} width={50} />
                            </div>
                            <div styleName="cash-num">
                                <p>可用押金：<span>0.00</span>元</p>
                                <p>总押金：<span>0.00</span>元</p>
                                <p>冻结押金：<span>0.00</span>元</p>
                            </div>
                        </div>
                    </div>
                    <div styleName="gold">
                        <header>
                            <div>
                                <Icon type="money-collect" style={{color:'hsl(205, 87%, 49%)'}}/>
                                <span> 金币</span>
                            </div>
                            <a>充值金币&gt;&gt;></a>
                        </header>
                        <div styleName="operate">
                            <p>可用金币：<span>0.00</span>元</p>
                            <div><Button type="primary">兑换</Button></div>
                            <div><Button type="primary">报名活动</Button></div>
                        </div>
                    </div>
                </div>
            </div>
            <Divider/>
            <div styleName="order"></div>
            <div styleName="list"></div>
        </div>
    </BasicLayout>
}

export default Home;