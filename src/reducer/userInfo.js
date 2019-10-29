import { selfAdd, selfClear } from '../action';
import produce from 'immer';

const userInfo = (state = {}, payload) => produce(state, draft => {
    switch (payload.type) {
        case selfAdd.type:
            Object.assign(draft, payload.info);
            break;
        case selfClear.type:
            Object.assign(draft, null);
            break;
    }
});

export default userInfo;