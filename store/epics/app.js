import {ofType, combineEpics} from 'redux-observable';
import {from, of} from 'rxjs';
import {mergeMap, map, catchError} from 'rxjs/operators';

import API from 'utils/request';
import * as actions from 'store/actions/app';
import {APP} from 'store/actions/types';

const getAppEpic = action$ =>
  action$.pipe(
    ofType(APP.GET_APP_DATA),
    mergeMap(action =>
      from(API.get(`/app/${action.payload.app}`)).pipe(
        map(response => actions.getAppDataSuccess(response?.data)),
        catchError(error => of(actions.getAppDataFail(error.response))),
      ),
    ),
  );

export default combineEpics(getAppEpic);
