import {APP} from 'store/actions/types';

export const getAppData = payload => ({
  type: APP.GET_APP_DATA,
  payload,
});

export const getAppDataSuccess = payload => ({
  type: APP.GET_APP_DATA_SUCCESS,
  payload,
});

export const getAppDataFail = payload => ({
  type: APP.GET_APP_DATA_FAIL,
  payload,
});
