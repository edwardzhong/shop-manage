import React, { createContext, useReducer, useContext } from 'react'
import bindActions from './common/bindActions'
import * as actions from './action'
import rootReducer from './reducer'
import pages from './config/page'

//初始化 menu
const path = location.hash.substr(1);
const menukey ={open:[], select:['1']};
for(let p of pages){
    if(p.path == path){
        if(p.key.length>1){
            menukey.open=[p.key.charAt(0)];
        }
        menukey.select = [p.key];
        break;
    }
}
//初始化 登录信息
let loginInfo = { token:'',user_id:'',username:''};
const info = localStorage.getItem('loginInfo');
if(info){
    Object.assign(loginInfo,JSON.parse(info));
}
const Context = createContext(null);
const initState = Object.assign(rootReducer({}, {}), { 
    menukey,
    loginInfo
});

export const getContext = () => useContext(Context);
export const Provider = props => {
    const [state, dispatch] = useReducer(rootReducer, initState);
    console.log(state);
    return <Context.Provider {...props} value={{ state, dispatch, actions: { ...bindActions(actions, dispatch) } }} />
};

export default Context