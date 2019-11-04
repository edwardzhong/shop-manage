import { get, post, put, del } from "./common/request";
import { loginAdd, loginClear, selfAdd, selfClear, setActivity } from "./action";

const login = arg => post("shopcms/login/", arg);
const register = arg => post("shopcms/register/", arg);
const smsCode = arg => post("tools/sms_code/", arg);
const changePass = arg => post("shopcms/change_passwd/", arg);
const findPass = arg => post('shopcms/find_passwd/', arg);
const userInfo = arg => get(`shopcms/userinfo/${arg.id}/`);
const updateUser = arg => put(`shopcms/userinfo/${arg.id}/`, arg);
const bindShop = arg => post("shopcms/store/", arg);
const getShopList = arg => get("shopcms/store/", arg);
const createActivity = arg => post("shopcms/activity/", arg);
const updateActivity = arg => put(`shopcms/activity/${arg.id}/`, arg);
const activityList = () => get("config/activity_type/");
const getKwSortway = () => get("config/keywords_sortway/");
const getKwService = () => get("config/keywords_service/");
const getOrderRequire = () => get("config/order_requirement/");
const getPlusService = () => get("config/add_service/");
const getOrders = () => get('shopcms/orders/');
const getCities = () => get("config/city/");
const getShopType = () => get("config/store_type/");
const getActivityList = arg => get('shopcms/activity/shop_list/',arg);
const getActivity = arg => get(`shopcms/activity/${arg.id}/`);
const updatekeyword = arg => put("shopcms/keyword/batch_update/", arg);
const addkeyword = arg => post("shopcms/keyword/", arg);
const removekeyword = arg => del(`shopcms/keyword/${arg.id}/`, arg);
const getAccount = () => get("shopcms/account/");
const moneyOut = arg => post("shopcms/account_output_log/", arg);
const payActivity = arg => post("shopcms/account_activity/", arg);
const waitforPayActivity = arg =>post('shopcms/status_pending/',arg);
const cancelActivity = arg => post('shopcms/cancel_activity/',arg);
const coinIn = arg => post("shopcms/account_gold_input/", arg);
const getMoneyOutRecords = arg => get("shopcms/account_tixian/", arg);
const getAccountRecords = arg => get("shopcms/account_activity/", arg);
const getQiniuToken = ()=> get("tools/upimagstoken/");

async function loginSer(dispatch, payload) {
	// try {
	const ret = await login(payload);
	if (ret.data.error_code === 0) {
		dispatch(loginAdd(ret.data.data));
		localStorage.setItem("loginInfo", JSON.stringify(ret.data.data));
	} else {
		dispatch(loginClear());
		localStorage.removeItem("loginInfo");
	}
	return ret;
	// } catch (err) {
	//     dispatch(loginClear());
	//     localStorage.removeItem('loginInfo');
	// 	return err;
	// }
}

async function registerSer(dispatch, payload) {
	const ret = await register(payload);
	if (ret.data.error_code === 0) {
		dispatch(loginAdd(ret.data.data));
		localStorage.setItem("loginInfo", JSON.stringify(ret.data.data));
	}
	return ret;
}

async function userInfoSer(dispatch, payload) {
	const ret = await userInfo(payload);
	if (ret.data.error_code === 0) {
		dispatch(selfAdd(ret.data.data));
		localStorage.setItem("selfInfo", JSON.stringify(ret.data.data));
	}
	return ret;
}

async function userUpdateSer(dispatch, payload) {
	const ret = await updateUser(payload);
	if (ret.data.error_code === 0) {
		dispatch(selfAdd(ret.data.data));
		localStorage.setItem("selfInfo", JSON.stringify(ret.data.data));
	}
	return ret;
}

async function logoutSer(dispatch) {
	dispatch(loginClear());
	dispatch(selfClear());
	localStorage.removeItem("loginInfo");
	localStorage.removeItem("selfInfo");
}

async function createActivitySer(dispatch, payload) {
	const ret = await createActivity(payload);
	if (ret.data.error_code === 0) {
		dispatch(setActivity(ret.data.data));
	}
	return ret;
}

async function updateActivitySer(dispatch, payload) {
	const ret = await updateActivity(payload);
	if (ret.data.error_code === 0) {
		dispatch(setActivity(ret.data.data));
	}
	return ret;
}

export {
	smsCode,
	changePass,
	findPass,
	getShopList,
	bindShop,
	getActivity,
	activityList,
	getKwSortway,
	getKwService,
	getOrderRequire,
	getPlusService,
	getActivityList,
	getCities,
	updatekeyword,
	addkeyword,
	removekeyword,
	getAccount,
	moneyOut,
	payActivity,
	coinIn,
	getMoneyOutRecords,
	getAccountRecords,
	getShopType,
	getQiniuToken,
	getOrders,
	cancelActivity,
	waitforPayActivity,
	
	loginSer,
	registerSer,
	logoutSer,
	userInfoSer,
	userUpdateSer,
	createActivitySer,
	updateActivitySer
};
