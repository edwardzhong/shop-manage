import React,{useState,useEffect} from 'react'
import { Checkbox, Radio, Select, Divider, DatePicker, message } from 'antd'
import { PrevBtn, NextBtn } from '../stepbtn'
import { getActivity, updateActivitySer, getPlusService, getCities, waitforPayActivity } from '../../../service'
import { getContext } from '../../../context'
import { useHistory, useParams} from 'react-router-dom'
import './style.scss'
import locale from 'antd/es/date-picker/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const { Option } = Select;

const Service = ({setStep}) =>{
    const history = useHistory();
    const params = useParams();
    const id = params.id;
    const context = getContext();
    const { dispatch } = context;
    const [info,setInfo] = useState({
        activitytype:{ id: 0},
        store:{ id: 0 },
        quantity:0,
        goods_title:'',
        bill:{
            single_add_service_fee: 0,
            single_service_fee: 0,
            single_yajin_fee: 0,
            total_add_service_fee: 0,
            total_service_fee: 0,
            total_yajin_fee: 0
        }
    });
    const [cities,setCities] = useState([]);
    const [service, setService] = useState({ 
        user_choice:{
            '地域限制':[{price:0.5}],
            '指定区域接单':[{price:0.5}],
            '性别选择':[{price:0.5}],
            '信誉限制':[{price:1}],
            '淘气值限制':[{price:1}],
            '周平均购买率限制':[{price:1}],
        },
        comment_choice:[
			{ "name": "默认好评", "price": 0.0, },
			{ "name": "优质好评", "price": 2.0, },
        ],
        publish:[
            { "name": "定时发布", "price": 3.0, },
            { "name": "分时发布", "price": 2.0, },
            { "name": "间隔发布", "price": 6.0, }
        ]
    });
    const [isFirst,setFirst] = useState(true);
    const [lim,setLim] = useState(false);
    const [apo,setApo] = useState(false);
    const [sex,setSex] = useState(false);
    const [hor,setHor] = useState(false);
    const [tq,setTq] = useState(false);
    const [week,setWeek] = useState(false);

    const [limits,setLimits] = useState([]);
    const [appoints,setAppoints] = useState([]);
    const [sexVal,setSexVal] = useState('男');
    const [horVal,setHorVal] = useState('两心以上无上限');
    const [tqVal,setTqVal] = useState('500以上无上限');
    const [weekVal,setWeekVal] = useState('2.0以下无下限');
    
    const [rep,setRep] = useState('默认好评')
    const [pub,setPub] = useState('定时发布')

    const [times,setTime] = useState(moment(new Date()).format('YYYY-MM-DD HH:mm'))
    const [dates,setDate] = useState(moment(new Date()).format('YYYY-MM-DD HH:mm'))
    const [num,setNum] = useState(0);
    const [interval,setInter] = useState('1');
    const [count,setCount] = useState('1');
    const [feeList,setFeeList] = useState([]);
   
    useEffect(()=>{
        if(!id){
            history.push('/publish/init');
            return;
        }
        setStep(3);
        getActivity({id}).then(ret=>{
            setPageStatus(ret);
            setTimeout(()=>{
                setFirst(false);
            },1500);
        });
        getPlusService().then(ret=>{
            const data = ret.data;
            if(data.error_code === 0){
                setService(data.data);
            }
        });
        getCities().then(ret=>{
            const data = ret.data;
            if(data.error_code === 0){
                setCities(data.data);
            }
        })
    },[]);
    useEffect(()=>{
        if(!isFirst){
            submit().then(ret => {
                if(ret.data.error_code === 0){
                    setPageStatus(ret);
                }
            });
        }
    },[lim,apo,sex,hor,horVal,tq,tqVal,week,weekVal,rep,pub])
    const limChange =({target})=>{
        setLim(target.checked);
    }
    const apoChange =({target})=>{
        setApo(target.checked);
    }
    const sexChange =({target})=>{
        setSex(target.checked);
    }
    const horChange =({target})=>{
        setHor(target.checked);
    }
    const tqChange =({target})=>{
        setTq(target.checked);
    }
    const weekChange =({target})=>{
        setWeek(target.checked);
    }

    const limitChange =keys=>{
        setLimits(keys);
    }
    const appointChange =keys=>{
        setAppoints(keys);
    }
    const sexValChange =({target})=>{
        setSexVal(target.value);
    }
    const horValChange =({target})=>{
        setHorVal(target.value);
    }
    const tqValChange =({target})=>{
        setTqVal(target.value);
    }
    const weekValChange =({target})=>{
        setWeekVal(target.value);
    }

    const repChange = ({target})=>{
        setRep(target.value);
    }

    const pubChange = ({target})=>{
        setPub(target.value);
    }
    const setInputDis = h =>{
        document.querySelectorAll('.input').forEach((ele,i)=>{
            ele.disabled = i < h? true: false;
            if(i<h) ele.value = '';
        });
    }
    const timeChange = (d,s) =>{
        setTime(d.format('YYYY-MM-DD HH:mm'));
    } 

    const dateChange = (d,s)=>{
        setDate(d.format('YYYY-MM-DD HH:mm'));
        setInputDis(d.hour());
    } 

    const hourChange = e => {
        const total = Number(info.quantity);
        let num = 0;
        document.querySelectorAll('.input').forEach(ele=>{
            num += Number(ele.value||0);
        });
        if(num > total){
            num = total;
        }
        setNum(num);
    }

    const intervalChange = val =>{
        setInter(val);
    }

    const countChange = val =>{
        setCount(val);
    }

    const getPrice = (name, ret) => {
        const obj = service.user_choice[name].find(r=>r.result == ret);
        if(obj){
            return obj.price
        } else {
            return 0
        }
    }

    const submit =()=>{        
        const user_choice = [];
        if(lim){
            user_choice.push({
                name:'地域限制',
                result: limits,
                price: service.user_choice['地域限制'][0].price,
            })
        }
        if(apo){
            user_choice.push({
                name:'指定区域接单',
                result: appoints,
                price: service.user_choice['指定区域接单'][0].price,
            })
        }
        if(sex){
            user_choice.push({
                name:'性别选择',
                result: [sexVal],
                price: service.user_choice['性别选择'][0].price,
            })
        }
        if(hor){
            user_choice.push({
                name:'信誉限制',
                result:[horVal],
                price:getPrice('信誉限制',horVal)
            })
        }
        if(tq){
            user_choice.push({
                name:'淘气值限制',
                result:[tqVal],
                price:getPrice('淘气值限制',tqVal)
            })
        }
        if(week){
            user_choice.push({
                name:'周平均购买率限制',
                result:[weekVal],
                price:getPrice('周平均购买率限制',weekVal)
            })
        }
        const reputation = {
            name:rep,
            result:[rep]
        };
        const choice = service.comment_choice.find(i=>i.name == rep);
        if(choice){
            reputation.price = choice.price
        }
        const publish = { price:0,name:pub};
        const pItem = service.publish.find(s=>s.name == pub);
        if(pItem){
            publish.price = pItem.price;
        }
        if(pub == '定时发布'){
            publish.result = {
                enroll_time: times
            }
        }
        if(pub=='分时发布'){
            publish.result = {
                enroll_time: moment(dates).format('YYYY-MM-DD'),
                quantity:{},
            }
            document.querySelectorAll('.input').forEach((ele,i)=>{
                publish.result.quantity[('0'+i).slice(-2)] = Number(ele.value||0)
            });
        }
        if(pub=='间隔发布'){
            publish.result = {
                interval_time: interval,
                interval_num: count
            }
        }

        const param = {
            id: Number(id),
            store_id:info.store_id,
            activitytype_id:info.activitytype_id, 
            user_choice, reputation, publish
        }

        console.log(JSON.stringify(param));
        return updateActivitySer(dispatch,param).then(ret=>{
            if(ret.data.error_code !== 0){
                message.error(ret.data.msg,2);
            }
            return ret;
        },err => {
            message.error(err.message,2);
            return err;
        });
    }

    const setPageStatus = ret =>{
        const data = ret.data;
        if(data.error_code === 0){
            const info = data.data;
            if(info.store){
                info.store_id = info.store.id;
            }
            if(info.activitytype){
                info.activitytype_id = info.activitytype.id; 
            }
            setInfo(info);
            const flist = [];
            if(info.user_choice && info.user_choice.length){
                info.user_choice.forEach(i=>{
                    if(i.name == '地域限制'){
                        setLim(true);
                        setLimits(i.result);
                    }
                    if(i.name == '指定区域接单'){
                        setApo(true);
                        setAppoints(i.result);
                    }
                    if(i.name == '性别选择'){
                        setSex(true);
                        setSexVal(i.result[0]);
                    }
                    if(i.name == '信誉限制'){
                        setHor(true);
                        setHorVal(i.result[0]);
                    }
                    if(i.name == '淘气值限制'){
                        setTq(true);
                        setTqVal(i.result[0]);
                    }
                    if(i.name == '周平均购买率限制'){
                        setWeek(true);
                        setWeekVal(i.result[0]);
                    }
                    if(i.price && Number(i.price)>0){
                        flist.push({
                            name:i.name,
                            price:i.price
                        });
                    }
                })
            }
            if(info.reputation){
                setRep(info.reputation.name||'默认好评');
                if(info.reputation.price && Number(info.reputation.price)>0){
                    flist.push({
                        name:info.reputation.name,
                        price:info.reputation.price,
                    })
                }
            }
            setInputDis(new Date(dates).getHours());
            if(info.publish){
                setPub(info.publish.name||'定时发布');
                if(info.publish.name=='定时发布'){
                    setTime(info.publish.result.enroll_time);
                }
                if(info.publish.name=='分时发布'){
                    setDate(info.publish.result.enroll_time);
                    document.querySelectorAll('.input').forEach((ele,i)=>{
                        ele.value = info.publish.result.quantity[('0'+i).slice(-2)];
                    });
                    setInputDis(new Date(info.publish.result.enroll_time).getHours());
                }
                if(info.publish.name=='间隔发布'){
                    setInter(info.publish.result.interval_time)
                    setCount(info.publish.result.interval_num)
                }
                flist.push({
                    name:info.publish.name||'定时发布',
                    price:info.publish.price||0,
                });
            }
            setFeeList(flist);
        }
    }
    const nextStep = () =>{
        const hide = message.loading('请求中...');
        submit().then(ret=>{
            hide();
            if(ret.data.error_code === 0){
                waitforPayActivity({activity_id: Number(id)}).then(res=>{
                    const data = res.data;
                    if(data.error_code === 0){
                        history.push('/publish/pay/'+id);
                    } else {
                        message.error(res.msg,2);
                    }
                },err=>{
                    message.error(err.message,2);
                });
            }
        });
    }

    return <>
        <h3>选择增值服务</h3>
        <h4>用户选择</h4>
        <div styleName="block">
            <div styleName="com-item">
                <Checkbox checked={lim} onChange={limChange}>地域限制<span styleName="desc-item">(最多只能选择5个地区限制，+<i>{ service.user_choice['地域限制'][0].price }</i>金币/单)</span></Checkbox>
            </div>
            <div styleName="com-item-sub">
                <Select value={limits} mode="multiple" placeholder="请选择" onChange={limitChange} style={{ width: '100%', maxWidth:'800px' }}>
                    {
                        cities.map((c,i)=><Option key={i} value={c.name}>{c.name}</Option>)
                    }
                </Select>
            </div>
            <div styleName="com-item">
                <Checkbox checked={apo} onChange={apoChange}>指定区域接单<span styleName="desc-item">(最少选择5个地区，+<i>{ service.user_choice['指定区域接单'][0].price }</i>金币/单)</span></Checkbox>
            </div>
            <div styleName="com-item-sub">
                <Select value={appoints} mode="multiple" placeholder="请选择" onChange={appointChange} style={{ width: '100%', maxWidth:'800px' }}>
                    {
                        cities.map((c,i)=><Option key={i} value={c.name}>{c.name}</Option>)
                    }
                </Select>
            </div>
            <div styleName="com-item">
                <Checkbox checked={sex} onChange={sexChange}>性别选择<span styleName="desc-item">(仅限选择性别用户可接该活动，+ <i>{ service.user_choice['性别选择'][0].price }</i>金币/单</span></Checkbox>
            </div>
            <div styleName="com-item-sub">
                <Radio.Group value={sexVal} onChange={sexValChange}>
                    <Radio value="男">男</Radio>
                    <Radio value="女">女</Radio>
                </Radio.Group>
            </div>
            <div styleName="com-item">
                <Checkbox checked={hor} onChange={horChange}>信誉限制</Checkbox>
            </div>
            <div styleName="com-item-sub">
                <Radio.Group value={horVal} onChange={horValChange}>
                    {
                        service.user_choice['信誉限制'].map((k,i)=><Radio key={i} value={k.result}>{k.result} <span styleName="desc-item">(<i>+{k.price}</i>金币/单)</span></Radio> )
                    }
                </Radio.Group>
            </div>
            <div styleName="com-item">
                <Checkbox checked={tq} onChange={tqChange}>淘气值限制</Checkbox>
            </div>
            <div styleName="com-item-sub">
                <Radio.Group value={tqVal} onChange={tqValChange}>
                {
                    service.user_choice['淘气值限制'].map((k,i)=><Radio key={i} value={k.result}>{k.result} <span styleName="desc-item">(<i>+{k.price}</i>金币/单)</span></Radio> )
                }
                </Radio.Group>
            </div>
            <div styleName="com-item">
                <Checkbox checked={week} onChange={weekChange}>周平均购买率限制</Checkbox>
            </div>
            <div styleName="com-item-sub">
                <Radio.Group value={weekVal} onChange={weekValChange}>
                {
                    service.user_choice['周平均购买率限制'].map((k,i)=><Radio key={i} value={k.result}>{k.result} <span styleName="desc-item">(<i>+{k.price}</i>金币/单)</span></Radio> )
                }
                </Radio.Group>
            </div>
        </div>
        <Divider/>
        <h4>好评优化</h4>
        <div styleName="block">
            <Radio.Group value={rep} onChange={repChange}>
                {
                    service.comment_choice.map((c,i)=> {
                        if (c.name == '默认好评'){
                            return <div styleName="com-item" key={i}>
                                <Radio value={c.name}>{c.name}：选择此服务后，接手活动买手将对商品5分默认好评</Radio>(<i>{c.price}</i>金币/单)
                            </div>
                        } else if (c.name == '优质好评'){
                            return <div styleName="com-item" key={i}>
                                <Radio value={c.name}>{c.name}：选择此服务后，将有助于提升评价质量并优化您商品评价印象关键词</Radio>(<i>{c.price}</i>金币/单)
                            </div>
                        } else {
                            return <div styleName="com-item" key={i}>
                                <Radio disabled value={c.name}>{c.name}：选择此服务后，将有助于提升评价质量</Radio>(<i>{c.price}</i>金币/单)
                            </div>
                        }
                })
            }
            </Radio.Group>
        </div>
        <Divider/>
        <h4>定时发布</h4>
        <div styleName="block">
            <Radio.Group value={pub} onChange={pubChange}>
            <div styleName="title-item">
                <Radio value='定时发布'>定时发布:</Radio>
                <span>选择此服务后，网店管家将会按你设置的时间来报名活动(<i>{service.publish[0].price}</i>金币)</span>
            </div>
            <div styleName="desc">
                <label>报名活动时间：</label>
                <DatePicker showTime placeholder="选择时间" format='YYYY-MM-DD HH:mm' locale={locale} onChange={timeChange} onOk={timeChange} value={moment(times)}/>
                &nbsp;<i> 发布时间与当前时间至少错开2小时</i>
            </div>
            <div styleName="desc">
                <i>温馨提示：</i>
                <span> 客服审核时间 9:00-22:00，请在本时间段内报名活动 </span>
            </div>
            <div styleName="title-item">
                <Radio value="分时发布">分时发布:</Radio>
                <span>选择此服务后，将收取<i>{service.publish[1].price}</i>金币</span>
                <span styleName="txt">总计<i>{info.quantity}</i>单，总活动单数与下面时间点的单数数量相加一致</span>
            </div>
            <div styleName="desc">
                <label>选择发布日期：</label>
                <DatePicker showTime placeholder="选择时间" format='YYYY-MM-DD HH:mm' locale={locale} onChange={dateChange} onOk={dateChange} value={moment(dates)}/>
            </div>
            <div styleName="hour-item">
                <label> 0时 </label><input type="number" className="input" step="1" min="0" max="1000" onChange={hourChange} /><span> 单 </span>
                <label> 1时 </label><input type="number" className="input" step="1" min="0" max="1000" onChange={hourChange} /><span> 单 </span>
                <label> 2时 </label><input type="number" className="input" step="1" min="0" max="1000" onChange={hourChange} /><span> 单 </span>
                <label> 3时 </label><input type="number" className="input" step="1" min="0" max="1000" onChange={hourChange} /><span> 单 </span>
                <label> 4时 </label><input type="number" className="input" step="1" min="0" max="1000" onChange={hourChange} /><span> 单 </span>
            </div>
            <div styleName="hour-item">
                <label> 5时 </label><input type="number" className="input" step="1" min="0" max="1000" onChange={hourChange} /><span> 单 </span>
                <label> 6时 </label><input type="number" className="input" step="1" min="0" max="1000" onChange={hourChange} /><span> 单 </span>
                <label> 7时 </label><input type="number" className="input" step="1" min="0" max="1000" onChange={hourChange} /><span> 单 </span>
                <label> 8时 </label><input type="number" className="input" step="1" min="0" max="1000" onChange={hourChange} /><span> 单 </span>
                <label> 9时 </label><input type="number" className="input" step="1" min="0" max="1000" onChange={hourChange} /><span> 单 </span>
            </div>
            <div styleName="hour-item">
                <label> 10时 </label><input type="number" className="input" step="1" min="0" max="1000" onChange={hourChange} /><span> 单 </span>
                <label> 11时 </label><input type="number" className="input" step="1" min="0" max="1000" onChange={hourChange} /><span> 单 </span>
                <label> 12时 </label><input type="number" className="input" step="1" min="0" max="1000" onChange={hourChange} /><span> 单 </span>
                <label> 13时 </label><input type="number" className="input" step="1" min="0" max="1000" onChange={hourChange} /><span> 单 </span>
                <label> 14时 </label><input type="number" className="input" step="1" min="0" max="1000" onChange={hourChange} /><span> 单 </span>
            </div>
            <div styleName="hour-item">
                <label> 15时 </label><input type="number" className="input" step="1" min="0" max="1000" onChange={hourChange} /><span> 单 </span>
                <label> 16时 </label><input type="number" className="input" step="1" min="0" max="1000" onChange={hourChange} /><span> 单 </span>
                <label> 17时 </label><input type="number" className="input" step="1" min="0" max="1000" onChange={hourChange} /><span> 单 </span>
                <label> 18时 </label><input type="number" className="input" step="1" min="0" max="1000" onChange={hourChange} /><span> 单 </span>
                <label> 19时 </label><input type="number" className="input" step="1" min="0" max="1000" onChange={hourChange} /><span> 单 </span>
            </div>
            <div styleName="hour-item">
                <label> 20时 </label><input type="number" className="input" step="1" min="0" max="1000" onChange={hourChange} /><span> 单 </span>
                <label> 21时 </label><input type="number" className="input" step="1" min="0" max="1000" onChange={hourChange} /><span> 单 </span>
                <label> 22时 </label><input type="number" className="input" step="1" min="0" max="1000" onChange={hourChange} /><span> 单 </span>
                <label> 23时 </label><input type="number" className="input" step="1" min="0" max="1000" onChange={hourChange} /><span> 单 </span>
                <span>已分配<i>{num}</i>单</span>
                <span>未分配<i>{Number(info.quantity) - num}</i>单</span>
            </div>
            <div styleName="desc">
                <i>温馨提示：设置时间单数后请及时付款</i>
            </div>
            <div styleName="title-item">
                <Radio value='间隔发布'>间隔发布:</Radio>
                <span>选择此服务后，网店管家会将活动分批发布，<i>为了安全性建议选择此服务</i>&nbsp; (<i>{service.publish[2].price}</i>金币)</span>
            </div>
            <div styleName="every">
                <label>每隔：</label>
                <Select value={interval} style={{width:'100px'}} onChange={intervalChange}>
                    <Option value="1">10分钟</Option>
                    <Option value="2">20分钟</Option>
                    <Option value="3">30分钟</Option>
                    <Option value="4">40分钟</Option>
                </Select>
                <label>发布</label>
                <Select value={count} style={{width:'60px'}} onChange={countChange}>
                    <Option value="1">1单</Option>
                    <Option value="2">2单</Option>
                    <Option value="3">3单</Option>
                    <Option value="4">4单</Option>
                </Select>
                <span> 活动</span>
            </div>
            </Radio.Group>
        </div>
        <Divider/>
        <footer>
            <PrevBtn clickFn={()=>history.push('/publish/num/'+id)}>上一步</PrevBtn>
            <NextBtn clickFn={nextStep}>下一步</NextBtn>
        </footer>
        <h4>费用合计</h4>
        <table styleName="table">
            <thead>
                <tr>
                    <th>分类</th>
                    <th>费用明细</th>
                    <th>小计</th>
                    <th>合计</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>押金</td>
                    <td>商品{info.goods_title}: {info.bill.single_yajin_fee} 元/单</td>
                    <td><i>{info.bill.single_yajin_fee}</i>元</td>
                    <td>{info.bill.single_yajin_fee} x {info.quantity} = <i>{info.bill.total_yajin_fee}</i>元</td>
                </tr>
                <tr>
                    <td>服务费</td>
                    <td>套餐服务费: {info.bill.single_service_fee}金币/单</td>
                    <td><i>{info.bill.single_service_fee}</i>金币</td>
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
                    <td>{info.bill.single_add_service_fee} x {info.quantity} = <i>{info.bill.total_add_service_fee}</i>金币</td>
                </tr>
            </tbody>
        </table>
    </>
}

export default Service


