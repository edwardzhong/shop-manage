import { addCities } from '../action';
import produce from 'immer';

const cities = (state = [], payload) => produce(state, draft => {
    if (payload.type == addCities.type) {
        Object.assign(draft, payload.info);
    }
})

export default cities;