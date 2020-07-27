import {RATE} from './types';

export const setRateInfo = payload => ({type: RATE.SET_RATE_INFO, payload});
export const closeDiscountRate = () => ({type: RATE.CLOSE_DISCOUNT_RATE});
export const handleRateBrandModal = () => ({type: RATE.HANDLE_RATE_BRAND});
export const resetRateInfo = () => ({type: RATE.RESET_RATE});
