import {ofType, combineEpics} from 'redux-observable';
import {from, of} from 'rxjs';
import {mergeMap, map, catchError} from 'rxjs/operators';
import {store} from 'store';

import translations from 'translations';
import {handleSuccessMessage, handleErrorMessage} from 'utils/flashMessage';
import API from 'utils/request';

import * as globalActions from 'store/actions/global';
import * as authActions from 'store/actions/auth';
import {AUTH} from 'store/actions/types';
import _get from 'lodash/get';

const signOutEpic = action$ =>
  action$.pipe(
    ofType(AUTH.SIGNOUT_USER),
    mergeMap(() =>
      from(API.post('/logout')).pipe(
        map(response => authActions.signOutSuccess(response?.data)),
        catchError(error => of(authActions.signOutFail(error.response))),
      ),
    ),
  );

const getUserEpic = action$ =>
  action$.pipe(
    ofType(AUTH.GET_USER),
    mergeMap(() =>
      from(API.get('/user')).pipe(
        map(response => {
          const prevLocale = _get(store.getState(), 'global.selectedLocale', null);
          return authActions.getAuthUserSuccess({...(response?.data || {}), prevLocale});
        }),
        catchError(error => of(authActions.getAuthUserFail(error.response))),
      ),
    ),
  );

const putUserEpic = action$ =>
  action$.pipe(
    ofType(AUTH.PUT_USER),
    mergeMap(action =>
      from(API.put('/user/update', action.payload.values)).pipe(
        map(response => {
          handleSuccessMessage(translations.account_info_updated, action.payload?.direction);
          const prevLocale = _get(store.getState(), 'global.selectedLocale', null);
          return authActions.putUserSuccess({...(response?.data || {}), prevLocale});
        }),
        catchError(error => {
          handleErrorMessage(error, action.payload?.direction);
          return of(authActions.putUserFail(error.response));
        }),
      ),
    ),
  );

const updateLocaleAfterPutUser = action$ =>
  action$.pipe(
    ofType(AUTH.PUT_USER_SUCCESS),
    map(action =>
      globalActions.changeAppLocale({
        locale: action.payload?.user?.language?.code,
        prevLocale: action.payload?.prevLocale,
      }),
    ),
  );

const updateLocaleAfterGetUserSuccess = action$ =>
  action$.pipe(
    ofType(AUTH.GET_USER_SUCCESS),
    map(action =>
      globalActions.changeAppLocale({
        locale: action.payload?.language?.code,
        prevLocale: action.payload?.prevLocale,
      }),
    ),
  );

export default combineEpics(
  signOutEpic,
  getUserEpic,
  putUserEpic,
  updateLocaleAfterPutUser,
  // updateLocaleAfterGetUserSuccess,
);
