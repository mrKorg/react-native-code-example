import React from 'react';
import {View} from 'react-native';
import {Col, Row} from 'react-native-easy-grid';
import PropTypes from 'prop-types';

import {FONT_SIZES} from 'utils/constants';
import * as Icons from '../icons';

import Text from 'components/Text';

FormItem.propTypes = {
  icon: PropTypes.string,
  error: PropTypes.string,
  touched: PropTypes.bool,
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
};

export default function FormItem({icon, error, touched, children, style}) {
  function getIcon(name) {
    switch (name) {
      case 'account':
        return <Icons.Account style={style.formItemIcon} />;
      case 'gender':
        return <Icons.Gender style={style.formItemIcon} />;
      case 'location':
        return <Icons.Location style={style.formItemIcon} />;
      case 'phone':
        return <Icons.Phone style={style.formItemIcon} />;
      case 'email':
        return <Icons.Email style={style.formItemIcon} />;
      case 'password':
        return <Icons.Password style={style.formItemIcon} />;
      case 'date':
        return <Icons.Date style={style.formItemIcon} />;
      case 'lang':
        return <Icons.Lang style={style.formItemIcon} />;
      case 'rate':
        return <Icons.Rate style={style.formItemIcon} />;
      case 'terms':
        return <Icons.Terms style={style.formItemIcon} />;
      case 'signout':
        return <Icons.Signout style={style.formItemIcon} />;
      case 'employee':
        return <Icons.Employee style={style.formItemIcon} />;
      default:
        return null;
    }
  }

  return (
    <Row style={style.formItemWrap}>
      <View style={style.formItem}>
        {getIcon(icon)}
        <Col style={style.formItemInputBox}>{children}</Col>
      </View>
      {error && touched && (
        <View style={style.formItemError}>
          <Text type={FONT_SIZES.EXTRA_SMALL_TEXT} style={style.formItemErrorText}>
            {error}
          </Text>
        </View>
      )}
    </Row>
  );
}
