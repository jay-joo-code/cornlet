import { combineReducers } from 'redux';
import user from './user';
import authing from './authing';
import redirectPath from './redirectPath';
import bm from './bm';
import tempValues from './tempValues';
import chatrooms from './chatrooms';

const rootReducer = combineReducers({
  user,
  authing,
  redirectPath,
  bm,
  tempValues,
  chatrooms,
})

export default rootReducer