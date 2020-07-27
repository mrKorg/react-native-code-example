import {AUTH} from 'store/actions/types';

export const signInSuccess = payload => ({
  type: AUTH.SIGNIN_USER_SUCCESS,
  payload,
});

export const signUpSuccess = payload => ({
  type: AUTH.SIGNUP_USER_SUCCESS,
  payload,
});

export const verificationSuccess = () => ({type: AUTH.VERIFICATION_USER_SUCCESS});

export const signOut = () => ({type: AUTH.SIGNOUT_USER});
export const signOutSuccess = () => ({type: AUTH.SIGNOUT_USER_SUCCESS});
export const signOutFail = () => ({type: AUTH.SIGNOUT_USER_FAIL});

export const getAuthUser = payload => ({type: AUTH.GET_USER, payload});
export const getAuthUserSuccess = payload => ({
  type: AUTH.GET_USER_SUCCESS,
  payload,
});
export const getAuthUserFail = payload => ({type: AUTH.GET_USER_FAIL, payload});

export const putUser = payload => ({type: AUTH.PUT_USER, payload});
export const putUserSuccess = payload => ({
  type: AUTH.PUT_USER_SUCCESS,
  payload,
});
export const putUserFail = payload => ({type: AUTH.PUT_USER_FAIL, payload});
