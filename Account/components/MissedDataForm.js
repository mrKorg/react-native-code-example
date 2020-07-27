import React, {useContext, useState, useEffect} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {Formik} from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import {Row} from 'react-native-easy-grid';
import PropTypes from 'prop-types';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import {AppContext} from 'providers';
import {BUTTONS, FONT_SIZES, PALETTE} from 'utils/constants';

import ModalSelector from 'components/ModalSelector';
import Wrapper from 'containers/Wrapper';
import Button from 'components/Button';
import Text from 'components/Text';
import TextInput from 'components/TextInput';
import FormItem from './FormItem';

import getStyle from '../style';
import getTypographyStyle from 'styles/typography';

MissedDataForm.propTypes = {
  handleSave: PropTypes.func.isRequired,
};

export default function MissedDataForm(props) {
  const {handleSave} = props;
  const {translations, locale, direction} = useContext(AppContext);

  // State
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [style, setStyle] = useState(getStyle(direction));
  const [typography, setTypography] = useState(getTypographyStyle(direction));

  // Data from store
  const missingRequiredFields = useSelector(state => state.auth?.missingRequiredFields || []);
  const user = useSelector(state => state.user?.data || {});
  const languages = useSelector(state => state.global?.languages || []);
  const genders = useSelector(state => state.global?.genders || []);
  const cities = useSelector(state => state.global?.cities || []);
  const occupation = useSelector(state => state.global?.occupation || []);

  // Form
  const initialValues = {};
  const validationValues = {};
  missingRequiredFields.forEach(key => {
    initialValues[key] = null;
    if (
      ['name', 'gender_id', 'city_id', 'occupation_id', 'phone', 'date_of_birth', 'language_id']
    ) {
      validationValues[key] = Yup.string()
        .nullable()
        .required(translations.errors.required);
    }
    if (key === 'email') {
      validationValues.email = Yup.string()
        .email()
        .nullable()
        .required(translations.errors.required);
    }
    if (key === 'password') {
      validationValues.password = Yup.string()
        .nullable()
        .required(translations.errors.required);
      validationValues.password_confirmation = Yup.string().when('password', {
        is: val => val && val.length > 0,
        then: Yup.string()
          .oneOf([Yup.ref('password')], translations.errors.match)
          .required(translations.errors.required),
      });
    }
  });
  const validationSchema = Yup.object().shape(validationValues);

  function onSubmit(values) {
    const newValues = {...values};
    delete newValues.password_confirmation;
    handleSave(newValues);
  }

  function handleDatePicker(value, setFieldValue) {
    if (isDatePickerVisible) {
      setDatePickerVisible(!isDatePickerVisible);
      setFieldValue('date_of_birth', value ? new Date(value) : new Date());
    } else {
      setDatePickerVisible(!isDatePickerVisible);
    }
  }

  useEffect(() => {
    setStyle(getStyle(direction));
    setTypography(getTypographyStyle(direction));
  }, [direction]);

  // TODO: create fields components
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize>
      {({values, touched, errors, handleChange, handleSubmit, setFieldTouched, setFieldValue}) => (
        <Wrapper
          isInner
          title={translations.account_details}
          customFooter={() => (
            <Row style={style.footer}>
              <Button
                type={BUTTONS.BUTTON_ORANGE}
                textType={FONT_SIZES.SMALL_TITLE}
                title={translations.save_changes}
                buttonStyle={style.footerBox}
                onPress={handleSubmit}
              />
            </Row>
          )}>
          <View style={style.content}>
            {validationValues.hasOwnProperty('name') && (
              <FormItem icon="account" error={errors.name} touched={touched.name} style={style}>
                <TextInput
                  style={style.formItemInput}
                  value={values.name}
                  textContentType="nickname"
                  placeholder={translations.name_field}
                  autoCapitalize="none"
                  onChangeText={handleChange('name')}
                  onBlur={() => setFieldTouched('name')}
                  placeholderTextColor={PALETTE.GREY}
                />
              </FormItem>
            )}

            {validationValues.hasOwnProperty('gender_id') && (
              <FormItem
                icon="gender"
                error={errors.gender_id}
                touched={touched.gender_id}
                style={style}>
                <ModalSelector
                  value={
                    genders.find(gender => gender.id === values.gender_id)?.name[locale] ||
                    user?.gender?.name ||
                    translations.choose_gender
                  }
                  onSelect={v => setFieldValue('gender_id', v.id)}
                  textStyle={[style.formItemInput, typography[FONT_SIZES.TEXT]]}
                  items={genders}
                />
              </FormItem>
            )}

            {validationValues.hasOwnProperty('city_id') && (
              <FormItem
                icon="location"
                error={errors.city_id}
                touched={touched.city_id}
                style={style}>
                <ModalSelector
                  value={
                    cities.find(city => city.id === values.city_id)?.name[locale] ||
                    user?.city?.name ||
                    translations.city
                  }
                  onSelect={v => setFieldValue('city_id', v.id)}
                  textStyle={[style.formItemInput, typography[FONT_SIZES.TEXT]]}
                  items={cities}
                  isSearchEnabled
                />
              </FormItem>
            )}

            {validationValues.hasOwnProperty('phone') && (
              <FormItem icon="phone" error={errors.phone} touched={touched.phone} style={style}>
                <TextInput
                  value={values.phone}
                  textContentType="telephoneNumber"
                  placeholder={translations.phone_field}
                  placeholderTextColor={PALETTE.GREY}
                  style={[style.formItemInput, typography[FONT_SIZES.TEXT]]}
                  onChangeText={handleChange('phone')}
                  onBlur={() => setFieldTouched('phone')}
                />
              </FormItem>
            )}

            {validationValues.hasOwnProperty('email') && (
              <FormItem icon="email" error={errors.email} touched={touched.email} style={style}>
                <TextInput
                  style={style.formItemInput}
                  value={values.email}
                  placeholder={translations.email_field}
                  autoCapitalize="none"
                  onChangeText={handleChange('email')}
                  onBlur={() => setFieldTouched('email')}
                  placeholderTextColor={PALETTE.GREY}
                />
              </FormItem>
            )}

            {validationValues.hasOwnProperty('occupation_id') && (
              <FormItem
                icon="employee"
                error={errors.occupation_id}
                touched={touched.occupation_id}
                style={style}>
                <ModalSelector
                  value={
                    occupation.find(item => item.id === values.occupation_id)?.name[locale] ||
                    user?.occupation?.name ||
                    translations.occupation
                  }
                  onSelect={v => setFieldValue('occupation_id', v.id)}
                  textStyle={[style.formItemInput, typography[FONT_SIZES.TEXT]]}
                  items={occupation}
                />
              </FormItem>
            )}

            {validationValues.hasOwnProperty('date_of_birth') && (
              <>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => handleDatePicker(values?.date_of_birth, setFieldValue)}>
                  <FormItem
                    icon="date"
                    error={errors.date_of_birth}
                    touched={!!touched.date_of_birth}
                    style={style}>
                    <Text
                      type={FONT_SIZES.TEXT}
                      style={[style.formItemInput, typography[FONT_SIZES.TEXT]]}>
                      {values.date_of_birth
                        ? moment(new Date(values.date_of_birth)).format('YYYY/MM/DD')
                        : translations.choose_dob}
                    </Text>
                  </FormItem>
                </TouchableOpacity>
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  isDarkModeEnabled={true}
                  date={user.date_of_birth ? new Date(user.date_of_birth) : new Date()}
                  onConfirm={v => handleDatePicker(v, setFieldValue)}
                  onCancel={() => setDatePickerVisible(false)}
                />
              </>
            )}

            {validationValues.hasOwnProperty('language_id') && (
              <FormItem
                icon="lang"
                error={errors.language_id}
                touched={touched.language_id}
                style={style}>
                <ModalSelector
                  value={
                    languages.find(item => item.id === values.language_id)?.name[locale] ||
                    user?.language?.name ||
                    translations.choose_language
                  }
                  onSelect={v => setFieldValue('language_id', v.id)}
                  textStyle={[style.formItemInput, typography[FONT_SIZES.TEXT]]}
                  items={languages}
                />
              </FormItem>
            )}

            {validationValues.hasOwnProperty('password') && (
              <>
                <FormItem
                  icon="password"
                  error={errors.password}
                  touched={touched.password}
                  style={style}>
                  <TextInput
                    textContentType="password"
                    secureTextEntry={true}
                    style={style.formItemInput}
                    value={values.password}
                    placeholder={translations.password_new}
                    autoCapitalize="none"
                    onChangeText={handleChange('password')}
                    onBlur={() => setFieldTouched('password')}
                    placeholderTextColor={PALETTE.GREY}
                  />
                </FormItem>
                <FormItem
                  icon="password"
                  error={errors.password_confirmation}
                  touched={touched.password_confirmation}
                  style={style}>
                  <TextInput
                    textContentType="password"
                    secureTextEntry={true}
                    style={style.formItemInput}
                    value={values.password_confirmation}
                    placeholder={translations.password_confirm}
                    autoCapitalize="none"
                    onChangeText={handleChange('password_confirmation')}
                    onBlur={() => setFieldTouched('password_confirmation')}
                    placeholderTextColor={PALETTE.GREY}
                  />
                </FormItem>
              </>
            )}
          </View>
        </Wrapper>
      )}
    </Formik>
  );
}
