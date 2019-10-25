import React,{useState} from 'react'
import {Input, Select, Checkbox, Icon,Divider} from 'antd'
import './style.scss'
import Twocon from '../twocon'

const { Option } = Select;
const SearchItem = ({index})=>(
    <>
    <h4>手机淘宝关键字来源{index+1}</h4>
    <div styleName="search-item">
        <Input/>
    </div>
    <h4>设置排序方式</h4>
    <div styleName="search-item">
        <Checkbox>综合</Checkbox>
        <Checkbox>价格</Checkbox>
        <Checkbox>信用</Checkbox>
        <Checkbox>销量</Checkbox>
        <Checkbox>天猫</Checkbox>
        <Checkbox>店铺</Checkbox>
        <Checkbox>淘宝经验</Checkbox>
        <Checkbox>视频</Checkbox>
    </div>
    <h4>设置筛选方式</h4>
    <div styleName="search-item">
        <label>价格区间：</label>
        <Input/>&nbsp;-&nbsp;<Input/>
        <label>筛选品牌：</label>
        <Input/>
    </div>
    <h4>折扣和服务</h4>
    <div styleName="search-item">
        <Checkbox>包邮</Checkbox>
        <Checkbox>天猫</Checkbox>
        <Checkbox>全球购</Checkbox>
        <Checkbox>消费者保障</Checkbox>
        <Checkbox>手机专享</Checkbox>
        <Checkbox>淘金币抵钱</Checkbox>
        <Checkbox>货到付款</Checkbox>
        <Checkbox>7+天退换货</Checkbox>
        <Checkbox>促销</Checkbox>
    </div>
    <div styleName="search-item">
        <Checkbox>花呗分期</Checkbox>
        <Checkbox>天猫超市</Checkbox>
        <Checkbox>天猫国际</Checkbox>
        <Checkbox>通用排序</Checkbox>
        <Checkbox>赠送运费险</Checkbox>
        <Checkbox>新到商品</Checkbox>
        <Checkbox>公益宝贝</Checkbox>
    </div>
    <h4>店铺类型</h4>
    <div styleName="search-item">
        <Checkbox>旗舰店</Checkbox>
        <Checkbox>专卖店</Checkbox>
        <Checkbox>专营店</Checkbox>
    </div>
    <h4>发货地</h4>
        <Select defaultValue="0" style={{width:'100px'}}>
            <Option value="0">不选择</Option>
            <Option value="1">京津</Option>
            <Option value="2">江浙沪</Option>
        </Select>
    <h4>其他条件</h4>
    <div styleName="search-item">
        <Input/>
    </div>
    </>
)
const Two = ()=>{
    const [items,setItems] = useState([SearchItem]);
    const[ret,setRet] = useState(0);
    const confirmInfo=()=>{
        setRet(1);
    }
    const addSearchItem = ()=>{
        var arr = Object.assign([],items);
        arr.push(SearchItem);
        setItems(arr);
    }
    return <>
        {ret? <Twocon/>:<>
        <h3>填写商品信息</h3>
        <div styleName="good-form">
            <div styleName="good-item">
                <label>商品链接：</label><Input styleName="long" /> <span>*</span>
            </div>
            <div styleName="good-item">
                <label>商品标题：</label><Input styleName="long" /> <span>*</span>
            </div>
            <div styleName="good-item">
                <label>商品规格：</label><Input/>
                <label>商品售价：</label><Input/> <span>*</span>
                <label>每单拍：</label><Input/> <span>*</span>
            </div>
            <div styleName="good-item">
                下单总金额 <span>72</span> 元
            </div>
        </div>
        <Divider/>
        <h3>如何找到您的商品</h3>
        <div styleName="search-good">
            <h4>设置搜索图片</h4>
            <div styleName="search-item">
                <div styleName="img">
                    <img src="https:////g-search3.alicdn.com/img/bao/uploaded/i4/i2/2204161850475/O1CN01bmGRYi1FNageOpDRL_!!2204161850475.jpg" alt=""/>
                </div>
                <div>
                    <p>商品主图1</p>
                    <p>图片尺寸 1200*1200以内</p>
                    <p>图片大小：不能大于2M</p>
                    <p>图片格式：jpg、png、gif</p>
                </div>
            </div>
            {
                items.map((SearchItem,i) =><SearchItem index={i} key={i}/>)
            }
            <div styleName="plus-btn" onClick={addSearchItem}>
                <Icon type="plus" /> 增加搜索关键词
            </div>
            <Divider/>
            <h3>设置商品校验问题</h3>
            <div styleName="search-item">
            <Input/>
            </div>
            <h4>答案</h4>
            <div styleName="search-item">
                <Input/>
            </div>
            <button className="btn primary" style={{marginTop:'10px'}} onClick={confirmInfo}>确认提交信息</button>
        </div>
    </>
    }
    </>
}

export default Two
