import { get, post, put } from "./common/request";
import { loginAdd, loginClear, selfAdd, selfClear } from "./action";

const login = arg => post("shopcms/login/", arg);
const register = arg => post("shopcms/register/", arg);
const smsCode = arg => post('tools/sms_code/',arg);
const changePass = arg => post('shopcms/change_passwd/', arg);
const userInfo = arg => get(`shopcms/userinfo/${arg.id}/`);
const updateUser = arg => put(`shopcms/userinfo/${arg.id}/`,arg);
const bindShop = arg => post('shopcms/store/',arg);
const shopList  = ()=> get('shopcms/store/');

async function loginService(dispatch, payload) {
	try {
		const ret = await login(payload);
		if (ret.data.error_code === 0) {
            dispatch(loginAdd(ret.data.data));
            localStorage.setItem('loginInfo', JSON.stringify(ret.data.data));
		} else {
            dispatch(loginClear());
            localStorage.removeItem('loginInfo');
		}
		return ret;
	} catch (err) {
        dispatch(loginClear());
        localStorage.removeItem('loginInfo');
		return err;
	}
}

async function registerService(dispatch, payload) {
	try {
		const ret = await register(payload);
		if (ret.data.error_code === 0) {
			dispatch(loginAdd(ret.data.data));
			localStorage.setItem('loginInfo', JSON.stringify(ret.data.data));
		}
		return ret;
	} catch (err) {
		return err;
	}
}

async function userInfoService(dispatch, payload) {
	try{
		const ret = await userInfo(payload);
		if (ret.data.error_code === 0) {
			dispatch(selfAdd(ret.data.data));
			localStorage.setItem('selfInfo', JSON.stringify(ret.data.data));
		}
		return ret;
	} catch(err){
		return err;
	}
}

async function userUpdateService(dispatch, payload) {
	try{
		const ret = await updateUser(payload);
		if (ret.data.error_code === 0) {
			dispatch(selfAdd(ret.data.data));
			localStorage.setItem('selfInfo', JSON.stringify(ret.data.data));
		}
		return ret;
	} catch(err){
		return err;
	}
}

async function logoutService(dispatch) {
	dispatch(loginClear());
	dispatch(selfClear());
	localStorage.removeItem('loginInfo');
	localStorage.removeItem('selfInfo');
}

export {
	smsCode,
	changePass,
	shopList,
	bindShop,
	
	loginService,
	registerService,
	logoutService,
	userInfoService,
	userUpdateService,
};
