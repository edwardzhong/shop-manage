import React, { useState } from "react";
import Init from "./init";
import Info from "./info";
import InfoRet from "./inforet";
import Num from "./num";
import Service from "./service";
import Pay from "./pay";
import Result from "./result";
import { Steps } from "antd";
import { Switch, Route, Redirect } from "react-router-dom";
import "./style.scss";

const { Step } = Steps;
const Publish = ({ history }) => {
	const [step, setStep] = useState(0);
	const handleChange = i => {
		if (i >= step) return;
		setStep(i);
		selectPage(i);
	};

	const selectPage = i => {
		let path = "init";
		switch (i) {
			case 0: path = "init"; break;
			case 1: path = "info"; break;
			case 2: path = "num"; break;
			case 3: path = "ser"; break;
			case 4: path = "pay"; break;
			case 5: path = "ret"; break;
			default: break;
		}
		history.push("/publish/" + path);
	};

	return (
		<div styleName='content'>
			<h2>商家报名活动</h2>
			<div styleName='steps'>
				<Steps size='small' current={step} onChange={handleChange}>
					<Step title='选活动类型' />
					<Step title='填写商品信息' />
					<Step title='选择活动数量' />
					<Step title='选增值服务' />
					<Step title='支付' />
					<Step title='发布成功' />
				</Steps>
			</div>
			<Switch>
				<Route path='/publish/init'>
					<Init setStep={setStep} />
				</Route>
				<Route path='/publish/info/:id'>
					<Info setStep={setStep} />
				</Route>
				<Route path='/publish/inforet/:id'>
					<InfoRet setStep={setStep} />
				</Route>
				<Route path='/publish/num/:id'>
					<Num setStep={setStep} />
				</Route>
				<Route path='/publish/ser/:id'>
					<Service setStep={setStep} />
				</Route>
				<Route path='/publish/pay/:id'>
					<Pay setStep={setStep} />
				</Route>
				<Route path='/publish/ret'>
					<Result setStep={setStep} />
				</Route>
				<Redirect to='/publish/init' />
			</Switch>
		</div>
	);
};

export default Publish;
