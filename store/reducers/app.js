import produce from 'immer';

import {DEFAULT_THEME} from 'utils/constants';
import {APP, GLOBAL} from 'store/actions/types';

const initialState = {
  data: null,
  theme: {...DEFAULT_THEME},
};

function globalReducer(state = initialState, action, error) {
  switch (action.type) {
    case APP.GET_APP_DATA_SUCCESS:
      return produce(state, draft => {
        const {
          primary_color,
          secondary_color,
          tertiary_color,
          bg_primary_color,
          bg_secondary_color,
          bg_tertiary_color,
          logo,
          ...rest
        } = action.payload;
        draft.data = rest;
        if (rest.isSwitchable) {
          const theme = {
            ...DEFAULT_THEME,
          };
          if (primary_color) {
            theme.primary_color = primary_color;
          }
          if (secondary_color) {
            theme.secondary_color = secondary_color;
          }
          if (tertiary_color) {
            theme.tertiary_color = tertiary_color;
          }
          if (bg_primary_color) {
            theme.bg_primary_color = bg_primary_color;
          }
          if (bg_secondary_color) {
            theme.bg_secondary_color = bg_secondary_color;
          }
          if (bg_tertiary_color) {
            theme.bg_tertiary_color = bg_tertiary_color;
          }
          if (logo) {
            theme.logo = logo;
          }
          draft.theme = theme;
        }
      });

    case GLOBAL.RESET_STORE:
      return produce(state, draft => {
        draft.theme = DEFAULT_THEME;
      });

    default:
      return state;
  }
}

export default globalReducer;
