import React,{useState} from 'react'
import {Input, Button, Radio,Divider} from 'antd'
import './style.scss'

const Twocon = () =>{
    const radioChange =({target})=>{
        console.log(target);
    };
    return <>
        <h3>填写商品信息</h3>
        <h4>核对商品信息</h4>
        <div styleName="block">
            <div>
                <div>
                <label>商品：</label>
                <p>电脑背包</p>
                </div>
                <a>修改</a>
            </div>
            <div>
                <label>规格：</label>
                <p>灰色32</p>
                <label>商品售价：</label>
                <p><i>72</i>元</p>
                <label>每单拍：</label>
                <p><i>1</i>个</p>
            </div>
        </div>
        <h4>如何找到您的商品</h4>
        <div styleName="block">
            <div> 使用“手机淘宝搜索框”查找商品 </div>
            <div>
                <p>来源关键字1：xxxxxxx</p>
            </div>
            <div><p>来源关键字2：xxxxxxx</p></div>
        </div>
        <Divider/>
        <h4>活动下单要求</h4>
        <div styleName="block">
            <h5> 是否需要聊天 </h5>
            <div>
            <Radio.Group onChange={radioChange} value={1}>
                <Radio value={1}>是</Radio>
                <Radio value={2}>否</Radio>
            </Radio.Group>
            </div>
            <h5> 是否需要领取优惠券 </h5>
            <div>
            <Radio.Group onChange={radioChange} value={1}>
                <Radio value={1}>是</Radio>
                <Radio value={2}>否</Radio>
            </Radio.Group>
            </div>
            <h5> 是否可使用信用卡、花呗支付 </h5>
            <div>
            <Radio.Group onChange={radioChange} value={1}>
                <Radio value={1}>是</Radio>
                <Radio value={2}>否</Radio>
            </Radio.Group>
            </div>
            <h5> 是否收藏店铺 </h5>
            <div>
            <Radio.Group onChange={radioChange} value={1}>
                <Radio value={1}>是</Radio>
                <Radio value={2}>否</Radio>
            </Radio.Group>
            </div>
            <h5> 是否收藏商品 </h5>
            <div>
            <Radio.Group onChange={radioChange} value={1}>
                <Radio value={1}>是</Radio>
                <Radio value={2}>否</Radio>
            </Radio.Group>
            </div>
            <h5>其他要求</h5>
            <div>
            <Input/>
            </div>
        </div> 
        <h4>活动下单要求</h4>
        <div styleName="block">
            <div>要与小二先聊天</div>
            <div>不领优惠券</div>
            <div>禁止使用信用卡、花呗付款</div>
        </div>
        <div styleName="block">
            <div><a>修改</a></div>
        </div>
        <Button type="primary">确认提交信息</Button>
    </>
}

export default Twocon