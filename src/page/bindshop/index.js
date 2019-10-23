import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { getContext } from '../../context'
import { Form, Input, Button, Checkbox, Steps,Divider } from 'antd'
import BasicLayout from '../../layout/basic'
import './style.scss'
const { Step } = Steps;

const BindShop = ({history}) => {
    const { state, actions } = getContext();
    const onChange=()=>{

    };
    return <BasicLayout history={history}>
        <div styleName="content">
            <header styleName="header">
                <div>
                    <h2 styleName="title">绑定新账户</h2>
                    <span>（近活动对应的买手可见，不会被泄露）</span>
                </div>
                <Steps styleName="steps" current={2} size="small">
                    <Step title="注册账号" />
                    <Step title="绑定店铺" />
                </Steps>
            </header>
            <p styleName="desc">请先完成下面的店铺信息，绑定店铺后即可进入报名活动页面</p>
            <Form styleName="form">
                <div styleName="form-item">
                    <label>店铺类型：</label>
                    <Checkbox onChange={onChange}>淘宝</Checkbox>
                    <Checkbox onChange={onChange}>天猫</Checkbox>
                </div>
                <div styleName="form-item">
                    <label>店铺主旺旺：</label>
                    <Input/>
                    <span>（店铺主旺旺绑定后无法修改和删除）</span>
                </div>
                <div styleName="form-item">
                    <label>店铺名称：</label>
                    <Input/>
                    <span>（店铺名称绑定后无法修改和删除）</span>
                </div>
                <div styleName="form-item">
                    <label>店铺首页网址：</label>
                    <Input/>
                </div>
                <div styleName="form-item">
                    <label>验证码：</label>
                    <Input styleName="code-input" value="assd-123" />
                    <Button>复制</Button>
                </div>
                <div styleName="img-block">
                    <p>1、将验证码加到您店铺的某个商家商品的标题上，类似这样</p>
                    <img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />
                    <p>2、将这个商品详情页链接复制到下面输入框</p>
                    <p>提示：店铺绑定成功后，商品标题中添加的验证码可以去掉</p>
                </div>
                <div styleName="form-item">
                    <label>商品网址（URL）：</label>
                    <Input/>
                </div>
                <div styleName="form-item">
                    <label/>
                    <p styleName="error">如无法绑定店铺或绑定店铺失败，请联系在线客服处理</p>
                </div>
                <div styleName="form-item">
                    <label/>
                    <Button type="primary">确认绑定</Button>
                </div>
            </Form>
            <div styleName="shop-list">
                <h3>已绑定的店铺</h3>
                <table>
                    <thead>
                        <tr>
                            <th>所属平台</th>
                            <th>店铺名</th>
                            <th>店铺旺旺</th>
                            <th>店铺网址</th>
                            <th>状态</th>
                            <th>绑定日期</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>taobao</td>
                            <td>清新小铺</td>
                            <td>new</td>
                            <td>http://aa.com</td>
                            <td>审核通过</td>
                            <td>2019-1-1</td>
                        </tr>
                        <tr>
                            <td>taobao</td>
                            <td>清新小铺</td>
                            <td>new</td>
                            <td>http://aa.com</td>
                            <td>审核通过</td>
                            <td>2019-1-1</td>
                        </tr>
                    </tbody>
                </table>
                <p>共2条</p>
            </div>
        </div>
    </BasicLayout>
}

export default BindShop;