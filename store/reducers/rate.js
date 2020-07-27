import produce from 'immer';

import {RATE} from 'store/actions/types';

const initialState = {
  isDiscountRate: false,
  isRateBrand: false,
  isRateBrandBefore: false,
  brandId: null,
  transactionId: null,
};

function rateReducer(state = initialState, {type, payload}) {
  switch (type) {
    case RATE.SET_RATE_INFO:
      return produce(state, draft => {
        draft.isDiscountRate = true;
        draft.isRateBrandBefore = payload?.isRateBrandBefore;
        draft.brandId = payload?.brandId;
        draft.transactionId = payload?.transactionId;
      });
    case RATE.CLOSE_DISCOUNT_RATE:
      return produce(state, draft => {
        draft.isDiscountRate = false;
      });
    case RATE.HANDLE_RATE_BRAND:
      return produce(state, draft => {
        draft.isRateBrand = !state.isRateBrandBefore;
      });
    case RATE.RESET_RATE:
      return produce(state, draft => {
        draft.isDiscountRate = false;
        draft.isRateBrand = false;
        draft.isRateBrandBefore = false;
        draft.brandId = null;
        draft.transactionId = null;
      });

    default:
      return state;
  }
}

export default rateReducer;
