import { setActivity, clearActivity } from '../action';
import produce from 'immer';

const activityInfo = (state = {id:'',store_id:'',activitytype_id:''}, payload) => produce(state, draft => {
    switch (payload.type) {
        case setActivity.type:
            Object.assign(draft, payload.info);
            break;
        case clearActivity.type:
            draft.id = '';
            draft.store_id = '';
            draft.activitytype_id = '';
            break;
    }
});

export default activityInfo;