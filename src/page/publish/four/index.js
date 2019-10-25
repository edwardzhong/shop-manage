import React,{useState} from 'react'
import {Table,Checkbox, Radio, Select, Divider} from 'antd'
import './style.scss'
const {Option} = Select;

const Four = () =>{
    const costData =[
        {key:1,cate:'押金',detail:'押金72元/单',price:'72元',amount:'72 * 3 =216元'},
        {key:2,cate:'服务费',detail:'套餐服务费12.8金币/单',price:'12.8金币',amount:'12.8 * 3 =38.4金币'},
        {key:3,cate:'增值服务',detail:'快速返款1.30金币',price:'1.8金币',amount:'1.30金币'}
    ];
    const col  = [
        {title:'分类',dataIndex:'cate'},
        {title:'费用明细',dataIndex:'detail'},
        {title:'小计',dataIndex:'price'},
        {title:'合计',dataIndex:'amount'},
    ];
    const onChange =()=>{

    }
    return <>
        <h3>选择增值服务</h3>
        <h4>用户选择</h4>
        <div styleName="block">
            <div>
                <Checkbox>地域限制</Checkbox>
            </div>
            <div>
                <Checkbox>指定地域接单</Checkbox>
            </div>
            <div>
                <Checkbox>性别选择</Checkbox>
            </div>
            <div>
                <Checkbox>信誉限制</Checkbox>
            </div>
            <div>
                <Radio.Group defaultValue="0">
                    <Radio value="1">两星以上无限</Radio>
                    <Radio value="2">钻号以上</Radio>
                </Radio.Group>
            </div>
            <div>
                <Checkbox>淘气值限制</Checkbox>
            </div>
            <div>
                <Radio.Group defaultValue="0">
                    <Radio value="1">500以上无限</Radio>
                    <Radio value="2">1000以上无限</Radio>
                </Radio.Group>
            </div>
            <div>
                <Checkbox>周平均购买率限制</Checkbox>
            </div>
            <div>
                <Radio.Group defaultValue="0">
                    <Radio value="1">2.0以下无限</Radio>
                    <Radio value="2">1.5以下无限</Radio>
                </Radio.Group>
            </div>
        </div>
        <Divider/>
        <h4>好评优化</h4>
        <div styleName="block">
            <div>
                <Checkbox>默认好评：选择此服务后，接手活动</Checkbox>(<i>0金币/单</i>)
            </div>
            <div>
                <Checkbox>自由好评：选择此服务后，接手活动</Checkbox>(<i>0金币/单</i>)
            </div>            
            <div>
                <Checkbox>优质好评：选择此服务后，接手活动</Checkbox>(<i>0金币/单</i>)
            </div>            
            <div>
                <Checkbox disabled>自定义好评：选择此服务后，接手活动</Checkbox>(<i>0金币/单</i>)
            </div>            
            <div>
                <Checkbox disabled>图文好评：选择此服务后，接手活动</Checkbox>(<i>0金币/单</i>)
            </div>            <div>
                <Checkbox disabled>视频评价：选择此服务后，接手活动</Checkbox>(<i>0金币/单</i>)
            </div>
        </div>
        <Divider/>
        <h4>定时发布</h4>
        <div styleName="block">
            <div>
                <Checkbox>定时发布：</Checkbox><span>选择此服务后，网店管家将会按你设置的时间来报名活动</span>
            </div>
            <div styleName="desc">
                <label>报名活动时间：</label><input type="text" className="input" /><span> (3金币) </span><i> 发布时间与当前时间至少错开2小时</i>
            </div>
            <div styleName="desc">
                <i>温馨提示：</i>
                <span>
                    客服审核时间 9:00-22:00，请在本时间段内报名活动
                </span>
            </div>
            <div>
                <Checkbox>分时发布：</Checkbox><span>选择此服务后，将收取<i>2</i>金币</span>
            </div>
            <div styleName="desc">
                <label>选择发布日期：</label>
                <input type="text" className="input"/>
            </div>
            <div styleName="desc hour-item">
                <label> 0时 </label><input disabled type="text" className="input"/><span> 单 </span>
                <label> 1时 </label><input disabled type="text" className="input"/><span> 单 </span>
                <label> 2时 </label><input disabled type="text" className="input"/><span> 单 </span>
                <label> 3时 </label><input disabled type="text" className="input"/><span> 单 </span>
                <label> 4时 </label><input disabled type="text" className="input"/><span> 单 </span>
            </div>
            <div styleName="desc hour-item">
                <label> 5时 </label><input disabled type="text" className="input"/><span> 单 </span>
                <label> 6时 </label><input disabled type="text" className="input"/><span> 单 </span>
                <label> 7时 </label><input disabled type="text" className="input"/><span> 单 </span>
                <label> 8时 </label><input disabled type="text" className="input"/><span> 单 </span>
                <label> 9时 </label><input disabled type="text" className="input"/><span> 单 </span>
            </div>
            <div styleName="desc hour-item">
                <label> 10时 </label><input type="text" className="input"/><span> 单 </span>
                <label> 11时 </label><input type="text" className="input"/><span> 单 </span>
                <label> 12时 </label><input type="text" className="input"/><span> 单 </span>
                <label> 13时 </label><input type="text" className="input"/><span> 单 </span>
                <label> 14时 </label><input type="text" className="input"/><span> 单 </span>
            </div>
            <div styleName="desc hour-item">
                <label> 15时 </label><input type="text" className="input"/><span> 单 </span>
                <label> 16时 </label><input type="text" className="input"/><span> 单 </span>
                <label> 17时 </label><input type="text" className="input"/><span> 单 </span>
                <label> 18时 </label><input type="text" className="input"/><span> 单 </span>
                <label> 19时 </label><input type="text" className="input"/><span> 单 </span>
            </div>
            <div styleName="desc hour-item">
                <label> 20时 </label><input type="text" className="input"/><span> 单 </span>
                <label> 21时 </label><input type="text" className="input"/><span> 单 </span>
                <label> 22时 </label><input type="text" className="input"/><span> 单 </span>
                <label> 23时 </label><input type="text" className="input"/><span> 单 </span>
                <span>已分配<i>0</i>单</span>
                <span>未分配<i>0</i>单</span>
            </div>
            <div styleName="desc">
                <i>温馨提示：设置时间单数后请及时付款</i>
            </div>
            <div>
                <Checkbox>间隔发布：</Checkbox><span>选择此服务后，网店管家会将活动分批发布</span>
            </div>
            <div styleName="every">
                <label>每隔：</label>
                <Select defaultValue="1">
                    <Option value="1">1小时</Option>
                    <Option value="2">2小时</Option>
                </Select>
                <label>发布</label>
                <Select defaultValue="1">
                    <Option value="1">1单</Option>
                    <Option value="2">2单</Option>
                </Select>
                <span> 活动(<i>6</i>金币)</span>
            </div>
        </div>
        <Divider/>
        <h4>费用合计</h4>
        <Table columns={col} dataSource={costData} onChange={onChange} size="middle" bordered pagination={false} />
    </>
}

export default Four