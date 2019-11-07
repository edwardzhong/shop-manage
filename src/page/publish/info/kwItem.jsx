import React,{useRef,useState} from 'react'
import {Input, Select, Checkbox, Radio} from 'antd'
import './style.scss'

const {Option} = Select;
const KwItem = ({index,info,sorts,dis,cities,removekw,updatekw})=> {
    const id = info.id;
    const minPrice = useRef(null);
    const maxPrice = useRef(null);
    const [sortVal,setSortVal] = useState(info.sort_way);
    const [shopType,setShopType] = useState(info.store_classify);
    const [address,setAddress] = useState(info.send_address);
    const [services,setServices] = useState(info.service);

    const nameChange = ({target})=>{
        updatekw({id,name:target.value});
    }
    const brandChange = ({target})=>{
        updatekw({id,brand:target.value});
    }
    const extraChange = ({target})=>{
        updatekw({id,extra_info:target.value});
    }
    const minChange = ({target})=>{
        updatekw({id,price_range:[target.value,maxPrice.current.state.value]});
    }
    const maxChange = ({target})=>{
        updatekw({id,price_range:[minPrice.current.state.value,target.value]});
    }
    const sortChange = ({target})=>{
        const val = target.value;
        setSortVal(val);
        updatekw({id,sort_way:val});
    }
    const shopTypeChange = ({target})=>{
        const val = target.value;
        setShopType(val);
        updatekw({id,store_classify:val});
    }
    const servicesChange = ids=>{
        setServices(ids);
        updatekw({id,service:ids});
    }
    const addChange = aid=>{
        setAddress(aid);
        updatekw({id,send_address:aid});
    }
    return <>
        {index > 0 && <div styleName="divider"/> }
        <header styleName="search-header">
            <i>*</i>
            <h4>关键字来源{index+1}</h4>
            <a onClick={()=>removekw(id)}> &nbsp;删除</a>
        </header>
        <div styleName="search-item">
            <Input value={info.name} onChange={nameChange}/>
        </div>
        <header styleName="search-header">
            <i>*</i><h4>设置排序方式</h4>
        </header>
        <div styleName="search-item">
            <Radio.Group onChange={sortChange} value={sortVal}>
            <Radio value="">不选择</Radio>
            {
                sorts.map((s,i)=><Radio key={i} value={s.id}>{s.name}</Radio>)
            }
            </Radio.Group>
        </div>
        <h4>设置筛选方式</h4>
        <div styleName="search-item">
            <label>价格区间：</label>
            <Input type="number" ref={minPrice} value={info.price_range[0]} onChange={minChange} />
            &nbsp;-&nbsp;
            <Input type="number" ref={maxPrice} value={info.price_range[1]} onChange={maxChange} />
            <label styleName="label">筛选品牌：</label>
            <Input value={info.brand} onChange={brandChange} />
        </div>
        <h4>折扣和服务</h4>
        <div styleName="search-item">
            <Checkbox.Group options={dis} value={services} onChange={servicesChange}/>
        </div>
        <header styleName="search-header">
            <i>*</i><h4>店铺类型</h4>
        </header>
        <div styleName="search-item">
        <Radio.Group onChange={shopTypeChange} value={shopType}>
            <Radio value="">不选择</Radio>
            <Radio value='旗舰店'>旗舰店</Radio>
            <Radio value='专卖店'>专卖店</Radio>
            <Radio value='专营店'>专营店</Radio>
        </Radio.Group>
        </div>
        <h4>发货地</h4>
        <div styleName="search-item">
            <Select value={address} onChange={addChange} style={{width:'100px'}}>
                <Option value="">不选择</Option>
                {
                    cities.map((c,i)=><Option key={i} value={c.id}>{c.name}</Option>)
                }
            </Select>
        </div>
        <h4>其他条件</h4>
        <div styleName="search-item">
            <Input value={info.extra_info} onChange={extraChange}/>
        </div>
    </>
}

export default KwItem