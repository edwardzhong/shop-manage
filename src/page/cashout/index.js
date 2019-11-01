import React,{useState,useEffect} from 'react'
import { moneyOut, getAccount } from '../../service'
import {Link} from 'react-router-dom'
import {message} from 'antd'
import './style.scss'

const Cashout =({history})=>{
    const [money,setMoney] = useState(0);
    const [num,setNum] = useState('');
    const [pass,setPass] = useState('');

    useEffect(()=>{
        getAccount().then(ret=>{
            const data = ret.data;
            if(data.error_code === 0){
                setMoney(data.data.account_yajin.available_money);
            }
        })
    },[]);
    const numChange = ({target}) =>{
        setNum(target.value);
    }
    const passChange = ({target}) =>{
        setPass(target.value);
    }
    const submit = () => {
        if(!num){
            message.error('金额不能为空',1.5);
            return;
        }
        if(Number(num)<5){
            message.error('每次提现至少5元',1.5);
            return;
        }
        if(Number(num) > money){
            message.error('提现的押金不足',1.5);
            return;
        }
        if(!pass){
            message.error('密码不能为空',1.5);
            return;
        }
        const hide = message.loading('请求中...')
        moneyOut({tixian_password: pass, money_num: num }).then(ret=>{
            hide();
            const data = ret.data;
            if(data.error_code === 0){
                message.success('已成功提交押金提现',1.5)
                setTimeout(() => {
                    history.push('/');    
                }, 1600);
            } else {
                message.error(data.msg,2);
            }
        },err=>{
            hide();
            message.error(err.message,2);
        })
    }
    return <div styleName="content">
        <h2>押金提现</h2>
        <div styleName="divider"></div>
        <div styleName="block">
            <div>
                <label>押金：</label>
                <p><i>{money.toFixed(2)}</i>元</p>
            </div>
            <div>
                <label>退款方式：</label>
                <p>原路返回(3-7个工作日) <span>钱款原路返回到您之前的账户</span></p>
            </div>
            <div>
                <label>提取金额：</label>
                <p><input type="number" className="input" value={num} onChange={numChange} /> <span>每次最少提现5元</span></p>
            </div>
            <div>
                <label></label>
                <p>提现操作平台将收取0.3%的手续费，手续费最低2元/笔</p>
            </div>                
            <div>
                <label></label>
                <p><i>预计两个工作日内完成（法定假日和双休日顺延）平台提现操作和到账时间以各大银行为准，预计3-5个工作日内</i></p>
            </div>
            <div>
                <label>实际到账金额：</label>
                <p><i>0.00</i>元</p>
            </div>
            <div>
                <label>提现密码：</label>
                <p><input type="text" className="input" value={pass} onChange={passChange} /> <Link to='/getpass'>找回提现密码</Link></p>
            </div>
            <div>
                <label></label>
                <button className="btn primary" onClick={submit}>申请提现</button>
            </div>
        </div>
        <h2>温馨提示</h2>
        <p>1、请确保您输入的提现金额，以及支付宝或银行账号信息准确无误</p>
        <p>2、请确保您输入的提现金额，以及支付宝或银行账号信息准确无误</p>
        <p>3、请确保您输入的提现金额，以及支付宝或银行账号信息准确无误</p>
        <p>4、请确保您输入的提现金额，以及支付宝或银行账号信息准确无误</p>
    </div>
}

export default Cashout