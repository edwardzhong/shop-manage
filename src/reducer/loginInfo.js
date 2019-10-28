import { loginAdd, loginClear } from '../action';
import produce from 'immer';

const loginInfo = (state = {token:'',user_id:'',username:''}, payload) => produce(state, draft => {
    switch (payload.type) {
        case loginAdd.type:
            Object.assign(draft, payload.info);
            break;
        case loginClear.type:
            draft.token = '';
            draft.user_id = '';
            draft.username = '';
            break;
    }
});

export default loginInfo;