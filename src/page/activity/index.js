import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import BasicLayout from '../../layout/basic'
import { Icon,  Table, Divider} from 'antd'
import { getContext } from '../../context'
import './style.scss'

const Activity=({history})=>{
    const data = [
        { key: '1', name: 'aaa', terminal: 'app', word: '书包男', num:'232324343454532', status:2, express:'顺丰', amount:75 },
        { key: '2', name: 'bbb', terminal: 'app', word: '背包男', num:'232324343454532', status:2, express:'顺丰', amount:75 },
        { key: '3', name: 'ccc', terminal: 'app', word: '书包男', num:'232324343454532', status:2, express:'顺丰', amount:75 },
    ];
    const col1 = [
        { title: '买号', dataIndex: 'name', },
        { title: '下单终端', dataIndex: 'terminal', },
        { title: '关键字', dataIndex: 'word', },
        { title: '订单号', dataIndex: 'num', 
            render: text => <div><div>{text}</div><Link to="/order">查看详情</Link></div>,
        },
        {
          title: '状态',
          dataIndex: 'status',
          filters: [
            { text: '未接手', value: 0, },
            { text: '进行中', value: 1, },
            { text: '已完成', value: 2, },
          ],
          onFilter: (value, record) => record.status === value,
          render: k => {
            switch(k){
                case 0 :return '未接手'
                case 1 :return '进行中'
                case 2 :return '已完成'
            }
          }
        },
        { title: '快递', dataIndex: 'express', },
        { title: '退款金额', dataIndex: 'amount', 
            render: text => <div>{text}元</div>,
        },
    ];
    const goodsData = [
        {key:'1',img:'https:////g-search3.alicdn.com/img/bao/uploaded/i4/i2/2204161850475/O1CN01bmGRYi1FNageOpDRL_!!2204161850475.jpg',
        name:'电脑背包男士电脑背包男士电脑背包男士电脑背包男士',price:75,num:1,amount:75}
    ];
    const col2 = [
        { title: '', dataIndex: 'img', render:text=><img src={text}/>},
        { title: '商品', dataIndex: 'name', },
        { title: '单价', dataIndex: 'price', align:'center', render: text => <div>{text}元</div>,},
        { title: '每单刷*个', dataIndex: 'num', align:'center',},
        { title: '小计', dataIndex: 'amount', align:'center',render: text => <div>{text}元</div>,},
    ];
    const costData =[
        {key:1,cate:'押金',detail:'押金72元/单',price:'72元',num:'3单',discount:'',amount:'72 * 3 =216元'},
        {key:2,cate:'服务费',detail:'套餐服务费12.8金币/单',price:'12.8金币',num:'3单',discount:'',amount:'12.8 * 3 =38.4金币'},
        {key:3,cate:'增值服务',detail:'快速返款1.30金币',price:'1.8金币',num:'3单',discount:'',amount:'1.30金币'}
    ];
    const col3  = [
        {title:'分类',dataIndex:'cate'},
        {title:'费用明细',dataIndex:'detail'},
        {title:'小计',dataIndex:'price'},
        {title:'单数',dataIndex:'num'},
        {title:'折扣',dataIndex:'discount'},
        {title:'合计',dataIndex:'amount'},
    ];
    function onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }
    return <BasicLayout history={history}>
        <div styleName="content">
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
                            <label>活动总单数：</label>
                            <p><span>3</span>单</p>
                        </div>
                        <div>
                            <label>手机|Pad端：</label>
                            <p>
                                <span>3</span>单<br/>
                                进行中 <span>0</span>单，
                                未接手 <span>0</span>单，
                                已完成 <span>0</span>单
                            </p>
                        </div>
                        <div>
                            <label>商品搜索关键词：</label>
                            <p>
                                淘宝APP搜索关键词：背包男 时尚<br/>
                                淘宝APP搜索关键词：背包男 时尚<br/>
                                淘宝APP搜索关键词：背包男 时尚
                            </p>
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
                        <p>
                            平台返款冻结押金：<span>222.8</span>元，
                            平台已返还：<span>122</span>元/ <span>3</span>笔，
                            平台待返还：<span>10.8</span>元/ <span>0</span>笔 
                        </p>
                        <p>
                            已发放佣金：<span>33.8</span>金币/ <span>3</span>笔，
                            待发放佣金：<span>00.0</span>金币/ <span>0</span>笔 
                        </p>
                    </div>
                </div>
            </div>
            <Divider/>
            <div styleName="roders">
                <Table columns={col1} dataSource={data} onChange={onChange} size="middle" pagination={false} />
            </div>
            <Divider/>
            <h2>下单要求</h2>
            <ul styleName="commad">
                <li>要与小二先聊天</li>
                <li>不领优惠券</li>
                <li>禁止使用信用卡、花呗付款</li>
                <li>商品不包邮，无需买手联系客服。商家每单额外支付10元作为运费押金，活动完成后运费押金将全部退还商家</li>
            </ul>
            <Divider/>
            <h2>活动商品</h2>
            <Table columns={col2} dataSource={goodsData} onChange={onChange} size="middle" bordered pagination={false} />
            <Divider/>
            <h2>费用合计</h2>
            <Table columns={col3} dataSource={costData} onChange={onChange} size="middle" bordered pagination={false} />
            <footer>
                <p>费用合计 押金：<span>226.80</span>元  金币：<span>39.7</span></p>
            </footer>
        </div>
    </BasicLayout>
}

export default Activity






