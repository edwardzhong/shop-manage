import { selfAdd, selfClear, selfUpdate } from '../action';
import produce from 'immer';

const userInfo = (state = {}, payload) => produce(state, draft => {
    switch (payload.type) {
        case selfAdd.type:
            Object.assign(draft, payload.info);
            break;
        case selfClear.type:
            Object.assign(draft, null);
            break;
        case selfUpdate.type:
            Object.assign(draft, payload.info);
            break;
    }
});

export default userInfo;