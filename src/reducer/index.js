import combineReducers from '../common/combineReducers'
import menukey from './menukey'
import activityInfo from './activityInfo'
import loginInfo from './loginInfo'
import userInfo from './userInfo'
import kwList from './kwList'
import cities from './cities'

const rootReducer = combineReducers({
  activityInfo,
  loginInfo,
  userInfo,
  menukey,
  kwList,
  cities,
});

export default rootReducer