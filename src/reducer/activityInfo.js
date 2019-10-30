import { setActivity, clearActivity } from '../action';
import produce from 'immer';

const activityInfo = (state = {}, payload) => produce(state, draft => {
    switch (payload.type) {
        case setActivity.type:
            Object.assign(draft, payload.info);
            break;
        case clearActivity.type:
            Object.assign(draft, null);
            break;
    }
});

export default activityInfo;