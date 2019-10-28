import React, { useRef, useState, useEffect } from 'react'
import { getContext } from '../../context'
import { Radio, Steps, message } from 'antd'
import Table from '../../component/table'
import { randomCode,timeStr } from '../../common/util'
import useForm  from '../../common/useForm';
import { shopList, bindShop as bindRequset} from '../../service'
import './style.scss'
const { Step } = Steps;

const BindShop = () => {
    const { state, actions } = getContext();
    const [storeType, setStoreType] = useState('1');
    const [list , setList] = useState([]);
    const [ formState, { text, password }] = useForm({code:randomCode(6).join('')});
    const statusObj ={
        '0':'不通过',
        '1':'通过',
        '2':'审核中',
    };
    useEffect(()=>{
        shopList().then(ret=>{
            const data = ret.data;
            if(data.error_code === 0){
                const list = data.data.map(l=>{
                    l.platform = l.platformtype.name;
                    l.telephone = l.shopuser.telephone;
                    l.sname = statusObj[''+l.status];
                    l.date = timeStr(l.create_time);
                    return l;
                });
                setList(list);
            }
        })
    },[]);
    const column = [
        {title:'所属平台',data:'platform'},
        {title:'店铺名',data:'store_name'},
        {title:'店铺旺旺',data:'store_acount'},
        {title:'店铺网址',data:'store_url'},
        {title:'状态',data:'sname'},
        {title:'绑定日期',data:'date'},
    ];
    
    const submit = ()=>{
        const values = formState.values;
        const hide = message.loading('发送请求..', 0);
        bindRequset({...values, platformtype_id:storeType}).then(ret=>{
            hide();
            const data = ret.data;
            if(data.error_code === 0){
                message.success('店铺绑定成功', 2);
            } else {
                message.error(data.msg, 2);
            }
        },err => {
            hide();
            message.error(err.message, 2);
        });
    }
    return <div styleName="content">
        <header styleName="header">
            <div>
                <h2 styleName="title">绑定新账户</h2>
                <span>（近活动对应的买手可见，不会被泄露）</span>
            </div>
            <Steps styleName="steps" current={2} size="small">
                <Step title="注册账号" />
                <Step title="绑定店铺" />
            </Steps>
        </header>
        <p styleName="desc">请先完成下面的店铺信息，绑定店铺后即可进入报名活动页面</p>
        <div styleName="form">
            <div styleName="form-item">
                <label styleName="label">店铺类型：</label>
                <Radio.Group defaultValue={storeType}>
                    <Radio value="1">淘宝</Radio>
                    <Radio value="2">天猫</Radio>
                </Radio.Group>
            </div>
            <div styleName="form-item">
                <label styleName="label">店铺主旺旺：</label>
                <input className="input" {...text('store_acount')}/>
                <span>（店铺主旺旺绑定后无法修改和删除）</span>
            </div>
            <div styleName="form-item">
                <label styleName="label">店铺名称：</label>
                <input className="input" {...text('store_name')} />
                <span>（店铺名称绑定后无法修改和删除）</span>
            </div>
            <div styleName="form-item">
                <label styleName="label">店铺首页网址：</label>
                <input className="input" {...text('store_url')} />
            </div>
            <div styleName="form-item">
                <label styleName="label">验证码：</label>
                <input className="input" styleName="code-input"  {...text('code')} />
                <button className="btn">复制</button>
            </div>
            <div styleName="img-block">
                <p>1、将验证码加到您店铺的某个商家商品的标题上，类似这样</p>
                <img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />
                <p>2、将这个商品详情页链接复制到下面输入框</p>
                <p>提示：店铺绑定成功后，商品标题中添加的验证码可以去掉</p>
            </div>
            <div styleName="form-item">
                <label styleName="label">商品网址（URL）：</label>
                <input className="input" {...text('goods_url')} />
            </div>
            <div styleName="form-item">
                <label styleName="label"/>
                <p styleName="error">如无法绑定店铺或绑定店铺失败，请联系在线客服处理</p>
            </div>
            <div styleName="form-item">
                <label styleName="label"/>
                <button className="btn primary" onClick={submit}>确认绑定</button>
            </div>
        </div>
        <div styleName="shop-list">
            <h3>已绑定的店铺</h3>
            <Table column={column} data={list}/>
            <p>共2条</p>
        </div>
    </div>
}

export default BindShop;