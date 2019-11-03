import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { getContext } from "../../../context";
import "./style.scss";

const Result = ({ setStep }) => {
	const history = useHistory();
	const context = getContext();
	const { actions } = context;
	const [sec, setSec] = useState(5);
	useEffect(() => {
		setStep(5);
		actions.clearActivity();
	}, []);
	useEffect(() => {
		let timer = setInterval(() => {
			setSec(sec - 1);
			if(sec == 0) history.push("/");
		}, 1000);;
		return () => clearInterval(timer);
	}, [sec]);
	return (
		<div styleName='result'>
			<i styleName='check-circle'>
				<svg
					viewBox='64 64 896 896'
					focusable='false'
					data-icon='check-circle'
					width='1em'
					height='1em'
					fill='currentColor'
					aria-hidden='true'>
					<path d='M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 0 1-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z'></path>
				</svg>
			</i>
			<h2>支付成功，活动审核中</h2>
			<p>
				<Link to='/'>返回首页</Link>
				<span>({sec}秒后返回首页)</span>
			</p>
		</div>
	);
};

export default Result;
