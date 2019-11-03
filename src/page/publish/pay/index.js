import React,{useState,useEffect} from 'react'
import {Icon,Divider,message} from 'antd'
import {PrevBtn,NextBtn} from '../stepbtn'
import {Link,useHistory,useParams} from 'react-router-dom'
import { getActivity, getAccount, payActivity } from '../../../service'
import './style.scss'

const Pay=({setStep})=>{
    const history = useHistory();
    const params = useParams();
    const id = params.id;
    const [money,setMoney] = useState(0);
    const [coin,setCoin] = useState(0);
    const [info,setInfo] = useState({
        quantity:0,
        bill:{
            single_add_service_fee: 0,
            single_service_fee: 0,
            single_yajin_fee: 0,
            total_add_service_fee: 0,
            total_service_fee: 0,
            total_yajin_fee: 0
        }
    });
    useEffect(()=>{
        if(!id){
            history.push('/publish/init');
            return;
        }
        setStep(4);
        getActivity({id}).then(ret=>{
            const data = ret.data;
            if(data.error_code === 0){
                const info = data.data;
                setInfo(info);
            }
        });
        getAccount().then(ret=>{
            const data = ret.data;
            if(data.error_code === 0){
                setMoney(data.data.account_yajin.available_money);
                setCoin(data.data.account_gold.available_money);
            }
        })
    },[])

    const submit = () => {
        if(info.bill.total_service_fee + info.bill.total_service_fee > coin){
            message.error('金币不足，请充值后重试');
            return;
        }
        if(info.bill.total_yajin_fee > money){
            message.error('押金不足，请充值后重试');
            return;
        }
        const hide = message.loading('请求中...');
        payActivity({
            yajin_money_num: info.bill.total_yajin_fee,
            gold_money_num: info.bill.total_service_fee + info.bill.total_add_service_fee,
            activity_id: id
        }).then(ret=>{
            hide();
            const data = ret.data;
            if(data.error_code === 0){
                history.push('/publish/ret')
            } else {
                message.error(data.msg,2);
            }
        },err=>{
            hide();
            message.error(err.message,2);
        });
    }
    return <>
        <div styleName="pay">
            <header>
                <h3>支付</h3>
                <p>充值到账可以会有延时，若<span>30分钟</span>内未到账请联系客服</p>
            </header>
            <div styleName="info">
                <p>本次活动发布</p>
                <p>需押金</p>
                <p>金币</p>
            </div>
            <div styleName="info">
                <p>{info.quantity}单</p>
                <p> <span>{info.bill.total_yajin_fee}</span></p>
                <p><span>{info.bill.total_add_service_fee + info.bill.total_service_fee}</span></p>
            </div>
            <Divider/>
            <h4>支付方式</h4>
            <div styleName="pay-label">
                <Icon type="pay-circle" style={{color:'hsl(200,70%,50%)'}} /> 金币支付
            </div>
            <div styleName="pay-item">
                <p>可用金币：(<span>{coin.toFixed(2)}</span>) 1金币 = 1元</p>
                <p>支付：<span>{info.bill.total_add_service_fee + info.bill.total_service_fee}</span> 
                {
                    coin - info.bill.total_add_service_fee - info.bill.total_service_fee < 0 && <>
                        金币不足 还差 <span>{info.bill.total_add_service_fee + info.bill.total_service_fee - coin }</span>金币 <Link to="/chargecoin">前去充值</Link>
                    </>
                }
                </p>
            </div>
            <div styleName="pay-label">
                <Icon type="money-collect" style={{color:'hsl(200,70%,50%)'}} /> 押金支付
            </div>
            <div styleName="pay-item">
                <p>可用押金：(<span>{money}</span>) </p>
                <p>支付：<span>{info.bill.total_yajin_fee}</span> 
                    {
                        money - info.bill.total_yajin_fee < 0 ? <> 押金不足 还差 <span>{info.bill.total_yajin_fee - money }</span>押金 <Link to='/chargecash'>前去充值</Link> </>:null
                    }
                </p>
            </div>
        </div>
        <footer>
            <PrevBtn clickFn={()=>history.push('/publish/ser/'+id)}>上一步</PrevBtn>
            <NextBtn clickFn={submit}>付款报名活动</NextBtn>
        </footer>
    </>
}

export default Pay