import React,{useState,useEffect} from 'react'
import { Input, Radio } from 'antd'
import { PrevBtn, NextBtn } from '../stepbtn'
import { getActivity,getOrderRequire } from '../../../service'
import {getContext} from '../../../context'
import './style.scss'

const TwoRet = ({prevStep, nextStep}) =>{
    const [req,setReq] = useState(false);
    const [info, setInfo] = useState([]);
    const [reqList, setReqList] = useState([]);
    const context = getContext();
    const { state }= context;
    const id = state.activityInfo.id||8
    useEffect(()=>{
        getActivity({id}).then(ret=>{
            const data = ret.data;
            if(data.error_code === 0){
                setInfo(data.data);
            }
        })
        getOrderRequire().then(ret=>{
            const data = ret.data;
            if(data.error_code === 0){
                setReqList(data.data);
            }
        });
        return ()=>{}
    });
    const radioChange =({target})=>{
        console.log(target.value);
    };
    const confirm = ()=>{
        setReq(true);
    }
    
    return <>
        <h3>填写商品信息</h3>
        <h4>核对商品信息</h4>
        <div styleName="block">
            <div>
                <div>
                <label>商品：</label>
                <p>{info.goods_title}</p>
                </div>
                <a onClick={prevStep}>修改</a>
            </div>
            <div>
                <label>规格：</label>
                <p>{info.goods_standard}</p>
                <label>商品售价：</label>
                <p><i>{info.goods_price}</i>元</p>
                <label>每单拍：</label>
                <p><i>{info.goods_nums_per_order}</i>个</p>
            </div>
        </div>
        <h4>如何找到您的商品</h4>
        <div styleName="block">
            <div> 使用“手机淘宝搜索框”查找商品 </div>
            <div>
                <p>来源关键字1：xxxxxxx</p>
            </div>
            <div>
                <p>来源关键字2：xxxxxxx</p>
            </div>
        </div>
        <div styleName="divider"></div>
        <h4>活动下单要求</h4>
        {
            req ? <>
                <div styleName="block">
                    <div>要与小二先聊天</div>
                    <div>不领优惠券</div>
                    <div>禁止使用信用卡、花呗付款</div>
                </div>
                <div styleName="block">
                    <div><a onClick={()=>setReq(false)}>修改</a></div>
                </div>
            </> : <div styleName="block">
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
            <div styleName="btn-wrap">
                <button className="btn primary" onClick={confirm}>确认提交信息</button>
            </div>
        </div> 
        }
        
        <footer>
            <PrevBtn clickFn={prevStep}>上一步</PrevBtn>
            <NextBtn clickFn={nextStep}>下一步</NextBtn>
        </footer>
    </>
}

export default TwoRet