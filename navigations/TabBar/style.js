import {StyleSheet} from 'react-native';
import {DEFAULT_THEME, PALETTE, SIZES, isRTL} from 'utils/constants';
import {getFonts} from 'styles/typography';
import {sizeX, sizeY} from 'utils/helpers';

export default function style(theme = DEFAULT_THEME, insets = {}) {
  const fonts = getFonts(isRTL);

  const BOTTOM_BAR_HEIGHT = sizeY(SIZES.BOTTOM_BAR_HEIGHT);

  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: PALETTE.WHITE,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      height: BOTTOM_BAR_HEIGHT + insets?.bottom,
    },
    tabWrapper: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      height: BOTTOM_BAR_HEIGHT,
    },
    scannerTabWrapper: {
      marginTop: -sizeY(16),
      borderTopLeftRadius: 40,
      borderTopRightRadius: 40,
    },
    tabBarLabel: {
      ...fonts.semibold,
      color: theme.tertiary_color,
      paddingTop: 2,
    },
    scannerLabel: {
      paddingTop: sizeY(8),
    },
    scannerIcon: {
      width: sizeX(45),
      height: sizeY(45),
    },
    mainColor: {
      color: theme.tertiary_color,
    },
    activeColor: {
      color: theme.primary_color,
    },
    icon: {
      width: sizeX(20),
      height: sizeY(20),
    },
  });
}
