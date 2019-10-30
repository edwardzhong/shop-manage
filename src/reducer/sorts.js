import { addSorts } from '../action';
import produce from 'immer';

const sorts = (state = [], payload) => produce(state, draft => {
    if (payload.type == addSorts.type) {
        Object.assign(draft, payload.info);
    }
})

export default sorts;