import React,{useState,useEffect} from 'react'
import { getMoneyOutRecords, getShopType, getShopList } from '@/service';
import { Tabs, Select, DatePicker } from 'antd'
import Table from '@/component/table'
import List from './list'
import './style.scss'
import locale from 'antd/es/date-picker/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const { RangePicker } = DatePicker;
const { TabPane } = Tabs;
const { Option } = Select;
const status = ['审核中', '审核通过', '取消', '审核不通过'];
const Records = () => {
    const [shopTypes,setShopTypes] = useState([]);
    const [shopList,setShopList] = useState([]);
    const [moneyOuts,setMoneyOuts] = useState([]);
    const [moneyList,setMoneyList] = useState([]);
    const column=[
        {title:'提现流水号',data:'num'},
        {title:'提现时间',data:'time'},
        {title:'金额(元)',data:'amount',render:d=><i>{d}</i>},
        {title:'状态',data:'status'},
        {title:'备注',data:'memo'},
        {title:'操作',data:'op'},
    ]
    const listFilter = (list,opt={})=>{
        return list.filter((l,i)=>{
            if(opt.status && l.status != opt.status) return false; 
            if(opt.st && moment(l.create_time).isBefore(opt.st)) return false; 
            if(opt.st && moment(l.create_time).isAfter(opt.et)) return false;
            return true;
        })
        .map(l=>({
            num: l.yj_num,
            time: moment(new Date(l.create_time)).format('YYYY-MM-DD HH:mm'),
            amount: l.money_nums,
            status: status[l.status],
            memo: l.memo,
            op: '',
        }));
    }

    useEffect(()=>{
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
        getMoneyOutRecords().then(ret=>{
            const data = ret.data;
            if(data.error_code === 0){
                setMoneyOuts(data.data);
                setMoneyList(listFilter(data.data));
            }
        });
    },[])

    const [sTime,setSTime] = useState()
    const [eTime,setETime] = useState()
    const timeChange = d =>{
        setSTime(d[0]);
        setETime(d[1]);
    } 
    const [statusVal, setStatus] = useState('');
    const statusChange = val =>{
        setStatus(val);
    }

    const submit = ()=>{
        setMoneyList(listFilter(moneyOuts,{st:sTime,et:eTime,status:statusVal}));
    }
    
    return <div styleName="content">
        <h2>资金记录</h2>
        <div styleName="divider"></div>
        <Tabs type="card">
            <TabPane tab="押金记录" key="1">
                <List tag='yajin' shopTypes={shopTypes} shopList={shopList}/>
            </TabPane>
            <TabPane tab="提现记录" key="2">
                <div styleName="search">
                    <label>时间范围：</label>
                    <RangePicker
                        locale={locale}
                        showTime={{ format: 'HH:mm' }}
                        format="YYYY-MM-DD HH:mm"
                        placeholder={['开始时间', '结束时间']}
                        value={[sTime,eTime]}
                        onChange={timeChange}
                        onOk={timeChange}
                    />
                    <label>提现状态：</label>
                    <Select value={statusVal} onChange={statusChange} style={{ width: 120 }}>
                        <Option value={''}>全部</Option>
                        {
                            status.map((s,i)=><Option key={i} value={''+i}>{s}</Option>)
                        }
                    </Select>
                    <button className="btn primary" onClick={submit}>查询</button>
                </div>
                <Table column={column} data={moneyList} />
            </TabPane>
            <TabPane tab="任务金币记录" key="3">
                <List tag='gold' shopTypes={shopTypes} shopList={shopList}/>
            </TabPane>
        </Tabs>
    </div>
}

export default Records

