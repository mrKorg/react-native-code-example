import produce from 'immer';
import {GoogleSignin} from '@react-native-community/google-signin';

import {AUTH} from 'store/actions/types';

const initialState = {
  loading: false,
  access_token: null,
  token_type: null,
  expires_at: null,
  isOTPRequired: false,
  missingRequiredFields: [],
  order: null,
  OTP: null, // remove this before prod
};

function authReducer(state = initialState, action, error) {
  switch (action.type) {
    case AUTH.SIGNOUT_USER_SUCCESS:
    case AUTH.SIGNOUT_USER_FAIL:
    case AUTH.GET_USER_FAIL:
      GoogleSignin.revokeAccess().catch();
      GoogleSignin.signOut().catch();
      return produce(state, draft => {
        draft.loading = false;
        draft.access_token = null;
        draft.token_type = null;
        draft.expires_at = null;
        draft.isOTPRequired = null;
        draft.missingRequiredFields = [];
        draft.order = null;
        draft.OTP = null;
      });

    case AUTH.SIGNUP_USER_SUCCESS:
    case AUTH.GET_USER_SUCCESS:
    case AUTH.PUT_USER_SUCCESS:
      return produce(state, draft => {
        const data = action.payload?.authData || action.payload || {};
        if (data.hasOwnProperty('access_token')) {
          draft.access_token = data.access_token;
        }
        if (data.hasOwnProperty('expires_at')) {
          draft.expires_at = data.expires_at;
        }
        if (data.hasOwnProperty('token_type')) {
          draft.token_type = data.token_type;
        }
        if (data.hasOwnProperty('isOTPRequired')) {
          draft.isOTPRequired = data.isOTPRequired;
        }
        if (data.hasOwnProperty('missingRequiredFields')) {
          draft.missingRequiredFields = data.missingRequiredFields;
        }
        if (data.hasOwnProperty('order')) {
          draft.order = data.order;
        }
        if (data.hasOwnProperty('OTP')) {
          draft.OTP = data.OTP;
        }
        draft.loading = false;
      });

    case AUTH.SIGNIN_USER_SUCCESS:
      return produce(state, draft => {
        draft.loading = false;
        draft.access_token = action.payload.access_token;
        draft.expires_at = action.payload.expires_at;
        draft.token_type = action.payload.token_type;
        draft.missingRequiredFields = action.payload.authData?.missingRequiredFields;
        draft.isOTPRequired = action.payload.authData?.isOTPRequired;
        draft.order = action.payload.authData?.order;
        draft.OTP = action.payload.authData?.OTP;
      });

    case AUTH.VERIFICATION_USER_SUCCESS:
      return produce(state, draft => {
        draft.loading = false;
        draft.isOTPRequired = false;
      });

    case AUTH.GET_USER:
      return produce(state, draft => {
        draft.loading = true;
      });

    default:
      return state;
  }
}

export default authReducer;
