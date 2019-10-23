import { updateOpenKey,updateSelectKey } from '../action';
import produce from 'immer';

const menukey = (state = { open:[], select:[]}, payload) => produce(state, draft => {
    if(payload.type == updateOpenKey.type){
        draft.open = payload.keys;
    } else if(payload.type == updateSelectKey.type){
        draft.select = payload.keys;
    }
});
export default menukey;