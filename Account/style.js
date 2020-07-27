import {StyleSheet} from 'react-native';
import {PALETTE, SIZES, DEFAULT_THEME, DEVICE_WIDTH, isRTL} from 'utils/constants';
import {sizeX, sizeY} from 'utils/helpers';

export default function style(theme = DEFAULT_THEME) {
  const FOOTER_HEIGHT = 100;

  const layout = {
    block: {
      flex: 1,
      backgroundColor: PALETTE.GREY_BACKGROUND,
    },
    container: {
      flex: 1,
    },
    wrapper: {
      backgroundColor: PALETTE.GREY_BACKGROUND,
    },
    header: {
      height: SIZES.HEADER_HEIGHT,
    },
    content: {
      paddingVertical: 25,
      paddingHorizontal: 20,
    },
    footer: {
      height: FOOTER_HEIGHT,
      paddingVertical: 20,
      paddingHorizontal: 35,
      alignItems: 'center',
      justifyContent: 'center',
    },
    footerBox: {
      width: sizeX(200),
    },
  };

  const title = {
    titleRow: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      marginBottom: 10,
    },
    title: {
      paddingRight: 10,
    },
    titleIcon: {
      width: sizeX(14),
      height: sizeX(14),
      color: PALETTE.BLACK,
    },
  };

  const form = {
    formItemWrap: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: sizeY(8),
      borderBottomColor: PALETTE.GREY_BORDER,
      borderBottomWidth: 1,
    },
    formItem: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    formItemIcon: {
      width: sizeX(20),
      height: sizeX(20),
      color: theme.primary_color,
    },
    formItemInputBox: {
      flexGrow: 1,
    },
    formItemInput: {
      width: '100%',
      paddingVertical: 0,
      paddingHorizontal: 14,
      writingDirection: isRTL ? 'rtl' : 'auto',
      color: theme.tertiary_color,
    },
    selectStyle: {
      borderWidth: 0,
      padding: 0,
    },
    formItemError: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      justifyContent: 'center',
    },
    formItemErrorText: {
      writingDirection: isRTL ? 'auto' : 'rtl',
    },
  };

  const selectInput = {
    selectLabelStyle: {
      padding: 0,
      margin: 0,
    },
    selectValueContainerStyle: {
      padding: 0,
      margin: 0,
      height: 36,
      flexDirection: 'row',
    },
    selectContainerStyle: {
      padding: 0,
      margin: 0,
    },
    selectInnerContainerStyle: {
      borderBottomWidth: 0,
      paddingVertical: 0,
      marginBottom: 0,
    },
  };

  const datePicker = {
    pickerContainerIOS: {
      position: 'absolute',
      backgroundColor: 'white',
      bottom: 0,
      left: 0,
      width: DEVICE_WIDTH,
      height: 240,
      borderRadius: 6,
      zIndex: 10,
      paddingTop: 5,
    },
    pickerIOS: {
      paddingTop: 10,
    },
    btnDone: {
      position: 'absolute',
      top: 0,
      right: 5,
      zIndex: 20,
    },
  };

  return StyleSheet.create({
    ...layout,
    ...title,
    ...form,
    ...selectInput,
    formSpace: {
      height: 30,
    },
    ...datePicker,
  });
}
