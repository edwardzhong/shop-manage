import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import BasicLayout from '../../layout/basic'
import { Avatar, Tabs, Radio, Select, Icon, Progress, Pagination, Divider} from 'antd'
import Table from '../../component/table'
import { getContext } from '../../context'
import './style.scss'
import DatePicker,{ registerLocale } from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/zh-CN';
registerLocale('zh-CN', es);

const { TabPane } = Tabs;
const {Option} = Select;
const Home = ({ history }) => {
    const { state, actions } = getContext();
    const [orderVal,setOrderVal] = useState('0');
    const orderChange = ()=>{
        
    };

    const handleValChange= e =>{
        setOrderVal(e.target.value);
    };

    const data = [
        { key:'1', name:'aaa', word:'书包', num:'19874545454454598761' },
        { key:'2', name:'bbb', word:'背包', num:'19874545454454598762' },
        { key:'3', name:'ccc', word:'户外包', num:'19874545454454598763' },
    ];
    const col1 =[
        { title: '买号', data: 'name', align:'center', },
        { title: '关键字', data: 'word', align:'center', },
        { title: '订单', data: 'num', },
    ];
    const col2 =[
        { title: '买号', data: 'name', align:'center', },
        { title: '关键字', data: 'word', align:'center', },
        { title: '订单', data: 'num', align:'center', width:240,
            render: text => <><div>{text}</div><Link to="/order">查看详情</Link></>,
        },
        { title: '操作', key: 'action',
            render:()=><><a>确认</a>(退回本金并支付押金)<br/><a>通知修改</a><br/><a>驳回</a></>
        },
    ];
    const col3 =[
        { title: '买号', data: 'name', align:'center', width:240,},
        { title: '关键字', data: 'word', align:'center', width:240,},
        { title: '订单', data: 'num', align:'center', width:240,
            render: text => <><div>{text}</div><Link to="/order">查看详情</Link></>,
        },
        { title: '操作', key: 'action',
            render:()=><><a>通知修改</a><br/><a>驳回</a></>
        },
    ];
    const col4 =[
        { title: '买号', data: 'name', align:'center', width:240,},
        { title: '关键字', data: 'word', align:'center', width:240,},
        { title: '订单', data: 'num', align:'center', width:240,
            render: text => <><div>{text}</div><Link to="/order">查看详情</Link></>,
        },
        { title: '评论', key: 'action', },
    ];
    const col5 =[
        { title: '买号', data: 'name', align:'center', width:240,},
        { title: '关键字', data: 'word', align:'center', width:240,},
        { title: '订单', data: 'num', align:'center', width:240,
            render: text => <><div>{text}</div><Link to="/order">查看详情</Link></>,
        },
        { title: '评论', key: 'action', render: () => <a>查看详情</a>},
        { title: '操作', key: 'action',
            render:()=><><a>确认</a>(支付评论押金)<br/><a>通知修改</a><br/><a>驳回</a></>
        },
    ];
    const col6 =[
        { title: '买号', data: 'name', align:'center', width:240,},
        { title: '关键字', data: 'word', align:'center', width:240,},
        { title: '订单', data: 'num', align:'center', width:240,
            render: text => <><div>{text}</div><Link to="/order">查看详情</Link></>,
        },
        { title: '评论', key: 'action', render: () => <a>查看详情</a>},
        { title: '操作', key: 'action',
            render:()=><><a>通知修改</a><br/><a>驳回</a></>
        },
    ];
    const dateFormat = 'YYYY/MM/DD';
    const dateChange = obj =>{
        console.log(obj);
    }
    return <BasicLayout>
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
                            <a>充值押金&gt;&gt;</a>
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
                            <a>充值金币&gt;&gt;</a>
                        </header>
                        <div styleName="operate">
                            <p>可用金币：<span>0.00</span>元</p>
                            <div><button className="btn primary">兑换</button></div>
                            <div><button className="btn primary">报名活动</button></div>
                        </div>
                    </div>
                </div>
            </div>
            <Divider/>
            <div styleName="order">
            <Tabs styleName="tabs" onChange={orderChange} type="card">
                <TabPane tab=" 已接单待付款(0)" key="1">
                    <Table column={col1} data={data} />
                </TabPane>
                <TabPane tab=" 已接单待审核(0)" key="2">
                    <Table column={col2} data={data} />
                </TabPane>
                <TabPane tab=" 已付款待修改(0)" key="3">
                    <Table column={col3} data={data} />
                </TabPane>
                <TabPane tab=" 已付款待评论(0)" key="4">
                    <Table column={col4} data={data} />
                </TabPane>
                <TabPane tab=" 已评论待审核(0)" key="5">
                    <Table column={col5} data={data} />
                </TabPane>
                <TabPane tab=" 已评论待修改评论(0)" key="6">
                    <Table column={col6} data={data} />
                </TabPane>
            </Tabs>
            </div>
            <Divider/>
            <div styleName="search">
            <Radio.Group defaultValue={orderVal} onChange={handleValChange}>
                <Radio.Button value="0">全部的（4）</Radio.Button>
                <Radio.Button value="1">进行中（1）</Radio.Button>
                <Radio.Button value="2">已完成（1）</Radio.Button>
                <Radio.Button value="3">待付款（1）</Radio.Button>
                <Radio.Button value="4">待审核（0）</Radio.Button>
                <Radio.Button value="5">审核不通过（0）</Radio.Button>
            </Radio.Group>
                {/* <Menu mode="horizontal" defaultSelectedKeys={['0']}>
                    <Menu.Item key="0">全部的（4） </Menu.Item>
                    <Menu.Item key="1">进行中（1） </Menu.Item>
                    <Menu.Item key="2">已完成（1） </Menu.Item>
                    <Menu.Item key="3">待付款（1） </Menu.Item>
                    <Menu.Item key="4">待审核（0） </Menu.Item>
                    <Menu.Item key="5">审核不通过（0） </Menu.Item>
                </Menu> */}
                <div styleName="bar">
                    <div styleName="bar-item">
                        <label>平台：</label>
                        <Select defaultValue="0" style={{width:'100px'}}>
                            <Option value="0">全部</Option>
                            <Option value="1">taobao</Option>
                            <Option value="2">tmall</Option>
                        </Select>
                        <label>店铺：</label>
                        <Select defaultValue="0" style={{width:'100px'}}>
                            <Option value="0">全部</Option>
                            <Option value="1">taobao</Option>
                            <Option value="2">tmall</Option>
                        </Select>
                        <label>类型：</label>
                        <Select defaultValue="0" style={{width:'100px'}}>
                            <Option value="0">全部</Option>
                            <Option value="1">taobao</Option>
                            <Option value="2">tmall</Option>
                        </Select>
                        <label>状态：</label>
                        <Select defaultValue="0" style={{width:'100px'}}>
                            <Option value="0">全部</Option>
                            <Option value="1">进行中</Option>
                            <Option value="2">已完成</Option>
                            <Option value="3">待付款</Option>
                            <Option value="4">待审核</Option>
                            <Option value="5">审核不通过</Option>
                        </Select>
                        <label>评价类型：</label>
                        <Select defaultValue="0" style={{width:'100px'}}>
                            <Option value="0">全部</Option>
                            <Option value="1">taobao</Option>
                            <Option value="2">tmall</Option>
                        </Select>
                    </div>
                    <div styleName="bar-item">
                        <label>发布日期：</label>
                        <DatePicker className="input" locale="zh-CN"  onChange={dateChange} />&nbsp;-&nbsp;
                        <DatePicker className="input" locale="zh-CN"  onChange={dateChange}/>
                        <label>高级搜索：</label>
                        <input className="input" styleName="search" />
                        <button className="btn primary">查询</button>
                    </div>
                </div>
                <ul styleName="th">
                    <li>商品</li>
                    <li>活动编号</li>
                    <li>状态分布</li>
                </ul>
                <ul styleName="list">
                    <li>
                        <div>
                            <header>
                                <Icon type="taobao-circle" style={{color:'hsl(0,100%,60%)'}} />
                                <span> 清新小包铺</span>
                            </header>
                            <div styleName="body">
                            <div styleName="img"><img src="https:////g-search3.alicdn.com/img/bao/uploaded/i4/i2/2204161850475/O1CN01bmGRYi1FNageOpDRL_!!2204161850475.jpg"/></div>
                                <span>电脑背包男士电脑背包男士电脑背包男士电脑背包男士电脑背包男士电脑背包男士电脑背包男士电脑背包男士</span>
                            </div>
                        </div>
                        <div>
                            <p>普通搜索订单：<Link to="/activity">T34343434233236564</Link></p>
                            <p>发布时间：<span>2019-01-02 01:01:01</span></p>
                            <p>支付时间：<span>2019-01-02 01:01:01</span></p>
                        </div>
                        <div styleName="status">
                            <div>活动状态：<span>已完成</span></div>
                            <div>
                                进行中(<span>0</span>) | 
                                进行中(<span>0</span>) | 
                                进行中(<span>0</span>) | 
                                进行中(<span>3</span>) 
                                待评价
                            </div>
                        </div>
                        <div>
                            <button className="btn primary" size="small">一键重发</button>
                        </div>
                    </li>
                    <li>
                        <div>
                            <header>
                                <Icon type="taobao-circle" style={{color:'hsl(0,100%,60%)'}} />
                                <span> 清新小包铺</span>
                            </header>
                            <div styleName="body">
                                <div styleName="img"><img src="https:////g-search3.alicdn.com/img/bao/uploaded/i4/i2/2204161850475/O1CN01bmGRYi1FNageOpDRL_!!2204161850475.jpg"/></div>
                                <span>电脑背包男士电脑背包男士电脑背包男士电脑背包男士电脑背包男士电脑背包男士电脑背包男士电脑背包男士</span>
                            </div>
                        </div>
                        <div>
                            <p>普通搜索订单：<Link to="/activity">T34343434233236564</Link></p>
                            <p>发布时间：<span>2019-01-02 01:01:01</span></p>
                            <p>支付时间：<span>2019-01-02 01:01:01</span></p>
                        </div>
                        <div styleName="status">
                            <div>活动状态：<span>已完成</span></div>
                            <div>
                                进行中(<span>0</span>) | 
                                进行中(<span>0</span>) | 
                                进行中(<span>0</span>) | 
                                进行中(<span>3</span>) 
                                待评价
                            </div>
                        </div>
                        <div>
                            <button className="btn primary" size="small">取消支付</button>
                        </div>
                    </li>
                    <li>
                        <div>
                            <header>
                                <Icon type="taobao-circle" style={{color:'hsl(0,100%,60%)'}} />
                                <span> 清新小包铺</span>
                            </header>
                            <div styleName="body">
                            <div styleName="img"><img src="https:////g-search3.alicdn.com/img/bao/uploaded/i4/i2/2204161850475/O1CN01bmGRYi1FNageOpDRL_!!2204161850475.jpg"/></div>
                                <span>电脑背包男士电脑背包男士电脑背包男士电脑背包男士电脑背包男士电脑背包男士电脑背包男士电脑背包男士</span>
                            </div>
                        </div>
                        <div>
                            <p>普通搜索订单：<Link to="/activity">T34343434233236564</Link></p>
                            <p>发布时间：<span>2019-01-02 01:01:01</span></p>
                            <p>支付时间：<span>2019-01-02 01:01:01</span></p>
                        </div>
                        <div styleName="status">
                            <div>活动状态：<span>已完成</span></div>
                            <div>
                                进行中(<span>0</span>) | 
                                进行中(<span>0</span>) | 
                                进行中(<span>0</span>) | 
                                进行中(<span>3</span>) 
                                待评价
                            </div>
                        </div>
                        <div>
                            <button className="btn primary">取消活动</button>
                            <button className="btn primary">修改活动</button>
                            <button className="btn primary">继续支付</button>
                        </div>
                    </li>
                </ul>
                <footer styleName="footer">
                    <Pagination defaultCurrent={1} pageSize={10} total={3} />
                </footer>
            </div>
        </div>
    </BasicLayout>
}

export default Home