import React,{useState} from 'react'
import {Input, Checkbox, Divider} from 'antd'
import Table from '../../../component/table'
import {PrevBtn,NextBtn} from '../stepbtn'
import './style.scss'

const Three = ({prevStep,nextStep}) =>{
    const column =[
        {title:'分类',data:'cate'},
        {title:'单价',data:'price',render:d=><><i>{d}</i>金币/单</>},
        {title:'数量',data:'num',render:d=><><i>{d}</i>单</>},
        {title:'合计',data:'total',render:d=><><i>{d}</i>金币</>},
    ];
    const data =[
        { cate:'服务费', price:10.40, num:20, total:208,}
    ]
    return <>
        <h4>1.选择活动数量</h4>
        <div styleName="block">
            <div>
                <Checkbox>1单</Checkbox>
                <Checkbox>3单</Checkbox>
                <Checkbox>5单</Checkbox>
                <Checkbox>10单</Checkbox>
                <Checkbox>20单</Checkbox>
                <Checkbox>100单</Checkbox>
                <Checkbox>自定义</Checkbox>
                <Input/>单<span>(1-500单)</span>
            </div>
        </div>
        <Divider/>
        <h4>2.设置成交关键词分布</h4>
        <div styleName="block">
            <div>
                <label> 手机淘宝关键词1：</label>
                <span>书包男时尚</span><Input/> <span>单</span>
            </div>
            <div>
                <label> 手机淘宝关键词2：</label>
                <span>书包男</span><Input/> <span>单</span>
            </div>
        </div>
        <Divider/>
        <h4>费用小计</h4>
        <div styleName="block">
            <Table column={column} data={data}/>
        </div>
        <footer>
            <PrevBtn clickFn={prevStep}>上一步</PrevBtn>
            <NextBtn clickFn={nextStep}>下一步</NextBtn>
        </footer>
    </>
}

export default Three