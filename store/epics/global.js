import {ofType, combineEpics} from 'redux-observable';
import {from, of} from 'rxjs';
import {mergeMap, map, catchError, timeout} from 'rxjs/operators';
import {I18nManager} from 'react-native';
import RNRestart from 'react-native-restart';

import API from 'utils/request';
import {getErrorsText} from 'utils/helpers';
import showFlashMessage from 'utils/flashMessage';
import * as actions from 'store/actions/global';
import {AUTH, GLOBAL} from 'store/actions/types';
import * as globalActions from '../actions/global';

const getLanguagesEpic = action$ =>
  action$.pipe(
    ofType(GLOBAL.GET_LANGUAGES),
    mergeMap(() =>
      from(API.get('/language')).pipe(
        map(response => actions.getLanguagesSuccess(response?.data)),
        catchError(error => of(actions.getLanguagesFail(error.response))),
      ),
    ),
  );

const getCitiesEpic = action$ =>
  action$.pipe(
    ofType(GLOBAL.GET_CITIES),
    mergeMap(() =>
      from(API.get('/city')).pipe(
        map(response => actions.getCitiesSuccess(response?.data)),
        catchError(error => of(actions.getCitiesFail(error.response))),
      ),
    ),
  );

const getGendersEpic = action$ =>
  action$.pipe(
    ofType(GLOBAL.GET_GENDERS),
    mergeMap(() =>
      from(API.get('/gender')).pipe(
        map(response => actions.getGendersSuccess(response?.data)),
        catchError(error => of(actions.getGendersFail(error.response))),
      ),
    ),
  );

const getContactTitlesEpic = action$ =>
  action$.pipe(
    ofType(GLOBAL.GET_CONTACT_TITLES),
    mergeMap(() =>
      from(API.get('/contact')).pipe(
        map(response => actions.getContactTitlesSuccess(response?.data)),
        catchError(error => of(actions.getContactTitlesFail(error.response))),
      ),
    ),
  );

const getOccupationEpic = action$ =>
  action$.pipe(
    ofType(GLOBAL.GET_OCCUPATION),
    mergeMap(() =>
      from(API.get('/occupation')).pipe(
        map(response => actions.getOccupationSuccess(response?.data)),
        catchError(error => of(actions.getOccupationFail(error.response))),
      ),
    ),
  );

const getNotificationsEpic = action$ =>
  action$.pipe(
    ofType(GLOBAL.GET_NOTIFICATIONS),
    mergeMap(() =>
      from(API.get('/notification')).pipe(
        map(response => actions.getNotificationsSuccess(response?.data)),
        catchError(error => of(actions.getNotificationsFail(error.response))),
      ),
    ),
  );

const deleteNotificationEpic = action$ =>
  action$.pipe(
    ofType(GLOBAL.DELETE_NOTIFICATION),
    mergeMap(action =>
      from(API.delete(`/notification/${action.payload.id}/delete`)).pipe(
        map(response => {
          showFlashMessage({
            message: response?.data?.message,
            type: 'success',
            direction: action.payload?.direction,
          });
          return actions.getNotifications();
        }),
        catchError(error => {
          showFlashMessage({
            message: error?.response?.data?.message,
            description: getErrorsText(error?.response?.data?.errors),
            type: 'danger',
            direction: action.payload?.direction,
          });
          return of(actions.getNotifications());
        }),
      ),
    ),
  );

const getAgeTypesEpic = action$ =>
  action$.pipe(
    ofType(GLOBAL.GET_AGE_TYPES),
    mergeMap(() =>
      from(API.get('/age-type')).pipe(
        map(response => actions.getAgeTypesSuccess(response?.data)),
        catchError(error => of(actions.getAgeTypesFail(error.response))),
      ),
    ),
  );

const getCuisineTypesEpic = action$ =>
  action$.pipe(
    ofType(GLOBAL.GET_CUISINE_TYPES),
    mergeMap(() =>
      from(API.get('/cuisine-type')).pipe(
        map(response => actions.getCuisineTypesSuccess(response?.data)),
        catchError(error => of(actions.getCuisineTypesFail(error.response))),
      ),
    ),
  );

const getCategoriesEpic = action$ =>
  action$.pipe(
    ofType(GLOBAL.GET_CATEGORIES),
    mergeMap(action =>
      from(API.get('/category', action.payload?.params)).pipe(
        map(response => actions.getCategoriesSuccess(response?.data)),
        catchError(error => of(actions.getCategoriesFail(error.response))),
      ),
    ),
  );

const getPriceTypesEpic = action$ =>
  action$.pipe(
    ofType(GLOBAL.GET_PRICE_TYPES),
    mergeMap(() =>
      from(API.get('/price-type')).pipe(
        map(response => actions.getPriceTypesSuccess(response?.data)),
        catchError(error => of(actions.getPriceTypesFail(error.response))),
      ),
    ),
  );

const resetStore = action$ =>
  action$.pipe(
    ofType(AUTH.SIGNOUT_USER),
    map(() => globalActions.resetStore()),
  );

const restartAppAfterChangeLocale = action$ =>
  action$.pipe(
    ofType(GLOBAL.CHANGE_APP_LOCALE),
    map(action => {
      if (action.payload?.locale !== action.payload?.prevLocale) {
        setTimeout(() => {
          I18nManager.forceRTL(action.payload?.locale === 'ar');
          RNRestart.Restart();
        }, 1500);
      }
      return {type: ''};
    }),
  );

export default combineEpics(
  getLanguagesEpic,
  getCitiesEpic,
  getGendersEpic,
  getContactTitlesEpic,
  getOccupationEpic,
  getNotificationsEpic,
  deleteNotificationEpic,
  getAgeTypesEpic,
  getCuisineTypesEpic,
  getCategoriesEpic,
  getPriceTypesEpic,
  resetStore,
  restartAppAfterChangeLocale,
);
