import {ofType, combineEpics} from 'redux-observable';
import {from, of} from 'rxjs';
import {mergeMap, map, catchError} from 'rxjs/operators';

import translations from 'translations';
import showFlashMessage from 'utils/flashMessage';
import {getErrorsText} from 'utils/helpers';
import API from 'utils/request';

import * as cartActions from 'store/actions/cart';
import {CART} from 'store/actions/types';

const getCart = (action$, state$) =>
  action$.pipe(
    ofType(CART.GET_CART),
    mergeMap(action =>
      from(
        API.get('/cart', {
          params: {
            coupon: state$.value?.cart?.promo_code,
            payment_method: state$.value?.cart?.payment_method?.id,
          },
        }),
      ).pipe(
        map(response => cartActions.getCartSuccess(response?.data)),
        catchError(error => {
          showFlashMessage({
            message: error?.response?.data?.message,
            description: getErrorsText(error?.response?.data?.errors),
            type: 'danger',
            direction: action.payload?.direction,
          });
          return of(cartActions.getCartFail(error.response));
        }),
      ),
    ),
  );

const addCouponEpic = action$ =>
  action$.pipe(
    ofType(CART.ADD_COUPON),
    mergeMap(action =>
      from(API.post('/cart/coupon-ticket', action.payload)).pipe(
        map(response => {
          showFlashMessage({
            message: response?.data?.message || translations.cart_add_coupon,
            direction: action.payload?.direction,
          });
          return cartActions.addCouponSuccess(response?.data);
        }),
        catchError(error => {
          showFlashMessage({
            message: error?.response?.data?.message,
            description: getErrorsText(error?.response?.data?.errors),
            type: 'danger',
            direction: action.payload?.direction,
          });
          return of(cartActions.addCouponFail(error.response));
        }),
      ),
    ),
  );

const removeCouponEpic = action$ =>
  action$.pipe(
    ofType(CART.REMOVE_COUPON),
    mergeMap(action =>
      from(API.delete(`/cart/${action.payload.id}/coupon-ticket`)).pipe(
        map(response => {
          showFlashMessage({
            message: response?.data?.message || translations.cart_remove_coupon,
            direction: action.payload?.direction,
          });
          return cartActions.removeCouponSuccess(response?.data);
        }),
        catchError(error => {
          showFlashMessage({
            message: error?.response?.data?.message,
            description: getErrorsText(error?.response?.data?.errors),
            type: 'danger',
            direction: action.payload?.direction,
          });
          return of(cartActions.removeCouponFail(error.response));
        }),
      ),
    ),
  );

const changeCouponQtyEpic = action$ =>
  action$.pipe(
    ofType(CART.CHANGE_COUPON_QTY),
    mergeMap(action =>
      from(
        API.put(`/cart/coupon-ticket/${action.payload.id}/quantity`, {
          quantity: action.payload.qty,
        }),
      ).pipe(
        map(response => {
          showFlashMessage({
            message: response?.data?.message || translations.cart_qty_coupon,
            direction: action.payload?.direction,
          });
          return cartActions.changeCouponQtySuccess(response?.data);
        }),
        catchError(error => {
          showFlashMessage({
            message: error?.response?.data?.message,
            description: getErrorsText(error?.response?.data?.errors),
            type: 'danger',
            direction: action.payload?.direction,
          });
          return of(cartActions.changeCouponQtyFail(error.response));
        }),
      ),
    ),
  );

const addSubscriptionEpic = action$ =>
  action$.pipe(
    ofType(CART.ADD_SUBSCRIPTION),
    mergeMap(action =>
      from(API.post('/cart/subscription', action.payload)).pipe(
        map(response => {
          showFlashMessage({
            message: response?.data?.message || translations.cart_add_subscription,
            direction: action.payload?.direction,
          });
          return cartActions.addSubscriptionSuccess(response?.data);
        }),
        catchError(error => {
          showFlashMessage({
            message: error?.response?.data?.message,
            description: getErrorsText(error?.response?.data?.errors),
            type: 'danger',
            direction: action.payload?.direction,
          });
          return of(cartActions.addSubscriptionFail(error.response));
        }),
      ),
    ),
  );

const removeSubscriptionEpic = action$ =>
  action$.pipe(
    ofType(CART.REMOVE_SUBSCRIPTION),
    mergeMap(action =>
      from(API.delete(`/cart/${action.payload.id}/subscription`)).pipe(
        map(response => {
          showFlashMessage({
            message: response?.data?.message || translations.cart_remove_subscription,
            direction: action.payload?.direction,
          });
          return cartActions.removeSubscriptionSuccess(response?.data);
        }),
        catchError(error => {
          showFlashMessage({
            message: error?.response?.data?.message,
            description: getErrorsText(error?.response?.data?.errors),
            type: 'danger',
            direction: action.payload?.direction,
          });
          return of(cartActions.removeSubscriptionFail(error.response));
        }),
      ),
    ),
  );

const refreshCartAfterAddCoupon = action$ =>
  action$.pipe(
    ofType(
      CART.ADD_COUPON_SUCCESS,
      CART.ADD_SUBSCRIPTION_SUCCESS,
      CART.CHANGE_COUPON_QTY_SUCCESS,
      CART.REMOVE_COUPON_SUCCESS,
      CART.REMOVE_SUBSCRIPTION_SUCCESS,
      CART.SET_PROMO_CODE,
      CART.SET_PAYMENT_METHOD,
      CART.RESET_CART,
    ),
    map(() => cartActions.getCart()),
  );

export default combineEpics(
  getCart,
  addCouponEpic,
  removeCouponEpic,
  changeCouponQtyEpic,
  addSubscriptionEpic,
  removeSubscriptionEpic,
  refreshCartAfterAddCoupon,
);
