import React, {useContext, useState, useEffect, useCallback, useRef, useMemo} from 'react';
import {View, TouchableOpacity, useColorScheme} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {Formik} from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import {Row} from 'react-native-easy-grid';
import PropTypes from 'prop-types';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import {AppContext} from 'providers';
import {BUTTONS, FONT_SIZES, PALETTE} from 'utils/constants';
import * as Icons from '../icons';

import ModalSelector from 'components/ModalSelector';
import Wrapper from 'containers/Wrapper';
import Button from 'components/Button';
import Text from 'components/Text';
import TextInput from 'components/TextInput';
import FormItem from './FormItem';

import getStyle from '../style';
import getTypographyStyle from 'styles/typography';

Form.propTypes = {
  handleSave: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  handleEmailChange: PropTypes.func.isRequired,
  handlePhoneChange: PropTypes.func.isRequired,
  handleNavigateToTerms: PropTypes.func.isRequired,
};

export default function Form(props) {
  const {
    handleSave,
    handleLogout,
    handlePasswordChange,
    handleEmailChange,
    handlePhoneChange,
    handleNavigateToTerms,
  } = props;
  const {translations, locale, direction, theme} = useContext(AppContext);

  // State
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [style, setStyle] = useState(getStyle(theme));
  const [typography, setTypography] = useState(getTypographyStyle());
  const formikRef = useRef(null);

  // Data from store
  const user = useSelector(state => state?.user?.data || {});
  const languages = useSelector(state => state?.global?.languages || []);
  const genders = useSelector(state => state?.global?.genders || []);
  const cities = useSelector(state => state?.global?.cities || []);
  const occupation = useSelector(state => state?.global?.occupation || []);

  const colorScheme = useColorScheme();

  // Form
  const initialValues = useMemo(() => {
    return {
      name: user?.name || null,
      gender_id: user?.gender?.id || null,
      city_id: user?.city?.id || null,
      occupation_id: user?.occupation?.id || null,
      date_of_birth: user?.date_of_birth || null,
      language_id: user?.language?.id || null,
    };
  }, [user]);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .nullable()
      .required(translations.errors.required),
    gender_id: Yup.number().nullable(),
    city_id: Yup.number()
      .nullable()
      .required(translations.errors.required),
    occupation_id: Yup.string().nullable(),
    date_of_birth: Yup.string().nullable(),
    language_id: Yup.number()
      .nullable()
      .required(translations.errors.required),
  });

  function onSubmit(values) {
    handleSave(values);
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
    setStyle(getStyle(theme));
    setTypography(getTypographyStyle());
  }, [direction, theme]);

  useFocusEffect(useCallback(() => formikRef?.current?.resetForm(initialValues), [initialValues]));

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      innerRef={formikRef}
      enableReinitialize>
      {({values, touched, errors, handleChange, handleSubmit, setFieldTouched, setFieldValue}) => (
        <>
          <Wrapper
            isInner
            isBurgerMenu
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
              <View style={style.titleRow}>
                <Text type={FONT_SIZES.TEXT} style={style.title}>
                  {translations.account_info}
                </Text>
                <Icons.EditIcon style={style.titleIcon} />
              </View>

              <FormItem icon="account" error={errors.name} touched={touched.name} style={style}>
                <TextInput
                  style={[typography[FONT_SIZES.SMALL_TEXT], style.formItemInput]}
                  value={values.name}
                  textContentType="nickname"
                  placeholder={translations.name_field}
                  placeholderTextColor={PALETTE.GREY}
                  onChangeText={handleChange('name')}
                  onBlur={() => setFieldTouched('name')}
                />
              </FormItem>

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
                  textStyle={[typography[FONT_SIZES.SMALL_TEXT], style.formItemInput]}
                  items={genders}
                />
              </FormItem>

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
                  textStyle={[typography[FONT_SIZES.SMALL_TEXT], style.formItemInput]}
                  items={cities}
                  isSearchEnabled
                />
              </FormItem>

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
                  textStyle={[typography[FONT_SIZES.SMALL_TEXT], style.formItemInput]}
                  items={occupation}
                />
              </FormItem>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => handleDatePicker(values?.date_of_birth, setFieldValue)}>
                <FormItem
                  icon="date"
                  error={errors.date_of_birth}
                  touched={!!touched.date_of_birth}
                  style={style}>
                  <Text type={FONT_SIZES.SMALL_TEXT} style={style.formItemInput}>
                    {values.date_of_birth
                      ? moment(new Date(values.date_of_birth)).format('YYYY/MM/DD')
                      : translations.choose_dob}
                  </Text>
                </FormItem>
              </TouchableOpacity>

              <View style={style.formSpace} />

              <View style={style.titleRow}>
                <Text type={FONT_SIZES.TEXT} style={style.title}>
                  {translations.general}
                </Text>
                <Icons.EditIcon style={style.titleIcon} />
              </View>

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
                  textStyle={[typography[FONT_SIZES.SMALL_TEXT], style.formItemInput]}
                  items={languages}
                />
              </FormItem>

              <TouchableOpacity activeOpacity={0.7} onPress={handlePasswordChange}>
                <FormItem icon="password" style={style}>
                  <Text type={FONT_SIZES.SMALL_TEXT} style={style.formItemInput}>
                    {translations.password_field}
                  </Text>
                </FormItem>
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.7} onPress={handleEmailChange}>
                <FormItem icon="email" style={style}>
                  <Text type={FONT_SIZES.SMALL_TEXT} style={style.formItemInput}>
                    {user?.email || translations.email_field}
                  </Text>
                </FormItem>
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.7} onPress={handlePhoneChange}>
                <FormItem icon="phone" style={style}>
                  <Text type={FONT_SIZES.SMALL_TEXT} style={style.formItemInput}>
                    {user?.phone || translations.phone_field}
                  </Text>
                </FormItem>
              </TouchableOpacity>

              <FormItem icon="rate" style={style}>
                <Text type={FONT_SIZES.SMALL_TEXT} style={style.formItemInput}>
                  {translations.rate_us}
                </Text>
              </FormItem>

              <TouchableOpacity onPress={handleNavigateToTerms}>
                <FormItem icon="terms" style={style}>
                  <Text type={FONT_SIZES.SMALL_TEXT} style={style.formItemInput}>
                    {translations.terms_and_conditions}
                  </Text>
                </FormItem>
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.7} onPress={handleLogout}>
                <FormItem icon="signout" style={style}>
                  <Text type={FONT_SIZES.SMALL_TEXT} style={style.formItemInput}>
                    {translations.signout}
                  </Text>
                </FormItem>
              </TouchableOpacity>
            </View>
          </Wrapper>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            isDarkModeEnabled={colorScheme === 'dark'}
            date={values.date_of_birth ? new Date(values.date_of_birth) : new Date()}
            maximumDate={new Date()}
            onConfirm={v => handleDatePicker(v, setFieldValue)}
            onCancel={() => setDatePickerVisible(false)}
          />
        </>
      )}
    </Formik>
  );
}
