import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Avatar, Tabs, Radio, Select, Icon, Progress, Pagination, DatePicker, Spin } from 'antd'
import Table from '../../component/table'
import { getContext } from '../../context'
import { getAccount, getOrders, getActivityList, activityList, getShopType, getShopList } from '../../service'
import './style.scss'
import locale from 'antd/es/date-picker/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const { TabPane } = Tabs;
const {Option} = Select;
const { RangePicker } = DatePicker;
const OrderTable = ({ column, data, size })=>{
    const [list, setList] = useState([]);
    const pageData = (p, s)=>{
        if(!data.length) return [];
        return data.slice((p-1) * s, p * s);
    }
    //数据大小变化后重设list
    useEffect(()=>{
        setList(pageData(1,size));
    },[data.length]);

    const pageChange =(p, s)=>{
        setList(pageData(p, s));
    }

    return <>
        <Table column={ column } data={list} />
        {
            data.length <= 0 && <div styleName="data-empty">没有数据</div>
        }
        <div styleName="pages">
            <Pagination defaultCurrent={1} pageSize={size} total={data.length} onChange={pageChange}/>
        </div>
    </>
}

const Home = ({ history }) => {
    const { state, actions } = getContext();
    const [account,setAccount] = useState({
        account_gold: {
            freeze_money: 0, 
            total_money: 0, 
            available_money: 0
        },
        account_yajin: {
            freeze_money: 0, 
            total_money: 0, 
            available_money: 0
        }
    });
    const [list,setList] = useState([]);
    const [loading,setLoading] = useState(true);
    const [orders,setOrders] = useState([]);
    const [status,setStatus] = useState('');
    const [shopTypes,setShopTypes] = useState([]);
    const [shopList,setShopList] = useState([]);
    const [activities,setActivities] = useState([]);
    const [acts,setActs] = useState([]);
    
    const pageData = (data, p,s)=>{
        return data.slice((p-1) * s, p*s);
    }
    useEffect(()=> {
        getAccount().then(ret=>{
            if(ret.data.error_code === 0){
                setAccount(ret.data.data);
            }
        });

        getOrders().then(ret=>{
            if(ret.data.error_code === 0){
                setOrders(ret.data.data.map(i=>({
                    name:i.buyuser||'',
                    keyword:i.keyword||'',
                    num:i.online_order_num||'',
                    status:i.status
                })));
            }
        });
        getShopType().then(ret=>{
            const data = ret.data;
            if(data.error_code === 0){
                setShopTypes(data.data);
            }
        });
        getShopList().then(ret=>{
            const data = ret.data;
            if(data.error_code === 0){
                setShopList(data.data);
            }
        })
        activityList().then(ret=>{
            const data = ret.data;
            if(data.error_code === 0){
                setActivities(data.data);
            }
        });
        search();
    },[]);

    const statusChange= e =>{
        setStatus(e.target ? e.target.value:e);
    };
    const col1 =[
        { title: '买号', data: 'name', align:'center', },
        { title: '关键字', data: 'keyword', align:'center', },
        { title: '订单', data: 'num', },
    ];
    const col2 =[
        { title: '买号', data: 'name', align:'center', },
        { title: '关键字', data: 'keyword', align:'center', },
        { title: '订单', data: 'num', align:'center', width:240,
            render: text => <><div>{text}</div><Link to="/order">查看详情</Link></>,
        },
        { title: '操作', key: 'action',
            render:()=><><a>确认</a>(退回本金并支付押金)<br/><a>通知修改</a><br/><a>驳回</a></>
        },
    ];
    const col3 =[
        { title: '买号', data: 'name', align:'center', width:240,},
        { title: '关键字', data: 'keyword', align:'center', width:240,},
        { title: '订单', data: 'num', align:'center', width:240,
            render: text => <><div>{text}</div><Link to="/order">查看详情</Link></>,
        },
        { title: '操作', key: 'action',
            render:()=><><a>通知修改</a><br/><a>驳回</a></>
        },
    ];
    const col4 =[
        { title: '买号', data: 'name', align:'center', width:240,},
        { title: '关键字', data: 'keyword', align:'center', width:240,},
        { title: '订单', data: 'num', align:'center', width:240,
            render: text => <><div>{text}</div><Link to="/order">查看详情</Link></>,
        },
        { title: '评论', key: 'action', },
    ];
    const col5 =[
        { title: '买号', data: 'name', align:'center', width:240,},
        { title: '关键字', data: 'keyword', align:'center', width:240,},
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
        { title: '关键字', data: 'keyword', align:'center', width:240,},
        { title: '订单', data: 'num', align:'center', width:240,
            render: text => <><div>{text}</div><Link to="/order">查看详情</Link></>,
        },
        { title: '评论', key: 'action', render: () => <a>查看详情</a>},
        { title: '操作', key: 'action',
            render:()=><><a>通知修改</a><br/><a>驳回</a></>
        },
    ];
    const statusList = [
        {id:'',name:'全部'},
        {id:'0',name:'未完成'},
        {id:'1',name:'待支付'},
        {id:'2',name:'待审核'},
        {id:'3',name:'审核不通过'},
        {id:'4',name:'活动进行中'},
    ]
	const [shopTypeVal, setShopTypeVal] = useState(0);
	const [shopVal, setShopVal] = useState("");
	const shopTypeChange = val => {
		setShopTypeVal(val);
	};
	const shopChange = val => {
		setShopVal(val);
	};
    const [sTime, setSTime] = useState();
	const [eTime, setETime] = useState();
	const timeChange = d => {
		setSTime(d[0]);
		setETime(d[1]);
    };
    const [actType,setActType] = useState('');
    const actTypeChange = id =>{
        setActType(id);
    }

    const [comment,setComment] = useState('');
    const commentChange = ({target})=>{
        setComment(target.value);
    }

    const pageChange = (p,s)=>{
        setActs(pageData(list,p,s));
    }

    const search = ()=>{
        const param ={
            platformtype_id: shopTypeVal||'',
            store_id: shopVal,
            activitytype_id: actType,
            status:status,
            publish_time:[],
            reputation_type: comment
        };
        if(sTime){
            param.publish_time[0] = sTime.format('YYYY-MM-DD');
        }
        if(eTime){
            param.publish_time[1] = eTime.format('YYYY-MM-DD');
        }

        setLoading(true);
        getActivityList(param).then(ret=>{
            setLoading(false);
            if(ret.data.error_code === 0){
                const alist = ret.data.data.map(l=>({
                    store_name:l.store.store_name,
                    img_one:l.img_one,
                    goods_title:l.goods_title,
                    activity_num:l.activity_num,
                    create_time:l.create_time,
                    publish_time:l.publish_time,
                    pending:l.get_orders_status.pending,
                    processing:l.get_orders_status.processing,
                    wait_sending:l.get_orders_status.wait_sending,
                    finished:l.get_orders_status.finished,
                    wait_comment:l.get_orders_status.wait_comment,
                    status:statusList.find(s => s.id === ''+l.status)? statusList.find(s => s.id === ''+l.status).name:''
                }));
                setList(alist);
                setActs(pageData(alist,1,10));
            }
        });
    }
    
    return <div styleName="content">
        <div styleName="user">
            <div styleName="left">
                <div styleName="avatar">
                    <Avatar icon="user" size="large" style={{width:'50px',height:'50px'}} />
                </div>
                <div>
                    <p>ID：{ state.loginInfo.username }</p>
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
                        <Link to="/chargecash">充值押金&gt;&gt;</Link>
                    </header>
                    <div styleName="body">
                        <div styleName="percent">
                            <Progress type="circle" percent={25} width={50} />
                        </div>
                        <div styleName="cash-num">
                            <p>可用押金：<span>{account.account_yajin.available_money}</span>元</p>
                            <p>总押金：<span>{account.account_yajin.total_money}</span>元</p>
                            <p>冻结押金：<span>{account.account_yajin.freeze_money}</span>元</p>
                        </div>
                    </div>
                </div>
                <div styleName="gold">
                    <header>
                        <div>
                            <Icon type="money-collect" style={{color:'hsl(205, 87%, 49%)'}}/>
                            <span> 金币</span>
                        </div>
                        <Link to="/chargecoin">充值金币&gt;&gt;</Link>
                    </header>
                    <div styleName="operate">
                        <p>可用金币：<span>{account.account_gold.available_money}</span>元</p>
                        <div><button className="btn primary" onClick={()=>history.push('/cashout')}>兑换</button></div>
                        <div><button className="btn primary" onClick={()=>history.push('/publish')}>报名活动</button></div>
                    </div>
                </div>
            </div>
        </div>
        <div styleName="divider"/>
        <div styleName="order">
        <Tabs styleName="tabs" type="card">
            <TabPane tab={"未接单("+orders.filter(i=>i.status === 0).length+")"} key="0">
                <OrderTable column={col1} data={orders.filter(i=>i.status === 0)} size ={5} />
            </TabPane>
            <TabPane tab={"已接单待付款("+orders.filter(i=>i.status === 1).length+")"} key="1">
                <OrderTable column={col1} data={orders.filter(i=>i.status === 1)} size ={5} />
            </TabPane>
            <TabPane tab={"已下单待审核("+orders.filter(i=>i.status === 2).length+")"} key="2">
                <OrderTable column={col2} data={orders.filter(i=>i.status === 2)} size ={5} />
            </TabPane>
            <TabPane tab={"驳回下单("+orders.filter(i=>i.status === 4).length+")"} key="3">
                <OrderTable column={col3} data={orders.filter(i=>i.status === 4)} size ={5} />
            </TabPane>
            <TabPane tab={"待评论("+orders.filter(i=>i.status === 5).length+")"} key="4">
                <OrderTable column={col4} data={orders.filter(i=>i.status === 5)} size ={5} />
            </TabPane>
            <TabPane tab={"驳回评论("+orders.filter(i=>i.status === 6).length+")"} key="5">
                <OrderTable column={col5} data={orders.filter(i=>i.status === 6)} size ={5} />
            </TabPane>
            <TabPane tab={"已完成("+orders.filter(i=>i.status === 7).length+")"} key="6">
                <OrderTable column={col6} data={orders.filter(i=>i.status === 7)} size ={5} />
            </TabPane>
        </Tabs>
        </div>
        <div styleName="search">
        <Radio.Group value={status} onChange={statusChange}>
        {
            statusList.map((s,i)=><Radio.Button key={i} value={s.id}>{s.name}</Radio.Button>)
        }
        </Radio.Group>
            <div styleName="bar">
                <div styleName="bar-item">
                    <label>平台：</label>
                    <Select value={shopTypeVal} onChange={shopTypeChange} style={{ width: 100 }}>
                        <Option value={0}>全部</Option>
                        {shopTypes.map((s, i) => <Option key={i} value={s.id}> {s.name} </Option> )}
                    </Select>
                    <label>店铺：</label>
                    <Select value={shopVal} onChange={shopChange} style={{ width: 150 }}>
                        <Option value=''>全部</Option>
                        {shopList.map((s, i) => <Option key={i} value={s.id}> {s.store_name} </Option> )}
                    </Select>
                    <label>类型：</label>
                    <Select value={actType} style={{width:'130px'}} onChange={actTypeChange}>
                        <Option value="">全部</Option>
                        {
                            activities.map((a,i)=><Option key={i} value={'' + a.id}>{a.name}</Option>)
                        }
                    </Select>
                    <label>状态：</label>
                    <Select value={status} style={{width:'110px'}} onChange={statusChange}>
                    {
                        statusList.map((s,i)=><Option key={i} value={s.id}>{s.name}</Option>)
                    }
                    </Select>
                </div>
                <div styleName="bar-item">
                    <label>发布日期：</label>
                    <RangePicker
                        locale={locale}
                        format='YYYY-MM-DD'
                        placeholder={["开始时间", "结束时间"]}
                        value={[sTime, eTime]}
                        onChange={timeChange}
                        onOk={timeChange}
                    />
                    <label>评价类型：</label>
                    <input className="input" styleName="search" value={ comment } onChange={commentChange} />
                    <button className="btn primary"  onClick={search}>查询</button>
                </div>
            </div>
            <ul styleName="th">
                <li>商品</li>
                <li>活动编号</li>
                <li>状态分布</li>
            </ul>
            <ul styleName="list">
            {
                loading ? <div styleName="loading">
                    <Icon type="loading" style={{ fontSize: 30 }} spin />
                </div>:
                acts.map((l,i)=><li key={i}>
                    <div>
                        <header>
                            {/* <Icon type="taobao-circle" style={{color:'hsl(0,100%,60%)'}} /> */}
                            <span>{l.store_name}</span>
                        </header>
                        <div styleName="body">
                        <div styleName="img"><img src={l.img_one}/></div>
                            <span>{l.goods_title}</span>
                        </div>
                    </div>
                    <div>
                        <p>订单：<Link to="/order">{l.activity_num}</Link></p>
                        <p>发布时间：
                        {
                            l.create_time && <span>{moment(l.create_time).format('YYYY-MM-DD HH:mm:ss')}</span>
                        }
                        </p>
                        <p>支付时间：
                        {
                            l.publish_time && <span>{moment(l.publish_time).format('YYYY-MM-DD HH:mm:ss')}</span>
                        }
                        </p>
                    </div>
                    <div styleName="status">
                        <div>活动状态：<span>{l.status}</span></div>
                        <div>
                            待接单(<span>{l.pending}</span>) | 
                            进行中(<span>{l.processing}</span>) | 
                            待发货(<span>{l.wait_sending}</span>) | 
                            已完成(<span>{l.finished}</span>) |
                            待评价(<span>{l.wait_comment}</span>)
                        </div>
                    </div>
                    <div>
                        <button className="btn primary" size="small">一键重发</button>
                    </div>
                </li>)
            }
            </ul>
            <footer styleName="footer">
                <Pagination defaultCurrent={1} pageSize={10} total={list.length} onChange={pageChange} />
            </footer>
        </div>
    </div>
}

export default Home
