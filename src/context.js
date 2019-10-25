import React, { createContext, useReducer, useContext } from 'react'
import bindActions from './common/bindActions'
import * as actions from './action'
import rootReducer from './reducer'
import menus from './config/menu'

const menukey = { open:['4'],select:['42']};
// const m = menus.filter(i=>i.path == location.hash.substr(1))[0];
// if(m){
//     if(m.key.length > 1){
//         menukey.open = [m.key.charAt(0)];
//     }
//     menukey.select = [ m.key ];
//     console.log('-- menu init --')
// }

const Context = createContext(null);
const initState = Object.assign(rootReducer({}, {}), { 
    menukey
});

export const getContext = () => useContext(Context);
export const Provider = props => {
    const [state, dispatch] = useReducer(rootReducer, initState);
    console.log(state);
    return <Context.Provider {...props} value={{ state, dispatch, actions: { ...bindActions(actions, dispatch) } }} />
};

export default Context