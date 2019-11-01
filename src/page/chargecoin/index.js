import React,{useState,useEffect} from 'react'
import { Checkbox, Radio, message } from 'antd'
import { getAccount, coinIn } from '../../service'
import { Link } from 'react-router-dom'
import './style.scss'

const ChargeCoin =({history})=>{
    const [money,setMoney] = useState(0);
    const [num,setNum] = useState(100);

    useEffect(()=>{
        getAccount().then(ret=>{
            const data = ret.data;
            if(data.error_code === 0){
                setMoney(data.data.account_yajin.available_money);
            }
        })
    },[]);

    const numChange = ({target})=>{
        setNum(target.value);
    }
    const submit = () => {
        if(num > money) {
            message.error('押金不足',2);
            return;
        }
        const hide = message.loading('请求中...');
        coinIn({ gold_num: num }).then(ret=>{
            hide();
            const data = ret.data;
            if(data.error_code === 0){
                history.goBack();
            } else {
                message.error(data.msg,2);
            }
        }, err=> {
            hide();
            message.error(err.message,2);
        })
    }
    return <div styleName="content">
        <h2>商家购买金币</h2>
        <div styleName="divider"></div>
        <h3>1.请选择充值金币</h3>
        <ul styleName="list">
            <Radio.Group value={num} onChange={numChange}>
                <li><Radio value={100}>100金币体验包</Radio> <i>100元</i></li>
                <li><Radio value={500}>500金币体验包</Radio><i>500元</i></li>
                <li><Radio value={1000}>1000金币体验包</Radio><i>1000元</i></li>
                <li><Radio value={2000}>2000金币体验包</Radio><i>2000元</i></li>
            </Radio.Group>
            <li styleName="pay-li">
                <div>您已选择购买<i>{num}</i>金币体验包</div>
                <p>需支付<i>{num}</i>元</p>
            </li>
        </ul>
        <div styleName="divider"></div>
        <h3>2.支付</h3>
        <div>
            <Checkbox checked>使用押金支付(可用押金<i>{money.toFixed(2)}</i>元) </Checkbox>
        </div>
        <div styleName="pay">
        {
            money < num ? <p>押金不足，还差<i>{ num - money}</i>元，<Link to='/chargecash'>前去充值</Link></p> : <p>确认支付：<i>{num}</i>元</p>
        }
        </div> 
        <div>
            温馨提示：<i>商家报名活动需要使用金币支付给买手及平台服务费，不能作押金，不可提现，仅作平台消费</i>
        </div>
        {
             money >= num && <div styleName="btn-block">
                <button className="btn primary" onClick={submit}> 确定支付 </button>
            </div>
        }
    </div>
}

export default ChargeCoin

