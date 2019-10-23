import React, { createContext, useReducer, useContext } from 'react'
import bindActions from './common/bindActions'
import * as actions from './action'
import rootReducer from './reducer'

const Context = createContext(null);
const initState = Object.assign(rootReducer({}, {}), {
    menukey:{
        open:[],
        select:['1']
    }
});

export const getContext = () => useContext(Context);
export const Provider = props => {
    const [state, dispatch] = useReducer(rootReducer, initState);
    console.log(state);
    return <Context.Provider {...props} value={{ state, dispatch, actions: { ...bindActions(actions, dispatch) } }} />
};

export default Context