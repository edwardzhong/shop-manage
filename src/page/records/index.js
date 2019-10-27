import React,{useState} from 'react'
import { Tabs, Select } from 'antd'
import Table from '../../component/table'
import './style.scss'
import {timeStr} from '../../common/util'
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/zh-CN';
registerLocale('zh-CN', es);

const { TabPane } = Tabs;
const { Option } = Select;

const Records = () => {
    const column = [
        {title:'店铺',data:'name'},
        {title:'收入(元)',data:'in',render:d=><i>{d}</i>},
        {title:'支出(元)',data:'out',render:d=><i>{d}</i>},
        {title:'冻结(元)',data:'dj',render:d=><i>{d}</i>},
        {title:'结余(元)',data:'jy',render:d=><i>{d}</i>},
        {title:'时间',data:'date'},
        {title:'活动编号',data:'num'},
        {title:'备注',data:'bz'},
    ];
    const data = [
        {name:'清新小铺', in:123, out:12, dj:0.0, jy:0.0, date:'2019-1-1', num:'T132323', bz:'备注'},
        {name:'清新小铺', in:123, out:12, dj:0.0, jy:0.0, date:'2019-1-1', num:'T132323', bz:'备注'}
    ]
    
    const col2=[
        {title:'提现流水号',data:'num'},
        {title:'提现时间',data:'date'},
        {title:'金额(元)',data:'amount',render:d=><i>{d}</i>},
        {title:'状态',data:'status'},
        {title:'备注',data:'bz'},
        {title:'操作',data:'op'},
    ]
    const data2=[
        {num:'T2343434', date:'2019-1-1', amount:'650', status:'已完成', ba:'到账需要3-5个工作日，请耐心等候', op:'-'},
        {num:'T2343434', date:'2019-1-1', amount:'650', status:'已完成', ba:'到账需要3-5个工作日，请耐心等候', op:'-'},
    ]

    const [s1,setS1] = useState(timeStr(new Date()))
    const [t1,setT1] = useState(timeStr(new Date()))
    const datesChange1 = d => {
        const str = timeStr(d);
        setS1(str);
    }

    const datetChange1 = d => {
        const str = timeStr(d);
        setT1(str);
    }

    const dateChange = d => {

    }

    return <div styleName="content">
        <h2>资金记录</h2>
        <Tabs type="card">
            <TabPane tab="押金记录" key="1">
                <div styleName="search">
                    <label>平台：</label>
                    <Select defaultValue="0" style={{ width: 100 }}>
                        <Option value="0">全部</Option>
                        <Option value="1">taobao</Option>
                        <Option value="2">tmall</Option>
                    </Select>
                    <label>店铺：</label>
                    <Select defaultValue="0" style={{ width: 100 }}>
                        <Option value="0">全部</Option>
                        <Option value="1">taobao</Option>
                        <Option value="2">tmall</Option>
                    </Select>
                    <label>起始时间：</label>
                    <DatePicker className="input" locale="zh-CN" onChange={datesChange1} value={s1} />&nbsp;-&nbsp;
                    <DatePicker className="input" locale="zh-CN" onChange={datetChange1} value={t1} />
                </div>
                <div styleName="search">
                    <label>任务编号：</label>
                    <input type="text" className="input" />
                    <button className="btn primary">查询</button>
                </div>
                <Table column={column} data={data}/>
            </TabPane>
            <TabPane tab="提现记录" key="2">
                <div styleName="search">
                    <label>起始时间：</label>
                    <DatePicker className="input" locale="zh-CN" onChange={dateChange} />&nbsp;-&nbsp;
                    <DatePicker className="input" locale="zh-CN" onChange={dateChange} />
                    <label>提现状态：</label>
                    <Select defaultValue="0" style={{ width: 100 }}>
                        <Option value="0">全部</Option>
                        <Option value="1">进行中</Option>
                        <Option value="2">已完成</Option>
                    </Select>
                    <button className="btn primary">查询</button>
                </div>
                <Table column={col2} data={data2} />
            </TabPane>
            <TabPane tab="任务金币记录" key="3">
                <div styleName="search">
                    <label>平台：</label>
                    <Select defaultValue="0" style={{ width: 100 }}>
                        <Option value="0">全部</Option>
                        <Option value="1">taobao</Option>
                        <Option value="2">tmall</Option>
                    </Select>
                    <label>店铺：</label>
                    <Select defaultValue="0" style={{ width: 100 }}>
                        <Option value="0">全部</Option>
                        <Option value="1">taobao</Option>
                        <Option value="2">tmall</Option>
                    </Select>
                    <label>起始时间：</label>
                    <DatePicker className="input" locale="zh-CN" onChange={dateChange} />&nbsp;-&nbsp;
                    <DatePicker className="input" locale="zh-CN" onChange={dateChange} />
                </div>
                <div styleName="search">
                    <label>任务编号：</label>
                    <input type="text" className="input" />
                    <button className="btn primary">查询</button>
                </div>
                <Table column={column} data={data}/>
            </TabPane>
        </Tabs>
    </div>
}

export default Records