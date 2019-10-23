import { updateSelectKey } from '../action';

const selectKey = (state = [], payload) => {
    if(payload.type == updateSelectKey.type){
        state = payload.keys;
    }
    return state;
}

export default selectKey;