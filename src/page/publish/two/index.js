import React,{useRef,useState,useEffect} from 'react'
import {Input, Icon, message} from 'antd'
import { PrevBtn, NextBtn } from '../stepbtn'
import {getActivity, getKwSortway,getKwService,getCities,updatekeyword, addkeyword as addkeywordReq, updateActivity} from '../../../service'
import {getContext} from '../../../context'
import KwItem from './kwItem'
import './style.scss'

const Two = ({prevStep, nextStep})=>{
    const context = getContext();
    const {state, actions} = context;
    const {setkw,addkw,clearkw } = actions;
    const [sorts,setSorts] = useState([]);
    const [dis,setDis]= useState([]);
    const [cities,setCicies] = useState([]);
    const [info,setInfo] = useState({});

    const [goodUrl,setGoodUrl] = useState(info.goods_url);
    const [goodTitle,setGoodTitle] = useState(info.goods_title);
    const [goodStandard,setGoodStandard] = useState(info.goods_standard);
    const [goodPrice,setGoodPrice] = useState(info.goods_price);
    const [goodNum,setGoodNum] = useState(info.goods_nums_per_order);
    const [question,setQuestion] = useState(info.question);
    const [answer,setAnswer] = useState(info.answer);

    const id = state.activityInfo.id||34;
    const store_id = state.activityInfo.store_id||15;
    const activitytype_id = state.activityInfo.activitytype_id||1;
    const img1 = useRef(null);
    const img2 = useRef(null);
    const kw = {
        name: "",
        price_range: '10|100',
        send_address: '不选择',
        brand: "",
        sort_way: '综合',
        service: '包邮',
        store_classify: '旗舰店',
        extra_info: "",
    }
    useEffect(()=>{
        getActivity({id}).then(ret=>{
            const data = ret.data;
            if(data.error_code === 0){
                const info = data.data;
                setInfo(info);
                setGoodUrl(info.goods_url);
                setGoodTitle(info.goods_title);
                setGoodStandard(info.goods_standard);
                setGoodPrice(info.goods_price);
                setGoodNum(info.goods_nums_per_order);
                setQuestion(info.question);
                setAnswer(info.answer);
                if(!info.keyword_set||!info.keyword_set.length){
                    addKeyword();
                } else {
                    const list = info.keyword_set.map(k=>({
                            uid:k.id,
                            id:k.id,
                            name: k.name,
                            price_range: k.price_range.split('|'),
                            send_address: k.send_address,
                            brand: k.brand,
                            sort_way: k.sort_way,
                            service: (k.service||'').split('|'),
                            store_classify: k.store_classify,
                            extra_info: k.extra_info,
                        }
                    ));
                    setkw(list);
                }
            }
        });
        getKwSortway().then(ret=>{
            const data = ret.data;
            if(data.error_code === 0){
                const list = data.data.map(l=>({
                        id:l.name,
                        name:l.name
                    }
                ));
                setSorts(list);
            }
        });
        getKwService().then(ret=>{
            const data = ret.data;
            if(data.error_code === 0){
                const list = data.data.map(d=>({
                        label: d.name,
                        value: d.name
                    }
                ))
                setDis(list);
            }
        });
        getCities().then(ret=>{
            const data = ret.data;
            if(data.error_code === 0){
                const list = data.data.map(l=>({
                        id:l.name,
                        name:l.name
                    }
                ));
                setCicies(list);
            }
        })
        return clearkw;
    },[]);

    const addKeyword = ()=>{
        addkeywordReq({ activity_id:id, keyword_data:[kw] }).then(ret=>{
            const data = ret.data;
            if(data.error_code === 0){
                let item = data.data.slice(-1)[0];
                if(item){
                    item.uid = item.id;
                    item.price_range = item.price_range.split('|');
                    item.service = item.service.split('|');
                    addkw(item);
                }
            }
        });
        // addkw({uid:Math.floor(Math.random() * 100000),...kw});
    }

    const confirmInfo=()=>{
        if(!goodUrl){
            message.error('商品链接不能为空',1.5);
            return;
        }
        if(!/^https?:\/\/\w+\..+$/.test(goodUrl)){
            message.error('商品链接格式不正确',1.5);
            return; 
        }
        if(!goodTitle){
            message.error('商品标题不能为空',1.5);
            return;
        }
        if(!goodStandard){
            message.error('商品规格不能为空',1.5);
            return;
        }
        if(!goodPrice){
            message.error('商品价格不能为空',1.5);
            return;
        }
        if(!goodNum){
            message.error('商品件数不能为空',1.5);
            return;
        }
        const kws = state.kwList.map(k=>({
                id: k.id,
                activity_id:id,
                name: k.name,
                price_range: k.price_range.join('|'),
                send_address: k.send_address,
                brand: k.brand,
                sort_way: k.sort_way,
                service: k.service.join('|'),
                store_classify: k.store_classify,
                extra_info: k.extra_info,
            }
        ));
        let nameValid = true;
        for(let k of kws){
            if(!k.name){
                nameValid = false;
                break;
            }
        }
        if(!nameValid){
            message.error('关键字来源不能为空',1.5);
            return;
        }
        const param = {
            id,
            store_id,
            activitytype_id, 
            goods_url:goodUrl||'',
            goods_title:goodTitle||'',
            goods_standard:goodStandard||'',
            goods_price: goodPrice||'',
            goods_nums_per_order: goodNum||'',
            img_one: img1.current.src||'',
            img_two: img2.current.src||'',
            question,
            answer
        };
        const hide = message.loading('请求中...');
        Promise.all([updatekeyword({ activity_id:id, keyword_data:kws}),updateActivity(param)]).then(ret=>{
            hide();
            const [aRet,bRet] = ret;
            const adata = aRet.data;
            const bdata = bRet.data;
            console.log(adata,bdata);
            const msgs = [];
            if(adata.error_code === 0 && bdata.error_code === 0){
                nextStep();
            } else {
                if(adata.error_code !== 0){
                    msgs.push(adata.msg);
                }
                if(bdata.error_code !== 0){
                    msgs.push(bdata.msg);
                }
                message.error(msgs.join('|'),2);
            }
        },err=> {
            hide();
            message.error(err.message,2);
        });
    }
    const goodUrlChange = ({target})=>{
        setGoodUrl(target.value);
    }
    const goodTitleChange = ({target})=>{
        setGoodTitle(target.value);
    }
    const goodStandardChange = ({target})=>{
        setGoodStandard(target.value);
    }
    const goodPriceChange = ({target})=>{
        setGoodPrice(target.value);
    }
    const goodNumChange = ({target})=>{
        setGoodNum(target.value);
    }

    const questionChange = ({target})=>{
        setQuestion(target.value);
    }
    const answerChange = ({target})=>{
        setAnswer(target.value);
    }
    return <>
        <h3>填写商品信息</h3>
        <div>
            <div styleName="good-item">
                <label>商品链接：</label>
                <Input styleName="long" value={goodUrl} onChange={goodUrlChange} /> <i>*</i>
            </div>
            <div styleName="good-item">
                <label>商品标题：</label>
                <Input styleName="long" value={goodTitle} onChange={goodTitleChange} /> <i>*</i>
            </div>
            <div styleName="good-item">
                <label>商品规格：</label>
                <Input value={goodStandard} onChange={goodStandardChange} />
                <label>商品售价：</label>
                <Input type="number" value={goodPrice} onChange={goodPriceChange} /> <span>元</span><i>*</i>
                <label>每单拍：</label>
                <Input type="number" value={goodNum} onChange={goodNumChange} /><span>件</span><i>*</i>
            </div>
            <div styleName="good-item">
                下单总金额 <i>{((Number(goodPrice) * Number(goodNum))||0).toFixed(2)}</i> 元
            </div>
        </div>
        <div styleName="divider"/>
        <h3>如何找到您的商品</h3>
        <div styleName="search-good">
            <header styleName="search-header">
                <i>*</i><h4>设置搜索图片</h4>
            </header>
            <div styleName="img-list">
                <div styleName="img-block">
                    <div styleName="img">
                        <img ref={img1} src="https:////g-search3.alicdn.com/img/bao/uploaded/i4/i2/2204161850475/O1CN01bmGRYi1FNageOpDRL_!!2204161850475.jpg" alt=""/>
                    </div>
                    <div>
                        <p>商品主图1</p>
                        <p>图片尺寸 1200*1200以内</p>
                        <p>图片大小：不能大于2M</p>
                        <p>图片格式：jpg、png、gif</p>
                    </div>
                </div>
                <div styleName="img-block">
                    <div styleName="img">
                        <img ref={img2} src="https:////g-search3.alicdn.com/img/bao/uploaded/i4/i2/2204161850475/O1CN01bmGRYi1FNageOpDRL_!!2204161850475.jpg" alt=""/>
                    </div>
                    <div>
                        <p>商品主图1</p>
                        <p>图片尺寸 1200*1200以内</p>
                        <p>图片大小：不能大于2M</p>
                        <p>图片格式：jpg、png、gif</p>
                    </div>
                </div>
            </div>
            {
                state.kwList.map((item,i)=><KwItem key={item.uid} index={i} info={item} sorts={sorts} dis={dis} cities={cities} />)
            }
            <div styleName="plus-btn" onClick={addKeyword}> <Icon type="plus" /> 增加搜索关键词 </div>
            <div styleName="divider"/>
            <header styleName="search-header">
                <i>*</i><h3>设置商品校验问题</h3>
            </header>
            <div styleName="search-item">
                <Input value={question} onChange={questionChange} />
            </div>
            <h4>答案</h4>
            <div styleName="search-item">
                <Input value={answer} onChange={answerChange} />
            </div>
            <div styleName="btn-wrap">
                <button className="btn primary" onClick={confirmInfo}>确认提交信息</button>
            </div>
        </div>
        {/* <footer>
            <PrevBtn clickFn={prevStep}>上一步</PrevBtn>
            <NextBtn clickFn={nextStep}>下一步</NextBtn>
        </footer> */}
    </>
}

export default Two
