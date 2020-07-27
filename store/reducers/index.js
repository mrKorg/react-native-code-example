import {combineReducers} from 'redux';

import appReducer from 'store/reducers/app';
import globalReducer from 'store/reducers/global';
import authReducer from 'store/reducers/auth';
import userReducer from 'store/reducers/user';
import cartReducer from 'store/reducers/cart';
import rateReducer from 'store/reducers/rate';

export default combineReducers({
  app: appReducer,
  global: globalReducer,
  auth: authReducer,
  user: userReducer,
  cart: cartReducer,
  rate: rateReducer,
});
