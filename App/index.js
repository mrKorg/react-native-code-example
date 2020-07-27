import 'react-native-gesture-handler';
import React, {useEffect, useState, useRef, useMemo} from 'react';
import {Linking, Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';
import FlashMessage from 'react-native-flash-message';
import SplashScreen from 'react-native-splash-screen';
import moment from 'moment';
import Config from 'react-native-config';

import SelectLocaleScreen from 'containers/SelectLocale';
import StartApprove from 'containers/StartApprove';
import VerificationScreen from 'containers/Verification';
import AccountScreen from 'containers/Account';
import translations from 'translations';
import {AppContext} from 'providers';
import {AuthStack, MainStack, SubscriptionEndStack} from 'navigations';
import * as authActions from 'store/actions/auth';
import {getAppData} from 'store/actions/app';
import {DIRECTION} from 'utils/constants';
import {getParameterByName} from 'utils/helpers';
import BrandRateForm from 'components/BrandRateForm';
import DiscountRateModal from 'components/DiscountRatingModal';
import {resetRateInfo, closeDiscountRate, handleRateBrandModal} from 'store/actions/rate';
import Loading from 'components/Loading';

const Stack = createStackNavigator();

export default function App() {
  const dispatch = useDispatch();
  const navRef = useRef(null);
  const [direction, setDirection] = useState(DIRECTION.LTR);

  // Data from store
  const authData = useSelector(state => state.auth);
  const selectedLocale = useSelector(state => state?.global?.selectedLocale || null);
  const isStartApproved = useSelector(state => state?.global?.isStartApproved || false);
  const rateModals = useSelector(state => state?.rate);
  const user = useSelector(state => state.user.data);
  const lastShowSubscriptionEnd = useSelector(state => state?.global?.lastShowSubscriptionEnd);

  const isRequiredFieldsMissed = !!authData?.missingRequiredFields?.length;
  const isTokenExpired = !(authData?.expires_at && moment(authData.expires_at).isAfter(moment()));
  const isOTPRequired = authData?.isOTPRequired;
  const isLogged = !!(authData?.access_token?.length && !isTokenExpired);

  const userAppId = user?.app_id || null;
  const theme = useSelector(state => state?.app?.theme);

  const isShowSubscriptionEnd = useMemo(() => {
    const isLeft3Days = () => {
      if (lastShowSubscriptionEnd) {
        const diff = moment(lastShowSubscriptionEnd).diff(moment(), 'days');
        return diff === -3 || diff < -3;
      } else {
        return false;
      }
    };

    return (
      isLogged &&
      !user?.has_active_trial &&
      !user?.has_active_subscription &&
      (!lastShowSubscriptionEnd || isLeft3Days())
    );
  }, [isLogged, lastShowSubscriptionEnd, user]);

  // Disable Yellow box
  console.disableYellowBox = true;

  // Deep linking
  useEffect(() => {
    // Navigate after read deep link
    function handleOpenURL({url}) {
      if (url && url.indexOf(`${Config.BASE_URL}/password/reset/`) === 0 && !isLogged) {
        // Find token at url
        const token = url.replace(`${Config.BASE_URL}/password/reset/`, '').split('?')?.[0];

        const email = getParameterByName('email', url);
        const params = {email, token};
        navRef?.current?.navigate('PasswordChange', params);
      }
    }

    if (Platform.OS === 'android') {
      Linking.getInitialURL().then(url => {
        handleOpenURL({url});
      });
    } else {
      Linking.addListener('url', handleOpenURL);
    }

    SplashScreen.hide();

    return () => {
      if (Platform.OS === 'ios') {
        Linking.removeEventListener('url', handleOpenURL);
      }
    };
  }, [isLogged]);

  // Get common data after SignIn
  useEffect(() => {
    if (isLogged) {
      dispatch(authActions.getAuthUser());
    }
  }, [dispatch, isLogged]);

  // Get App data
  useEffect(() => {
    if (userAppId) {
      dispatch(getAppData({app: userAppId}));
    }
  }, [dispatch, userAppId]);

  // Change translations and direction
  useEffect(() => {
    async function changeLocalization() {
      await translations.setLanguage(selectedLocale);
    }
    if (selectedLocale) {
      changeLocalization().then(() =>
        setDirection(selectedLocale === 'ar' ? DIRECTION.RTL : DIRECTION.LTR),
      );
    }
  }, [selectedLocale]);

  // Sign out if token expired
  useEffect(() => {
    if (authData?.access_token && isTokenExpired) {
      dispatch(authActions.signOut());
    }
  }, [authData, dispatch, isTokenExpired]);

  // Actions
  const handleRateBrand = () => dispatch(resetRateInfo());
  const handleDiscountRate = () => dispatch(closeDiscountRate());
  const onDiscountModalHide = () =>
    rateModals.isRateBrandBefore ? dispatch(resetRateInfo()) : dispatch(handleRateBrandModal());

  return (
    <AppContext.Provider
      value={{
        locale: selectedLocale,
        translations,
        direction,
        isLogged,
        isOTPRequired,
        isTokenExpired,
        isRequiredFieldsMissed,
        theme,
      }}>
      <NavigationContainer ref={navRef}>
        <Stack.Navigator>
          {!selectedLocale && (
            <Stack.Screen
              name="SelectLocale"
              component={SelectLocaleScreen}
              options={{headerShown: false}}
            />
          )}
          {selectedLocale && !isStartApproved && (
            <Stack.Screen
              name="StartApprove"
              component={StartApprove}
              options={{headerShown: false}}
            />
          )}
          {!isLogged && isStartApproved && (
            <Stack.Screen name="Auth" component={AuthStack} options={{headerShown: false}} />
          )}
          {isRequiredFieldsMissed && isLogged && (
            <Stack.Screen
              name="AccountScreen"
              component={AccountScreen}
              options={{headerShown: false}}
            />
          )}
          {isOTPRequired && isLogged && (
            <Stack.Screen
              name="Verification"
              component={VerificationScreen}
              options={{headerShown: false}}
            />
          )}
          {isShowSubscriptionEnd && (
            <Stack.Screen
              name="Message"
              component={SubscriptionEndStack}
              options={{headerShown: false}}
            />
          )}
          {selectedLocale && isLogged && !isShowSubscriptionEnd && (
            <Stack.Screen name="Main" component={MainStack} options={{headerShown: false}} />
          )}
          {!user && (
            <Stack.Screen name="Loading" component={Loading} options={{headerShown: false}} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
      <FlashMessage position="top" />
      {isLogged && (
        <>
          <BrandRateForm
            isVisible={rateModals?.isRateBrand}
            onBackdropPress={handleRateBrand}
            onSubmitBrandReview={handleRateBrand}
            isEditableForm
            brandId={rateModals?.brandId}
          />
          <DiscountRateModal
            isVisible={rateModals?.isDiscountRate}
            onBackdropPress={handleDiscountRate}
            onModalHide={onDiscountModalHide}
          />
        </>
      )}
    </AppContext.Provider>
  );
}
