import React,{useState} from 'react'
import {Steps,Icon} from 'antd'
import './style.scss'
import One from './one'
import Two from './two'
import Three from './three'
import Four from './four'
import Result from './result'
import Pay from './pay'

const { Step } = Steps;
const Publish=()=>{
    const[step,setStep] = useState(0);
   
    const handleChange = i =>{
        if(i >= step) return;
        setStep(i);
    };

    const prevStep = ()=>{
        setStep(step-1);
    }
    const nextStep = ()=>{
        setStep(step+1);
    }

    return <div styleName="content">
        <h2>商家报名活动</h2>
        <div styleName="steps">
            <Steps size="small" current={step} onChange={handleChange}>
                <Step title="选活动类型" />
                <Step title="填写商品信息" />
                <Step title="选择活动数量" />
                <Step title="选增值服务" />
                <Step title="支付" />
                <Step title="发布成功" />
            </Steps>
        </div>
        {
            step == 0 && <One prevStep={prevStep} nextStep={nextStep}/>
        }
        {
            step == 1 && <Two prevStep={prevStep} nextStep={nextStep}/>
        }   
        {
            step == 2 && <Three prevStep={prevStep} nextStep={nextStep}/>
        }
        {
            step == 3 && <Four prevStep={prevStep} nextStep={nextStep}/>
        }
        {
            step == 4 && <Pay prevStep={prevStep} nextStep={nextStep}/>
        }
        {
            step == 5 && <Result/>
        }
    </div>
}

export default Publish
