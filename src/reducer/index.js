import combineReducers from '../common/combineReducers'
import menukey from './menukey'
import activityInfo from './activityInfo'
import loginInfo from './loginInfo'
import userInfo from './userInfo'

const rootReducer = combineReducers({
  activityInfo,
  loginInfo,
  userInfo,
  menukey,
});

export default rootReducer