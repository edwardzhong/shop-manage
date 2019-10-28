import combineReducers from '../common/combineReducers'
import loginInfo from './loginInfo'
import userInfo from './userInfo'
import menukey from './menukey'

const rootReducer = combineReducers({
  loginInfo,
  userInfo,
  menukey
});

export default rootReducer