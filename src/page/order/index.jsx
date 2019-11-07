import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import { Icon, Divider} from 'antd'
import Table from '../../component/table'
import { getContext } from '../../context'
import '../activity/style.scss'

const Order=({history})=>{
    const col = [
        { title: '', data: 'img', render:text=><img src={text}/>},
        { title: '商品', data: 'name', },
        { title: '单价', data: 'price', align:'center', render: text => <div>{text}元</div>,},
        { title: '每单刷*个', data: 'num', align:'center',},
        { title: '小计', data: 'amount', align:'center',render: text => <div>{text}元</div>,},
    ];
    const goodsData = [
        {key:'1',name:'电脑背包男士电脑背包男士电脑背包男士电脑背包男士',price:75,num:1,amount:75,
            img:'https:////g-search3.alicdn.com/img/bao/uploaded/i4/i2/2204161850475/O1CN01bmGRYi1FNageOpDRL_!!2204161850475.jpg', }
    ];
    function onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }
    return <div styleName="content">
        <div styleName="info">
            <header>
                <h2>活动信息</h2>
            </header>
            <div styleName="body">
                <div styleName="inner">
                    <div>
                        <label>活动类型：</label>
                        <p>普通搜索订单</p>
                    </div>
                    <div>
                        <label>下单终端：</label>
                        <p>手机|Pad</p>
                    </div>
                    <div>
                        <label>买家账号：</label>
                        <p>188****1234 </p>
                    </div>
                    <div>
                        <label>买号：</label>
                        <p>aaabbbb </p>
                    </div>
                    <div>
                        <label>垫付本金：</label>
                        <p><span>75</span> 元</p>
                    </div>
                    <div styleName="divider"></div>
                    <div>
                        <label>返款类型：</label>
                        <p>平台返款</p>
                    </div>
                    <div>
                        <label>返款金额：</label>
                        <p><span>72</span>元</p>
                    </div>
                    <div styleName="divider"></div>
                    <div>
                        <label>活动编号：</label>
                        <p>T43434342329898987</p>
                    </div>
                    <div>
                        <label>活动发布时间：</label>
                        <p>2019-01-02 12:12:12</p>
                    </div>
                    <div>
                        <label>店铺：</label>
                        <p>
                            <Icon type="taobao-circle" style={{color:'hsl(0,100%,60%)'}} />
                            <i> 清新小包一号店</i>
                        </p>
                    </div>
                </div>
                <div styleName="inner">
                    <h3>活动已完成</h3>
                </div>
            </div>
        </div>
        <Divider/>
        <h2>活动进展</h2>
        <div>
            <table styleName="table">
                <thead>
                    <tr>
                        <th>服务项目</th>
                        <th>完成时间</th>
                        <th>状态</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>下单和支付</td>
                        <td>2019-02-03 10:10</td>
                        <td><Icon type="check-circle" style={{color:'hsl(150,50%,50%)'}} /> 买手已完成订单，订单号：2343434343434</td>
                    </tr>
                    <tr>
                        <td>商家发货</td>
                        <td>2019-02-03 12:00</td>
                        <td><Icon type="check-circle" style={{color:'hsl(150,50%,50%)'}} /> 商家已完成</td>
                    </tr>
                    <tr>
                        <td>收货并好评</td>
                        <td>2019-02-03 12:00</td>
                        <td><Icon type="check-circle" style={{color:'hsl(150,50%,50%)'}} /> 买手已确认收货并好评</td>
                    </tr>
                    <tr>
                        <td colSpan="3">
                            <p>买号：陌路红尘嚣嚣</p>
                            <p>商品名称：电脑背包男士电脑背包男士电脑背包男士电脑背包男士</p>
                            <p>评价内容：</p>
                            <p>
                                <i>物流、评价截图：</i>
                                <img src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"/> &nbsp;
                                <img src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"/>
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>平台返款</td>
                        <td>2019-02-03 12:00</td>
                        <td>
                            <p><Icon type="check-circle" style={{color:'hsl(150,50%,50%)'}} /> 商家已确认返款金额<span>72.00</span>元</p>
                            <p><span>平台将在买手确认返款金额无误后，将垫付本金打入买手账户</span></p>
                        </td>
                    </tr>
                    <tr>
                        <td>平台返款完成</td>
                        <td>2019-02-03 12:00</td>
                        <td><Icon type="check-circle" style={{color:'hsl(150,50%,50%)'}} />  已完成，买手确认平台返款</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <Divider/>
        <h2>活动商品</h2>
        <Table column={col} data={goodsData} />
        <footer>
            <p>买手实付款：<span>72.00</span>元</p>
        </footer>
        <Divider/>
        <h2>评价信息</h2>
        <p>评价类型：默认好评</p>
        <p>指定关键词：书包男</p>
    </div>
}

export default Order
