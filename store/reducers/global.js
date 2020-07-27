import produce from 'immer';

import {GLOBAL} from 'store/actions/types';

const initialState = {
  loading: false,
  selectedLocale: null,
  isStartApproved: false, // Show 7 days screen
  languages: [],
  cities: [],
  selectedCityId: null,
  genders: [],
  contact_titles: [],
  occupation: [],
  savingHistoryFilter: {},
  mainFilter: {},
  notifications: [],
  age_types: [],
  cuisine_types: [],
  categories: [],
  price_types: [],
  lastShowSubscriptionEnd: null,
};

function globalReducer(state = initialState, action, error) {
  switch (action.type) {
    case GLOBAL.CHANGE_APP_LOCALE:
      return produce(state, draft => {
        if (action.payload?.locale) {
          draft.selectedLocale = action.payload.locale;
        }
        if (action.payload?.locale_id) {
          draft.selectedLocale =
            state.languages.find(lang => lang.id === action.payload.locale_id)?.code || 'en';
        }
      });

    case GLOBAL.CHANGE_START_APPROVED:
      return produce(state, draft => {
        draft.isStartApproved = true;
      });

    case GLOBAL.CHANGE_SELECTED_CITY:
      return produce(state, draft => {
        draft.selectedCityId = action.payload.id;
      });

    case GLOBAL.GET_LANGUAGES_SUCCESS:
      return produce(state, draft => {
        draft.languages = action.payload;
      });

    case GLOBAL.GET_CITIES_SUCCESS:
      return produce(state, draft => {
        draft.cities = action.payload;
      });

    case GLOBAL.GET_GENDERS_SUCCESS:
      return produce(state, draft => {
        draft.genders = action.payload;
      });

    case GLOBAL.GET_CONTACT_TITLES_SUCCESS:
      return produce(state, draft => {
        draft.contact_titles = action.payload;
      });

    case GLOBAL.GET_OCCUPATION_SUCCESS:
      return produce(state, draft => {
        draft.occupation = action.payload;
      });

    case GLOBAL.SET_SAVING_HISTORY_FILTER:
      return produce(state, draft => {
        draft.savingHistoryFilter = action.payload;
      });

    case GLOBAL.SET_MAIN_FILTER:
      return produce(state, draft => {
        draft.mainFilter = action.payload;
      });

    case GLOBAL.GET_NOTIFICATIONS:
      return produce(state, draft => {
        draft.loading = true;
      });

    case GLOBAL.GET_NOTIFICATIONS_SUCCESS:
      return produce(state, draft => {
        if (action.payload?.length > 0) {
          draft.notifications = action.payload;
        } else {
          draft.notifications = [];
        }
        draft.loading = false;
      });

    case GLOBAL.GET_NOTIFICATIONS_FAIL:
      return produce(state, draft => {
        draft.loading = false;
      });

    case GLOBAL.GET_AGE_TYPES_SUCCESS:
      return produce(state, draft => {
        draft.age_types = action.payload;
      });

    case GLOBAL.GET_CUISINE_TYPES_SUCCESS:
      return produce(state, draft => {
        draft.cuisine_types = action.payload;
      });

    case GLOBAL.GET_CATEGORIES_SUCCESS:
      return produce(state, draft => {
        draft.categories = action.payload;
      });

    case GLOBAL.GET_PRICE_TYPES_SUCCESS:
      return produce(state, draft => {
        draft.price_types = action.payload;
      });

    case GLOBAL.HANDLE_SUBSCRIPTION_END_DATE:
      return produce(state, draft => {
        draft.lastShowSubscriptionEnd = action.payload;
      });

    case GLOBAL.RESET_STORE:
      return produce(state, draft => {
        draft.lastShowSubscriptionEnd = action.payload;
        draft.selectedCityId = null;
        draft.savingHistoryFilter = {};
        draft.mainFilter = {};
        draft.notifications = [];
        draft.lastShowSubscriptionEnd = null;
      });

    default:
      return state;
  }
}

export default globalReducer;
