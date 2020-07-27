import produce from 'immer';

import {AUTH} from 'store/actions/types';

const initialState = {
  loading: false,
  data: null,
};

function userReducer(state = initialState, action, error) {
  switch (action.type) {
    case AUTH.GET_USER:
      return produce(state, draft => {
        draft.loading = true;
      });

    case AUTH.GET_USER_SUCCESS:
      return produce(state, draft => {
        draft.loading = false;
        draft.data = action?.payload?.user;
      });

    case AUTH.GET_USER_FAIL:
      return produce(state, draft => {
        draft.loading = false;
      });

    case AUTH.PUT_USER:
      return produce(state, draft => {
        draft.loading = true;
      });

    case AUTH.PUT_USER_SUCCESS:
      return produce(state, draft => {
        draft.loading = false;
        draft.data = action?.payload?.user;
      });

    case AUTH.PUT_USER_FAIL:
      return produce(state, draft => {
        draft.loading = false;
      });

    case AUTH.SIGNOUT_USER_SUCCESS:
    case AUTH.SIGNOUT_USER_FAIL:
      return produce(state, draft => {
        draft.data = null;
      });

    default:
      return state;
  }
}

export default userReducer;
