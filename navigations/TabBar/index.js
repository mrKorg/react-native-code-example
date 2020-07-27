import React, {useContext, useState, useEffect, useMemo} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';
import {useIsDrawerOpen} from '@react-navigation/drawer';

import {AppContext} from 'providers';
import {FONT_SIZES} from 'utils/constants';
import * as Icons from './icons';

import Text from 'components/Text';

import getStyle from './style';

export default function TabBar({state, descriptors, navigation}) {
  const {translations, direction, theme} = useContext(AppContext);
  const insets = useSafeArea();
  const [style, setStyle] = useState(getStyle(theme, insets));
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  const isDrawerOpen = useIsDrawerOpen();

  useEffect(() => {
    setStyle(getStyle(theme, insets));
  }, [direction, insets, theme]);

  const isFocusedTab = (focused, index) =>
    (focused && !isDrawerOpen) || (isDrawerOpen && index === 4)
      ? [style.icon, style.activeColor]
      : [style.icon, style.mainColor];

  const tabLabels = useMemo(() => {
    return {
      0: translations.home,
      1: translations.products,
      2: translations.scanner,
      3: translations.history,
      4: translations.open_menu,
    };
  }, [
    translations.home,
    translations.products,
    translations.open_menu,
    translations.history,
    translations.scanner,
  ]);

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  const onTabPress = (route, isFocused) => {
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      if (route.name === 'More') {
        navigation.openDrawer();
      } else {
        navigation.navigate(route.name);
      }
    }
  };

  function renderIcon(screen, focused, index) {
    switch (screen) {
      case 'Home':
        return <Icons.HomeIcon style={isFocusedTab(focused, index)} />;
      case 'Products':
        return <Icons.OffersIcon style={isFocusedTab(focused, index)} />;
      case 'Scanner':
        return <Icons.ScanIcon style={[isFocusedTab(focused, index), style.scannerIcon]} />;
      case 'SavingHistory':
        return <Icons.HistoryIcon style={isFocusedTab(focused, index)} />;
      case 'More':
        return <Icons.MoreIcon style={isFocusedTab(focused, index)} />;
    }
  }

  return (
    <View style={style.container}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label = tabLabels[index];
        const isFocused = state.index === index;

        return (
          <TouchableOpacity
            key={route.name}
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={() => onTabPress(route, isFocused)}
            activeOpacity={0.7}
            style={[style.tabWrapper, route.name === 'Scanner' && style.scannerTabWrapper]}>
            {renderIcon(route.name, isFocused, index)}
            <Text
              dotted={true}
              type={FONT_SIZES.EXTRA_SMALL_TEXT}
              style={[
                style.tabBarLabel,
                route.name === 'Scanner' && style.scannerLabel,
                (isFocused && !isDrawerOpen) || (isDrawerOpen && index === 4)
                  ? style.activeColor
                  : style.mainColor,
              ]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
