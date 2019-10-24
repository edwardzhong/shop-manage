import React,{useState} from 'react'
import BasicLayout from '../../layout/basic'
import {Steps,Icon} from 'antd'
import './style.scss'
import One from './one'
import Two from './two'
import Three from './three'

const { Step } = Steps;
const Publish=()=>{
    const[step,setStep] = useState(0);
    return <BasicLayout>
        <div styleName="content">
            <h2>商家报名活动</h2>
            <div styleName="steps">
                <Steps size="small" current={step}>
                    <Step title="选活动类型" />
                    <Step title="填写商品信息" />
                    <Step title="选择活动数量" />
                    <Step title="选增值服务" />
                    <Step title="支付" />
                    <Step title="发布成功" />
                </Steps>
            </div>
            {/* <Divider/> */}
            <Three/>
            <footer>
                <div styleName="step-btn">
                    <Icon type="left" /><span>上一步</span>
                </div>
                <div styleName="step-btn">
                    <span>下一步</span><Icon type="right" />
                </div>
            </footer>
        </div>
    </BasicLayout>
}

export default Publish
