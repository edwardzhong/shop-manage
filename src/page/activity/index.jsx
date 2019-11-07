import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
import { Icon, Divider} from 'antd'
import Table from '../../component/table'
import {getActivity} from '../../service'
import { getContext } from '../../context'
import './style.scss'
import { timeStr } from '../../common/util'

const Activity=({history,match})=>{
    const id = match.params.id;
    const [info,setInfo] = useState({
        activity_num:'',
        store:{store_name:''},
        activitytype:{name:''},
        order_requirement:[],
        quantity:0,
        goods_title:'',
		goods_price:'',
		goods_nums_per_order: 0,
        img_one:"",
        create_time:null,
        bill:{
            single_add_service_fee: 0,
            single_service_fee: 0,
            single_yajin_fee: 0,
            total_add_service_fee: 0,
            total_service_fee: 0,
            total_yajin_fee: 0
        }
    });
    const [kwList, setkwList] = useState([]);
    const [feeList, setFeeList] = useState([]);

    useEffect(()=>{
        if(!id) history.goBack();
        getActivity({id}).then(ret=>{
            const data = ret.data;
            if(data.error_code === 0){
                const info = data.data;
                info.order_requirement = info.order_requirement ? info.order_requirement.split('|') : [];
                setInfo(info);
                const list = info.keyword_set.map(k=>({
                        id:k.id,
                        name: k.name,
                        price_range: k.price_range.split('|'),
                        send_address: k.send_address,
                        brand: k.brand,
                        sort_way: k.sort_way,
                        service: (k.service||'').split('|'),
                        store_classify: k.store_classify,
                        extra_info: k.extra_info,
                    }
                ));
                setkwList(list);
                const flist = [];
                if(info.user_choice && info.user_choice.length){
                    info.user_choice.forEach(i=>{
                        if(i.price && Number(i.price)>0){
                            flist.push({
                                name:i.name,
                                price:i.price +'金币'
                            });
                        }
                    })
                }
                if(info.reputation){
                    if(info.reputation.price && Number(info.reputation.price)>0){
                        flist.push({
                            name:info.reputation.name,
                            price:info.reputation.price +'金币',
                        })
                    }
                }
                if(info.publish){
                    flist.push({
                        name:info.publish.name||'定时发布',
                        price:(info.publish.price||0) + '金币',
                    });
                }
                setFeeList(flist);
            }
        });
    },[]);



    const data = [
        // { key: '1', name: 'aaa', terminal: 'app', word: '书包男', num:'232324343454532', status:2, express:'顺丰', amount:75 },
        // { key: '2', name: 'bbb', terminal: 'app', word: '背包男', num:'232324343454532', status:2, express:'顺丰', amount:75 },
        // { key: '3', name: 'ccc', terminal: 'app', word: '书包男', num:'232324343454532', status:2, express:'顺丰', amount:75 },
    ];
    const col = [
        { title: '买号', data: 'name', },
        { title: '下单终端', data: 'terminal', },
        { title: '关键字', data: 'word', },
        { title: '订单号', data: 'num', 
            render: text => <div><div>{text}</div><Link to="/order">查看详情</Link></div>,
        },
        {
          title: '状态',
          data: 'status',
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
        { title: '快递', data: 'express', },
        { title: '退款金额', data: 'amount', 
            render: text => <div>{text}元</div>,
        },
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
                        <p>{info.activitytype.name}</p>
                    </div>
                    <div>
                        <label>活动总单数：</label>
                        <p><span>{info.quantity}</span>单</p>
                    </div>
                    <div>
                        <label>手机|Pad端：</label>
                        <p>
                            <span>{info.quantity}</span>单<br/>
                            进行中 <span>0</span>单，
                            未接手 <span>0</span>单，
                            已完成 <span>0</span>单
                        </p>
                    </div>
                    <div>
                        <label>商品搜索关键词：</label>
                        <div>
                            {
                                kwList.map((k,i)=><div key={i}>搜索关键词：{k.name}</div>)
                            }
                        </div>
                    </div>
                    <div styleName="divider"></div>
                    <div>
                        <label>活动编号：</label>
                        <p>{info.activity_num}</p>
                    </div>
                    <div>
                        <label>活动发布时间：</label>
                        <p>{ timeStr(new Date(info.create_time)) }</p>
                    </div>
                    <div>
                        <label>店铺：</label>
                        <p>
                            <i> {info.store.store_name}</i>
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
        <div>
            <Table column={col} data={data} />
        </div>
        <Divider/>
        <h2>下单要求</h2>
        <ul styleName="commad">
        {
            info.order_requirement.map((n,i)=><li key={i}>{n}</li>)
        }
        </ul>
        <Divider/>
        <h2>活动商品</h2>
        <Table column={[
            { title: '主图', data: 'img', render:text=><img src={text}/>},
            { title: '商品', data: 'name', },
            { title: '单价', data: 'price', align:'center', render: text => <div>{text}元</div>,},
            { title: '每单刷 x 个', data: 'num', align:'center',},
            { title: '小计', data: 'amount', align:'center',render: text => <div>{text}元</div>,},
        ]} 
        data={[{
            img:info.img_one,
            name:info.goods_title,
            price:info.goods_price,
            num:info.goods_nums_per_order,
            amount:info.bill.single_yajin_fee
        }]} />
        <Divider/>
        <h2>费用合计</h2>
        <table styleName="table">
            <thead>
                <tr>
                    <th>分类</th>
                    <th>费用明细</th>
                    <th>小计</th>
                    <th>单数</th>
                    <th>优惠折扣</th>
                    <th>合计</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>押金</td>
                    <td>商品{info.goods_title}: {info.bill.single_yajin_fee} 元/单</td>
                    <td><i>{info.bill.single_yajin_fee}</i>元</td>
                    <td rowSpan="3">{info.quantity}单</td>
                    <td></td>
                    <td>{info.bill.single_yajin_fee} x {info.quantity} = <i>{info.bill.total_yajin_fee}</i>元</td>
                </tr>
                <tr>
                    <td>服务费</td>
                    <td>套餐服务费: {info.bill.single_service_fee}金币/单</td>
                    <td><i>{info.bill.single_service_fee}</i>金币</td>
                    <td></td>
                    <td>{info.bill.single_service_fee} x {info.quantity} = <i>{info.bill.total_service_fee}</i>金币</td>
                </tr>
                <tr>
                    <td>增值服务</td>
                    <td>
                    {
                        feeList.map((f,i)=><div key={i}>{f.name}: {f.price}金币</div>)
                    }
                    </td>
                    <td><i>{info.bill.single_add_service_fee}</i>金币</td>
                    <td></td>
                    <td>{info.bill.single_add_service_fee} x {info.quantity} = <i>{info.bill.total_add_service_fee}</i>金币</td>
                </tr>
            </tbody>
        </table>
        <footer>
            <p>费用合计 押金：<span>{info.bill.total_yajin_fee}</span>元&nbsp;&nbsp;金币：<span>{ info.bill.total_service_fee + info.bill.total_add_service_fee}</span>金币</p>
        </footer>
    </div>
}

export default Activity






