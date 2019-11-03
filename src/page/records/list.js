import React, { useState, useEffect } from "react";
import { getAccountRecords } from "../../service";
import { Select, DatePicker, Icon, Spin } from "antd";
import Table from "../../component/table";
import "./style.scss";
import locale from "antd/es/date-picker/locale/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";
moment.locale("zh-cn");

const { RangePicker } = DatePicker;
const { Option } = Select;
const List = ({ tag, shopTypes, shopList }) => {
	const [moneys, setMoneys] = useState([]);
	const [moneyList, setMoneyList] = useState([]);
	const [loading,setLoading] = useState(true);
	const column = [
		{ title: "店铺", data: "name" },
		{ title: "收入(元)", data: "in", render: d => <i>{d}</i> },
		{ title: "支出(元)", data: "out", render: d => <i>{d}</i> },
		{ title: "冻结(元)", data: "frozen", render: d => <i>{d}</i> },
		{ title: "结余(元)", data: "remain", render: d => <i>{d}</i> },
		{ title: "时间", data: "time" },
		{ title: "活动编号", data: "num" },
		{ title: "备注", data: "bz" }
	];

	const listFilter = (list, opt = {}) => {
		return list
			.filter((l, i) => {
				if (opt.type && l.activity.store.platformtype.id != opt.type)
					return false;
				if (opt.name && l.activity.store.store_name != opt.name)
					return false;
				if (opt.num && !RegExp(opt.num).test(l.activity.activity_num))
					return false;
				if (opt.st && moment(l.activity.update_time).isBefore(opt.st))
					return false;
				if (opt.st && moment(l.activity.update_time).isAfter(opt.et))
					return false;
				return true;
			})
			.map(l => ({
				name: l.activity.store.store_name,
				in: l.income,
				out: l.payment,
				frozen: l.money_nums,
				remain: l.remain,
				time: moment(new Date(l.activity.update_time)).format( "YYYY-MM-DD HH:mm" ),
				num: l.activity.activity_num,
				bz: ""
			}));
	};

	useEffect(() => {
		setLoading(true);
		getAccountRecords({ tag: tag }).then(ret => {
			const data = ret.data;
			setLoading(false);
			if (data.error_code === 0) {
				setMoneys(data.data);
				setMoneyList(listFilter(data.data));
			}
		});
	}, []);

	const [shopTypeVal, setShopTypeVal] = useState(0);
	const [shopVal, setShopVal] = useState("");
	const shopTypeChange = val => {
		setShopTypeVal(val);
	};
	const shopChange = val => {
		setShopVal(val);
	};

	const [sTime, setSTime] = useState();
	const [eTime, setETime] = useState();
	const timeChange = d => {
		setSTime(d[0]);
		setETime(d[1]);
	};
	const [num, setNum] = useState("");
	const numChange = ({ target }) => {
		setNum(target.value);
	};

	const submit = () => {
		setMoneyList(
			listFilter(moneys, {
				st: sTime,
				et: eTime,
				type: shopTypeVal,
				name: shopVal,
				num: num
			})
		);
	};

	return (
		<>
			<div styleName='search'>
				<label>平台：</label>
				<Select value={shopTypeVal} onChange={shopTypeChange} style={{ width: 100 }}>
					<Option value={0}>全部</Option>
					{shopTypes.map((s, i) => <Option key={i} value={s.id}> {s.name} </Option> )}
				</Select>
				<label>店铺：</label>
				<Select value={shopVal} onChange={shopChange} style={{ width: 150 }}>
					<Option value=''>全部</Option>
					{shopList.map((s, i) => <Option key={i} value={s.store_name}> {s.store_name} </Option> )}
				</Select>
				<label>时间范围：</label>
				<RangePicker
					locale={locale}
					showTime={{ format: "HH:mm" }}
					format='YYYY-MM-DD HH:mm'
					placeholder={["开始时间", "结束时间"]}
					value={[sTime, eTime]}
					onChange={timeChange}
					onOk={timeChange}
				/>
			</div>
			<div styleName='search'>
				<label>任务编号：</label>
				<input type='text' className='input' value={num} onChange={numChange} />
				<button className='btn primary' onClick={submit}> 查询 </button>
			</div>
			<Table column={column} data={moneyList} />
			{
				loading && <div styleName="loading">
                    <Icon type="loading" style={{ fontSize: 30 }} spin />
				</div>
			}
		</>
	);
};

export default List;
