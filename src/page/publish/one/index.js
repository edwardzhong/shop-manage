import React,{useState,useEffect} from 'react'
import {Tabs, Radio, message} from 'antd'
import { NextBtn } from '../stepbtn'
import {getContext} from '../../../context'
import {shopList,activityList,createActivitySer} from '../../../service'
import './style.scss'

const One = ({nextStep})=>{
    const context = getContext();
    const {dispatch} = context;
    const [pf,setPf] = useState('1');
    const[tShop,setTshop] = useState(0);
    const[mShop,setMshop] = useState(0);
    const[actType,setActType] = useState(0);
    const [actList,setActList] = useState([]);
    const [shList,setShList] = useState([]);
    useEffect(()=>{
        shopList().then(ret=>{
            const data = ret.data;
            if(data.error_code === 0){
                setShList(data.data);
            } 
        });
        activityList().then(ret=>{
            const data = ret.data;
            if(data.error_code === 0){
                setActList(data.data);
            }
        });
    },[])
    
    const changePlatform = key =>{
        setPf(key);
    }
    const changeTshop =({target})=>{
        setTshop(target.value);
    }
    const changeMshop =({target})=>{
        setMshop(target.value);
    }
    const changeAct = ({target})=>{
        setActType(target.value);
    }
    const submit =()=>{
        // nextStep();
        const store_id = pf == '1'?tShop:mShop;
        if(!store_id){
            message.error('请选择店铺',1.5);
            return;
        }
        if(!actType){
            message.error('请选择活动类型',1.5);
            return;
        }
        const hide = message.loading('发送请求...');
        createActivitySer(dispatch,{store_id, activitytype_id: actType}).then(ret=>{
            hide();
            const data = ret.data;
            if(data.error_code === 0){
                nextStep();
            } else {
                message.error(data.msg,2);
            }
        },err=>{
            hide();
            message.error(err.message,2);
        });
    }
    return <>
        <h3>选择店铺</h3>
        <Tabs defaultActiveKey="1" onChange={changePlatform}>
            <Tabs.TabPane tab="淘宝" key="1">
                <Radio.Group onChange={changeTshop} value={tShop}>
                    {
                        shList.filter(s=>s.platformtype.id == 2).map((s,i)=>(<Radio key={i} value={s.id}>{s.store_name}</Radio>))
                    }
                </Radio.Group>
            </Tabs.TabPane>
            <Tabs.TabPane tab="天猫" key="2">
                <Radio.Group onChange={changeMshop} value={mShop}>
                    {
                        shList.filter(s=>s.platformtype.id == 1).map((s,i)=>(<Radio key={i} value={s.id}>{s.store_name}</Radio>))
                    }
                </Radio.Group>
            </Tabs.TabPane>
        </Tabs>
        <h3>活动类型</h3>
        <Radio.Group styleName="alist" onChange={changeAct} value={actType}>
        <ul>
            {
                actList.map((a,i)=>(<li key={i}>
                    <Radio value={a.id}>{a.name}</Radio>
                    <i>{a.price}金币起</i>
                </li>))
            }
        </ul>
        </Radio.Group>
        <footer>
            <NextBtn clickFn={submit}>下一步</NextBtn>
        </footer>
    </>
}

export default One
