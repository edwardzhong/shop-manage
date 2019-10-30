import { addDis } from '../action';
import produce from 'immer';

const dis = (state = [], payload) => produce(state, draft => {
    if (payload.type == addDis.type) {
        Object.assign(draft, payload.info);
    }
})


export default dis;