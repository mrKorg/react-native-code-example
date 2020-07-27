import {CART} from 'store/actions/types';

export const getCart = () => ({type: CART.GET_CART});
export const getCartSuccess = payload => ({
  type: CART.GET_CART_SUCCESS,
  payload,
});
export const getCartFail = payload => ({type: CART.GET_CART_FAIL, payload});

export const resetCart = payload => ({type: CART.RESET_CART, payload});

export const addCoupon = payload => ({type: CART.ADD_COUPON, payload});
export const addCouponSuccess = payload => ({
  type: CART.ADD_COUPON_SUCCESS,
  payload,
});
export const addCouponFail = payload => ({type: CART.ADD_COUPON_FAIL, payload});

export const removeCoupon = payload => ({type: CART.REMOVE_COUPON, payload});
export const removeCouponSuccess = payload => ({
  type: CART.REMOVE_COUPON_SUCCESS,
  payload,
});
export const removeCouponFail = payload => ({type: CART.REMOVE_COUPON_FAIL, payload});

export const changeCouponQty = payload => ({type: CART.CHANGE_COUPON_QTY, payload});
export const changeCouponQtySuccess = payload => ({
  type: CART.CHANGE_COUPON_QTY_SUCCESS,
  payload,
});
export const changeCouponQtyFail = payload => ({type: CART.CHANGE_COUPON_QTY_FAIL, payload});

export const addSubscription = payload => ({type: CART.ADD_SUBSCRIPTION, payload});
export const addSubscriptionSuccess = payload => ({
  type: CART.ADD_SUBSCRIPTION_SUCCESS,
  payload,
});
export const addSubscriptionFail = payload => ({type: CART.ADD_SUBSCRIPTION_FAIL, payload});

export const removeSubscription = payload => ({type: CART.REMOVE_SUBSCRIPTION, payload});
export const removeSubscriptionSuccess = payload => ({
  type: CART.REMOVE_SUBSCRIPTION_SUCCESS,
  payload,
});
export const removeSubscriptionFail = payload => ({type: CART.REMOVE_SUBSCRIPTION_FAIL, payload});

export const setPromoCode = payload => ({type: CART.SET_PROMO_CODE, payload});
export const setPaymentMethod = payload => ({type: CART.SET_PAYMENT_METHOD, payload});
