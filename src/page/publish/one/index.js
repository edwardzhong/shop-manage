import React,{useState} from 'react'
import {Tabs, Radio, Checkbox} from 'antd'
import { NextBtn } from '../stepbtn'
import './style.scss'

const One = ({nextStep})=>{
    const[tShop,setTshop] = useState(0);
    const[mShop,setMshop] = useState(0);
    const changeTer = ()=>{

    }
    const changeTshop =({target})=>{
        setTshop(target.value);
    }
    const changeMshop =({target})=>{
        setMshop(target.value);
    }
    return <>
        <h3>选择店铺</h3>
        <Tabs defaultActiveKey="1" onChange={changeTer}>
            <Tabs.TabPane tab="淘宝" key="1">
                <Radio.Group onChange={changeTshop} value={tShop}>
                    <Radio value={1}>清新铺</Radio>
                    <Radio value={2}>清新包包</Radio>
                </Radio.Group>
            </Tabs.TabPane>
            <Tabs.TabPane tab="天猫" key="2">
                <Radio.Group onChange={changeMshop} value={mShop}>
                    <Radio value={1}>清新铺</Radio>
                    <Radio value={2}>清新包包</Radio>
                </Radio.Group>
            </Tabs.TabPane>
        </Tabs>
        <h3>活动类型</h3>
        <ul styleName="alist">
            <li>
                <Checkbox>普通搜索订单</Checkbox>
                <i>10.0金币起</i>
            </li>
            <li>
                <Checkbox>回访订单（首日加购、次日下单）</Checkbox>
                <i>14.0金币起</i>
            </li>
            <li>
                <Checkbox>普通搜索订单+图文好评</Checkbox>
                <i>14.0金币起</i>
            </li>
            <li>
                <Checkbox>聚划算</Checkbox>
                <i>10.0金币起</i>
            </li>
            <li>
                <Checkbox>淘抢购</Checkbox>
                <i>10.0金币起</i>
            </li>
            <li>
                <Checkbox>流浪订单</Checkbox>
                <i>0.8金币起</i>
            </li>
        </ul>
        <footer>
            <NextBtn clickFn={nextStep}>下一步</NextBtn>
        </footer>
    </>
}

export default One
