import combineReducers from '../common/combineReducers'
import menukey from './menukey'
import activityInfo from './activityInfo'
import loginInfo from './loginInfo'
import userInfo from './userInfo'
import cities from './cities'

const rootReducer = combineReducers({
  activityInfo,
  loginInfo,
  userInfo,
  menukey,
  cities,
});

export default rootReducer