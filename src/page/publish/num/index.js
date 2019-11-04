import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getActivity, updatekeyword, updateActivitySer } from "../../../service";
import { getContext } from "../../../context";
import { Input, Radio, Divider, message } from "antd";
import Table from "../../../component/table";
import { PrevBtn, NextBtn } from "../stepbtn";
import "./style.scss";

const KwItem = ({ index, info, updatekw }) => {
	const quanChange = ({ target }) => {
		updatekw({ id: info.id, quantity: target.value });
	};
	return (
		<div>
			<label>关键词{index + 1}：</label>
			<span>{info.name} </span>&nbsp;
			<Input type='number' value={info.quantity} onChange={quanChange} />
			<span>单</span>
		</div>
	);
};
const Num = ({ setStep }) => {
	const history = useHistory();
	const params = useParams();
	const id = params.id;
	const context = getContext();
	const { dispatch } = context;

	const [info, setInfo] = useState({ bill: { single_service_fee: 0 } });
	const [quantity, setQuan] = useState(1);
	const [num, setNum] = useState(1);
	const [kwList, setkwList] = useState([]);

	useEffect(() => {
		if (!id) {
			history.push("/publish/init");
			return;
		}
		setStep(2);
		getActivity({ id }).then(ret => {
			const data = ret.data;
			if (data.error_code === 0) {
				const info = data.data;
				info.store_id = info.store.id;
				info.activitytype_id = info.activitytype.id; 
				setInfo(info);
				const num = Number(info.quantity || 1);
				setQuan([1, 3, 5, 10, 20, 100].indexOf(num) < 0 ? 0 : num);
				if (info.keyword_set && info.keyword_set.length) {
					const list = info.keyword_set.map(k => ({
						id: k.id,
						name: k.name,
						quantity: k.quantity || 0
					}));
					setkwList(list);
				}
			} else {
                message.error(data.msg,2);
            }
		});
	}, []);

	const column = [
		{ title: "分类", data: "cate" },
		{ title: "单价", data: "price", render: d => <> <i>{d}</i>金币/单 </> },
		{ title: "数量", data: "num", render: d => <> <i>{d}</i>单 </> },
		{ title: "合计", data: "total", render: d => <> <i>{d}</i>金币 </> }
	];
	const data = [
		{ 
            cate: "服务费",
			price: info.bill.single_service_fee,
			num: quantity === 0 ? num : quantity,
			total: (quantity === 0 ? num : quantity) * info.bill.single_service_fee
		}
	];

	const quanChange = ({ target }) => {
		setQuan(target.value);
	};
	const numChange = ({ target }) => {
		setNum(target.value);
	};

	const updatekw = info =>{
		for(let l of kwList){
			if(l.id == info.id){
				Object.assign(l,info);
				break;
			}
		}
		setkwList([...kwList]);
	}
	const confirm = () => {
		const n = quantity === 0 ? num : quantity;
		let kn = 0;
		const kws = kwList.map(k => ({
			id: Number(k.id),
			activity_id: Number(id),
			quantity: Number(k.quantity)
		}));
		for (let k of kws) {
			kn += k.quantity;
		}
		if (kn != n) {
			message.error("关键词总数与订单数不一致", 1.5);
			return;
		}
		const param = {
			id: Number(id),
            store_id:info.store_id,
            activitytype_id:info.activitytype_id, 
			quantity: n
		};
		const hide = message.loading("请求中...");
		Promise.all([ updatekeyword({ activity_id: Number(id), keyword_data: kws }), updateActivitySer(dispatch, param) ]).then( ret => {
            hide();
            const [aRet, bRet] = ret;
            const adata = aRet.data;
            const bdata = bRet.data;
            const msgs = [];
            if (adata.error_code === 0 && bdata.error_code === 0) {
                history.push("/publish/ser/"+id);
            } else {
                if (adata.error_code !== 0) {
                    msgs.push(adata.msg);
                }
                if (bdata.error_code !== 0) {
                    msgs.push(bdata.msg);
                }
                message.error(msgs.join("|"), 2);
            }
        }, err => {
            hide();
            message.error(err.message, 2);
        });
	};

	return (
		<>
			<h4>1.选择活动数量</h4>
			<div styleName='block'>
				<div>
					<Radio.Group value={quantity} onChange={quanChange}>
						<Radio value={1}>1单</Radio>
						<Radio value={3}>3单</Radio>
						<Radio value={5}>5单</Radio>
						<Radio value={10}>10单</Radio>
						<Radio value={20}>20单</Radio>
						<Radio value={100}>100单</Radio>
						<Radio value={0}>自定义</Radio>
					</Radio.Group>
					<Input value={num} onChange={numChange} step="1" min="1" max="10000" />单
					<span>(1-500单)</span>
				</div>
			</div>
			<Divider />
			<h4>2.设置成交关键词分布</h4>
			<div styleName='block'>
				<p>
					注意：各关键词订单总数需要为
					<i>{quantity === 0 ? num : quantity}</i>单
				</p>
				{ kwList.map((item, i) => <KwItem key={i} index={i} info={item} updatekw={updatekw} /> )}
			</div>
			<Divider />
			<h4>费用小计</h4>
			<div styleName='block'>
				<Table column={column} data={data} />
			</div>
			<footer>
				<PrevBtn clickFn={() => history.push("/publish/inforet/"+id)}> 上一步 </PrevBtn>
				<NextBtn clickFn={confirm}>下一步</NextBtn>
			</footer>
		</>
	);
};

export default Num;
