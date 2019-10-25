import React,{useState} from 'react'
import BasicLayout from '../../layout/basic'
import { Tabs, Select } from 'antd'
import './style.scss'
import {timeStr} from '../../common/util'
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/zh-CN';
registerLocale('zh-CN', es);

const { TabPane } = Tabs;
const { Option } = Select;
const Table = ()=>(
<table>
    <thead>
        <tr>
            <th>店铺</th>
            <th>收入(元)</th>
            <th>支出(元)</th>
            <th>冻结(元)</th>
            <th>结余(元)</th>
            <th>时间</th>
            <th>活动编号</th>
            <th>备注</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>清新小铺</td>
            <td><i>123</i></td>
            <td><i>12</i></td>
            <td><i>0.0</i></td>
            <td><i>0.0</i></td>
            <td>2019-1-1</td>
            <td>T132323</td>
            <td>备注</td>
        </tr>
        <tr>
            <td>清新小铺</td>
            <td><i>123</i></td>
            <td><i>12</i></td>
            <td><i>0.0</i></td>
            <td><i>0.0</i></td>
            <td>2019-1-1</td>
            <td>T132323</td>
            <td>备注</td>
        </tr>
    </tbody>
</table>
)
const Records = () => {
    const [s1,setS1] = useState(timeStr(new Date()))
    const [t1,setT1] = useState(timeStr(new Date()))
    const datesChange1 = d => {
        const str = timeStr(d);
        setS1(str);
    }

    const datetChange1 = d => {
        const str = timeStr(d);
        setT1(str);
    }

    const dateChange = d => {

    }

    return <BasicLayout>
        <div styleName="content">
            <h2>资金记录</h2>
            <Tabs type="card">
                <TabPane tab="押金记录" key="1">
                    <div styleName="search">
                        <label>平台：</label>
                        <Select defaultValue="0" style={{ width: 100 }}>
                            <Option value="0">全部</Option>
                            <Option value="1">taobao</Option>
                            <Option value="2">tmall</Option>
                        </Select>
                        <label>店铺：</label>
                        <Select defaultValue="0" style={{ width: 100 }}>
                            <Option value="0">全部</Option>
                            <Option value="1">taobao</Option>
                            <Option value="2">tmall</Option>
                        </Select>
                        <label>起始时间：</label>
                        <DatePicker className="input" locale="zh-CN" onChange={datesChange1} value={s1} />&nbsp;-&nbsp;
                        <DatePicker className="input" locale="zh-CN" onChange={datetChange1} value={t1} />
                    </div>
                    <div styleName="search">
                        <label>任务编号：</label>
                        <input type="text" className="input" />
                        <button className="btn primary">查询</button>
                    </div>
                    <Table/>
                </TabPane>
                <TabPane tab="提现记录" key="2">
                    <div styleName="search">
                        <label>起始时间：</label>
                        <DatePicker className="input" locale="zh-CN" onChange={dateChange} />&nbsp;-&nbsp;
                        <DatePicker className="input" locale="zh-CN" onChange={dateChange} />
                        <label>提现状态：</label>
                        <Select defaultValue="0" style={{ width: 100 }}>
                            <Option value="0">全部</Option>
                            <Option value="1">进行中</Option>
                            <Option value="2">已完成</Option>
                        </Select>
                        <button className="btn primary">查询</button>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>提现流水号</th>
                                <th>提现时间</th>
                                <th>金额(元)</th>
                                <th>状态</th>
                                <th>备注</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>T2343434</td>
                                <td>2019-1-1</td>
                                <td><i>650</i></td>
                                <td>已完成</td>
                                <td>到账需要3-5个工作日，请耐心等候</td>
                                <td>-</td>
                            </tr>
                            <tr>
                                <td>T2343434</td>
                                <td>2019-1-1</td>
                                <td><i>650</i></td>
                                <td>已完成</td>
                                <td>到账需要3-5个工作日，请耐心等候</td>
                                <td>-</td>
                            </tr>
                        </tbody>
                    </table>
                </TabPane>
                <TabPane tab="任务金币记录" key="3">
                    <div styleName="search">
                        <label>平台：</label>
                        <Select defaultValue="0" style={{ width: 100 }}>
                            <Option value="0">全部</Option>
                            <Option value="1">taobao</Option>
                            <Option value="2">tmall</Option>
                        </Select>
                        <label>店铺：</label>
                        <Select defaultValue="0" style={{ width: 100 }}>
                            <Option value="0">全部</Option>
                            <Option value="1">taobao</Option>
                            <Option value="2">tmall</Option>
                        </Select>
                        <label>起始时间：</label>
                        <DatePicker className="input" locale="zh-CN" onChange={dateChange} />&nbsp;-&nbsp;
                        <DatePicker className="input" locale="zh-CN" onChange={dateChange} />
                    </div>
                    <div styleName="search">
                        <label>任务编号：</label>
                        <input type="text" className="input" />
                        <button className="btn primary">查询</button>
                    </div>
                    <Table/>
                </TabPane>
            </Tabs>
        </div>
    </BasicLayout>
}

export default Records