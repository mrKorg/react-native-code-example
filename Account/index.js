import React, {useContext, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import Form from './components/Form';
import MissedDataForm from './components/MissedDataForm';
import * as authActions from 'store/actions/auth';
import * as globalActions from 'store/actions/global';
import {AppContext} from 'providers';

export default function Account() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {direction, isRequiredFieldsMissed} = useContext(AppContext);

  function handleLogout() {
    dispatch(authActions.signOut());
  }

  function handleSave(values) {
    dispatch(authActions.putUser({values, direction, isRequiredFieldsMissed}));
  }

  function handlePasswordChange() {
    navigation.navigate('PasswordChange');
  }

  function handleEmailChange() {
    navigation.navigate('EmailChange');
  }

  function handlePhoneChange() {
    navigation.navigate('PhoneChange');
  }

  function handleNavigateToTerms() {
    navigation.navigate('TermsConditions');
  }

  useEffect(() => {
    dispatch(globalActions.getCities());
    dispatch(globalActions.getGenders());
    dispatch(globalActions.getLanguages());
    dispatch(globalActions.getOccupation());
  }, [dispatch]);

  return (
    <>
      {isRequiredFieldsMissed ? (
        <MissedDataForm
          handleSave={handleSave}
          handleLogout={handleLogout}
          handlePasswordChange={handlePasswordChange}
        />
      ) : (
        <Form
          handleSave={handleSave}
          handleLogout={handleLogout}
          handlePasswordChange={handlePasswordChange}
          handleEmailChange={handleEmailChange}
          handlePhoneChange={handlePhoneChange}
          handleNavigateToTerms={handleNavigateToTerms}
        />
      )}
    </>
  );
}
