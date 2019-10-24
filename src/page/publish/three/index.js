import React,{useState} from 'react'
import {Input, Button, Checkbox, Divider} from 'antd'
import './style.scss'

const Three = () =>{

    return <>
        <h4>1.选择活动数量</h4>
        <div styleName="block">
            <div>
                <Checkbox>1单</Checkbox>
                <Checkbox>3单</Checkbox>
                <Checkbox>5单</Checkbox>
                <Checkbox>10单</Checkbox>
                <Checkbox>20单</Checkbox>
                <Checkbox>100单</Checkbox>
                <Checkbox>自定义</Checkbox>
                <Input/>单<span>(1-500单)</span>
            </div>
        </div>
        <Divider/>
        <h4>2.设置成交关键词分布</h4>
        <div styleName="block">
            <div>
                <label> 手机淘宝关键词1：</label>
                <span>书包男时尚</span><Input/> <span>单</span>
            </div>
            <div>
                <label> 手机淘宝关键词2：</label>
                <span>书包男</span><Input/> <span>单</span>
            </div>
        </div>
        <Divider/>
        <h4>费用小计</h4>
        <div styleName="block">
        <table>
            <thead>
                <tr>
                    <th>分类</th>
                    <th>单价</th>
                    <th>数量</th>
                    <th>合计</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>服务费</td>
                    <td><i>10.40</i>金币/单</td>
                    <td><i>20</i>单</td>
                    <td><i>208</i>金币</td>
                </tr>

            </tbody>
        </table>
        </div>
    </>
}

export default Three