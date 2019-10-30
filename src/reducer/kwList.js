import { setkw, addkw, removekw, updatekw, clearkw } from '../action';
import produce from 'immer';

const kwList = (state = [], payload) => produce(state, draft => {
    switch (payload.type) {
        case setkw.type:
            Object.assign(draft, payload.info);
            break;
        case addkw.type:
            draft.push(payload.info);
            break;
        case removekw.type:
            for(let i = 0;i<draft.length;i++){
                if(draft[i].uid == payload.uid){
                    draft.splice(i,1);
                }
            }
            break;
        case updatekw.type:
            for(let l of draft){
                if(l.uid == payload.info.uid){
                    Object.assign(l, payload.info);
                    break;
                } 
            }
            break;
        case clearkw.type:
            draft = [];
            break;
    }
});

export default kwList;