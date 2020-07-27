import produce from 'immer';

import {CART} from 'store/actions/types';

const initialState = {
  loading: false,
  items: [],
  totalCost: 0,
  vat: 0,
  promo_code: null,
  payment_method: {id: 1, hasCardForm: true}, // first payment method
  coupon: null,
};

export default function cartReducer(state = initialState, action, error) {
  switch (action.type) {
    case CART.GET_CART:
      return produce(state, draft => {
        draft.loading = true;
      });

    case CART.GET_CART_SUCCESS:
      return produce(state, draft => {
        draft.loading = false;
        draft.items = action.payload?.items || [];
        draft.totalCost = action.payload?.totalCost || 0;
        draft.vat = action.payload?.vat || 0;
        draft.coupon = action.payload?.coupon || null;
      });

    case CART.RESET_CART:
      return produce(state, draft => {
        draft.loading = false;
        draft.promo_code = null;
        draft.payment_method = {id: 1, hasCardForm: true};
      });

    case CART.GET_CART_FAIL:
      return produce(state, draft => {
        draft.loading = false;
      });

    case CART.SET_PROMO_CODE:
      return produce(state, draft => {
        draft.promo_code = action.payload.promo_code;
      });

    case CART.SET_PAYMENT_METHOD:
      return produce(state, draft => {
        draft.payment_method = action.payload.payment_method;
      });

    default:
      return state;
  }
}
