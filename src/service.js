import { post } from "./common/request";
import Storage from './common/storage'
import { loginAdd, loginClear, selfAdd, selfClear, exploreRequest, exploreAdd, exploreRemove, exploreDing,
	listRequest, listAdd, listRemove, listDing, articleSet, articleDing, articleRemove, articleCommentRemove
} from "./action";

const account = new Storage('account');
const login = arg => post("login/sign", arg);
const register = arg => post("login/register", arg);
const logout = arg => post("login/signout", arg);
const setPass = arg => post('/userset/change-pwd', arg);
const notice = arg => post("/user/get-user-msg", arg);
const userInfo = arg => post("user/get-user-info", arg);
const editUser = arg => post("/user/edit-user", arg);
const setSecret = arg => post('/userset/set-secret',arg)
const list = arg => post("user/get-user-home", arg);
const explore = arg => post("feed/explore", arg);
const artRemove = arg => post("user/del", arg);
const artDing = arg => post("feed/digg", arg);
const artInfo = arg => post("feed/feed-info", arg);
const comment = arg => post("feed/review", arg);
const commentRemove = arg => post("feed/del-review", arg);
const uploadImage = arg => post('/login/upload-img', arg);
const publish = arg => post('/user/publish', arg);

async function loginService(dispatch, payload) {
	try {
		const ret = await login(payload);
		if (ret.code == 200) {
            dispatch(loginAdd(ret.data));
            account.save(ret.data);
		} else {
            dispatch(loginClear());
            account.clear();
		}
		return ret;
	} catch (err) {
        dispatch(loginClear());
        account.clear();
		return err;
	}
}

async function registerService(dispatch, payload) {
	try {
		const ret = await register(payload);
		if (ret.code == 200) {
			const loginRet = await login(payload);
			loginRet.isSucc = true;
			if (loginRet.code == 200) {
                dispatch(loginAdd(loginRet.data));
                account.save(loginRet.data);
			}
			return loginRet;
		} else {
			return ret;
		}
	} catch (err) {
		return err;
	}
}

async function logoutService(dispatch) {
	try {
		const ret = await logout();
		if (ret.code == 200) {
			dispatch(loginClear());
            dispatch(selfClear());
            account.clear();
		}
		return ret;
	} catch (err) {
		return err;
	}
}

async function selfService(dispatch) {
	try {
		const ret = await userInfo();
		if (ret.code == 200) {
			dispatch(selfAdd(ret.data));
		}
		return ret;
	} catch (err) {
		return err;
	}
}

async function editUserService(dispatch, payload) {
	try {
		const ret = await editUser(payload);
		if (ret.code == 200) {
			dispatch(selfAdd(ret.data||payload));
		}
		return ret;
	} catch (err) {
		return err;
	}
}

async function setPassService(dispatch, payload){
	try{
		const ret = await setPass(payload);
		if(ret.code == 200){
			dispatch(loginClear());
            dispatch(selfClear());
            account.clear();
		}
		return ret;
	} catch(err){
		return err;
	}
}

async function setSecretService(dispatch, payload){
	try{
		const ret = await setSecret(payload);
		if(ret.code == 200){
			dispatch(selfAdd(payload))
		}
		return ret;
	} catch(err){
		return err;
	}
}

async function exploreService(dispatch, payload) {
	try {
		dispatch(exploreRequest(payload));
		const ret = await explore(payload);
		if (ret.code == 200) {
			dispatch(exploreAdd(ret.data));
		}
		return ret;
	} catch (err) {
		return err;
	}
}

async function listService(dispatch, payload) {
	try {
		dispatch(listRequest(payload));
		const ret = await list(payload);
		if (ret.code == 200) {
			dispatch(listAdd(ret.data));
		}
		return ret;
	} catch (err) {
		return err;
	}
}

async function articleService(dispatch, payload) {
	try {
		const ret = await artInfo(payload);
		if (ret.code == 200) {
			dispatch(articleSet(ret.data));
		}
		return ret;
	} catch (err) {
		return err;
	}
}

async function articleRemoveService(dispatch, payload) {
	try {
		const ret = await artRemove(payload);
		if (ret.code == 200) {
			dispatch(listRemove(payload));
			dispatch(exploreRemove(payload));
			dispatch(articleRemove(payload));
		}
		return ret;
	} catch (err) {
		return err;
	}
}

async function articleDingService(dispatch, payload) {
	try {
		const ret = await artDing(payload);
		if (ret.code == 200) {
			dispatch(listDing(payload));
			dispatch(exploreDing(payload));
			dispatch(articleDing(payload));
		}
		return ret;
	} catch (err) {
		return err;
	}
}

async function commentService(dispatch, payload) {
	try {
		const ret = await comment(payload);
		if (ret.code == 200) {
		}
		return ret;
	} catch (err) {
		return err;
	}
}

async function commentRemoveService(dispatch, payload) {
	try {
		const ret = await commentRemove(payload);
		if (ret.code == 200) {
			dispatch(articleCommentRemove(payload));
		}
		return ret;
	} catch (err) {
		return err;
	}
}

async function publishService(dispatch, payload){
	try{
		const ret = await publish(payload);
		if(ret.code==200){

		}
		return ret;
	} catch (err) {
		return err;
	}
}

export {
	loginService,
	registerService,
	logoutService,
	setPassService,
	setSecretService,
	selfService,
	editUserService,
	exploreService,
	listService,
	articleService,
	articleRemoveService,
	articleDingService,
	commentService,
    commentRemoveService,
	uploadImage,
	publishService
};
