import combineReducers from '../common/combineReducers'
import menukey from './menukey'
import activityInfo from './activityInfo'
import loginInfo from './loginInfo'
import userInfo from './userInfo'
import kwList from './kwList'
import cities from './cities'
import dis from './dis'
import sorts from './sorts'

const rootReducer = combineReducers({
  activityInfo,
  loginInfo,
  userInfo,
  menukey,
  kwList,
  cities,
  dis,
  sorts
});

export default rootReducer