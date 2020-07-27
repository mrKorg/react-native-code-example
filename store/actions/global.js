import {GLOBAL} from 'store/actions/types';

export const changeAppLocale = payload => ({
  type: GLOBAL.CHANGE_APP_LOCALE,
  payload,
});

export const changeStartApproved = payload => ({
  type: GLOBAL.CHANGE_START_APPROVED,
  payload,
});

export const changeSelectedCity = payload => ({
  type: GLOBAL.CHANGE_SELECTED_CITY,
  payload,
});

export const getLanguages = payload => ({type: GLOBAL.GET_LANGUAGES, payload});
export const getLanguagesSuccess = payload => ({
  type: GLOBAL.GET_LANGUAGES_SUCCESS,
  payload,
});
export const getLanguagesFail = payload => ({type: GLOBAL.GET_LANGUAGES_FAIL, payload});

export const getCities = payload => ({type: GLOBAL.GET_CITIES, payload});
export const getCitiesSuccess = payload => ({
  type: GLOBAL.GET_CITIES_SUCCESS,
  payload,
});
export const getCitiesFail = payload => ({type: GLOBAL.GET_CITIES_FAIL, payload});

export const getGenders = payload => ({type: GLOBAL.GET_GENDERS, payload});
export const getGendersSuccess = payload => ({
  type: GLOBAL.GET_GENDERS_SUCCESS,
  payload,
});
export const getGendersFail = payload => ({type: GLOBAL.GET_GENDERS_FAIL, payload});

export const getContactTitles = payload => ({type: GLOBAL.GET_CONTACT_TITLES, payload});
export const getContactTitlesSuccess = payload => ({
  type: GLOBAL.GET_CONTACT_TITLES_SUCCESS,
  payload,
});
export const getContactTitlesFail = payload => ({type: GLOBAL.GET_CONTACT_TITLES_FAIL, payload});

export const getOccupation = payload => ({type: GLOBAL.GET_OCCUPATION, payload});
export const getOccupationSuccess = payload => ({
  type: GLOBAL.GET_OCCUPATION_SUCCESS,
  payload,
});
export const getOccupationFail = payload => ({type: GLOBAL.GET_OCCUPATION_FAIL, payload});

export const setSavingHistoryFilter = payload => ({
  type: GLOBAL.SET_SAVING_HISTORY_FILTER,
  payload,
});

export const setMainFilter = payload => ({
  type: GLOBAL.SET_MAIN_FILTER,
  payload,
});

export const getNotifications = payload => ({type: GLOBAL.GET_NOTIFICATIONS, payload});
export const getNotificationsSuccess = payload => ({
  type: GLOBAL.GET_NOTIFICATIONS_SUCCESS,
  payload,
});
export const getNotificationsFail = payload => ({type: GLOBAL.GET_NOTIFICATIONS_FAIL, payload});

export const deleteNotification = payload => ({type: GLOBAL.DELETE_NOTIFICATION, payload});
export const deleteNotificationSuccess = payload => ({
  type: GLOBAL.DELETE_NOTIFICATION_SUCCESS,
  payload,
});
export const deleteNotificationFail = payload => ({type: GLOBAL.DELETE_NOTIFICATION_FAIL, payload});

export const getAgeTypes = payload => ({type: GLOBAL.GET_AGE_TYPES, payload});
export const getAgeTypesSuccess = payload => ({
  type: GLOBAL.GET_AGE_TYPES_SUCCESS,
  payload,
});
export const getAgeTypesFail = payload => ({type: GLOBAL.GET_AGE_TYPES_FAIL, payload});

export const getCuisineTypes = payload => ({type: GLOBAL.GET_CUISINE_TYPES, payload});
export const getCuisineTypesSuccess = payload => ({
  type: GLOBAL.GET_CUISINE_TYPES_SUCCESS,
  payload,
});
export const getCuisineTypesFail = payload => ({type: GLOBAL.GET_CUISINE_TYPES_FAIL, payload});

export const getCategories = payload => ({type: GLOBAL.GET_CATEGORIES, payload});
export const getCategoriesSuccess = payload => ({
  type: GLOBAL.GET_CATEGORIES_SUCCESS,
  payload,
});
export const getCategoriesFail = payload => ({type: GLOBAL.GET_CATEGORIES_FAIL, payload});

export const getPriceTypes = payload => ({type: GLOBAL.GET_PRICE_TYPES, payload});
export const getPriceTypesSuccess = payload => ({
  type: GLOBAL.GET_PRICE_TYPES_SUCCESS,
  payload,
});
export const getPriceTypesFail = payload => ({type: GLOBAL.GET_PRICE_TYPES_FAIL, payload});

export const handleSubscriptionEndDate = payload => ({
  type: GLOBAL.HANDLE_SUBSCRIPTION_END_DATE,
  payload,
});

export const resetStore = () => ({
  type: GLOBAL.RESET_STORE,
});
