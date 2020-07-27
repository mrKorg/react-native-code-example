// TODO: use constants for route names
import React from 'react';
import {createStackNavigator, HeaderStyleInterpolators} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Easing, I18nManager} from 'react-native';

import {SIZES, PALETTE, PLATFORM} from 'utils/constants';
import {sizeX} from 'utils/helpers';

// Not Auth screens
import SignIn from 'containers/SignIn';
import SignUp from 'containers/SignUp';
import PasswordRecovery from 'containers/PasswordRecovery';
import PasswordChange from 'containers/PasswordChange';
import Verification from 'containers/Verification';

// Auth screens
import Home from 'containers/Home';
import Scanner from 'containers/Scanner';
import Products from 'containers/Products';
import Offer from 'containers/Offer';
import Coupon from 'containers/Coupon';
import InviteUser from 'containers/InviteUser';
import About from 'containers/About';
import Faq from 'containers/Faq';
import Blog from 'containers/Blog';
import Article from 'containers/Article';
import Favorite from 'containers/Favorite';
import Contacts from 'containers/Contacts';
import SuggestBrand from 'containers/SuggestBrand';
import JoinBrand from 'containers/JoinBrand';
import Message, {TYPES} from 'containers/Message';
import Brands from 'containers/Brands';
import Brand from 'containers/Brand';
import TermsConditions from 'containers/TermsConditions';
import Notifications from 'containers/Notifications';
import MainFilter from 'containers/MainFilter';
import Collection from 'containers/Collection';
import BrandReviews from 'containers/BrandReviews';
import RelatedBrandByTag from 'containers/RelatedBrandByTag';
import Branches from 'containers/Branches';

// Account screens
import Account from 'containers/Account';
import PhoneChange from 'containers/PhoneChange';
import EmailChange from 'containers/EmailChange';

import SavingHistory from 'containers/SavingHistory';
import SavingHistoryFilter from 'containers/SavingHistoryFilter';
import SavingHistoryReport from 'containers/SavingHistoryReport';

// TODO: show this screens only for user with out subscription
import Activation from 'containers/Activation';
import Subscription from 'containers/Subscription';
import Payment from 'containers/Payment';
import OrderTable from 'containers/OrderTable';
import UploadReceipt from 'containers/UploadReceipt';
import Discount from 'containers/Discount';
import Congratulations from 'containers/Congratulations';

import DrawerContent from 'components/Drawer';
import TabBar from './TabBar';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const config = {
  animation: 'timing',
  config: {
    stiffness: 1000,
    damping: 50,
    mass: 3,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const closeConfig = {
  animation: 'timing',
  config: {
    duration: 400,
    easing: Easing.linear,
  },
};

const screenOptions = {
  gestureEnabled: PLATFORM === 'ios',
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: config,
    close: closeConfig,
  },
  headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
  cardStyle: {
    backgroundColor: 'transparent',
  },
  cardOverlayEnabled: true,
  cardStyleInterpolator: ({current: {progress}}) => ({
    cardStyle: {
      opacity: progress.interpolate({
        inputRange: [0, 0.5, 0.9, 1],
        outputRange: [0, 0.25, 0.7, 1],
      }),
    },
    overlayStyle: {
      opacity: progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.5],
        extrapolate: 'clamp',
      }),
    },
  }),
};

export function AuthStack() {
  const options = {headerShown: false};
  return (
    <Stack.Navigator screenOptions={screenOptions} headerMode="float" animation="spring">
      <Stack.Screen name="SignIn" component={SignIn} options={options} />
      <Stack.Screen name="SignUp" component={SignUp} options={options} />
      <Stack.Screen name="PasswordRecovery" component={PasswordRecovery} options={options} />
      <Stack.Screen name="PasswordChange" component={PasswordChange} options={options} />
      <Stack.Screen name="Verification" component={Verification} options={options} />
      <Stack.Screen name="Message" component={Message} options={options} />
      <Stack.Screen name="TermsConditions" component={TermsConditions} options={options} />
    </Stack.Navigator>
  );
}

export function BlogStack() {
  const options = {headerShown: false};
  return (
    <Stack.Navigator screenOptions={screenOptions} headerMode="float" animation="spring">
      <Stack.Screen name="Blog" component={Blog} options={options} />
      <Stack.Screen name="Article" component={Article} options={options} />
    </Stack.Navigator>
  );
}

export function MainFilterStack() {
  const options = {headerShown: false};
  return (
    <Stack.Navigator screenOptions={screenOptions} headerMode="float" animation="spring">
      <Stack.Screen name="MainFilter" component={MainFilter} options={options} />
      <Stack.Screen name="Brands" component={Brands} options={options} />
    </Stack.Navigator>
  );
}

export function SubscriptionStack() {
  const options = {headerShown: false};
  return (
    <Stack.Navigator screenOptions={screenOptions} headerMode="float" animation="spring">
      <Stack.Screen name="Subscription" component={Subscription} options={options} />
      <Stack.Screen name="Payment" component={PaymentStack} options={options} />
      <Stack.Screen name="OrderTable" component={OrderTable} options={options} />
    </Stack.Navigator>
  );
}

export function PaymentStack() {
  const options = {headerShown: false};
  return (
    <Stack.Navigator screenOptions={screenOptions} headerMode="float" animation="spring">
      <Stack.Screen name="Payment" component={Payment} options={options} />
      <Stack.Screen name="TermsConditions" component={TermsConditions} options={options} />
    </Stack.Navigator>
  );
}

export function BrandStack() {
  const options = {headerShown: false};
  return (
    <Stack.Navigator
      screenOptions={screenOptions}
      headerMode="float"
      animation="spring"
      initialRouteName="Brand">
      <Stack.Screen name="Brand" component={Brand} options={options} />
      <Stack.Screen name="BrandReviews" component={BrandReviews} options={options} />
      <Stack.Screen name="RelatedBrandByTag" component={RelatedBrandByTag} options={options} />
      <Stack.Screen name="Branches" component={Branches} options={options} />
    </Stack.Navigator>
  );
}

export function SubscriptionEndStack() {
  const options = {headerShown: false};
  return (
    <Stack.Navigator
      initialRouteName="Message"
      screenOptions={screenOptions}
      headerMode="float"
      animation="spring">
      <Stack.Screen
        name="Message"
        component={Message}
        options={options}
        initialParams={{
          backScreen: 'Main',
          type: TYPES.SUBSCRIPTION_END,
        }}
      />
      <Stack.Screen name="Main" component={MainStack} options={options} />
    </Stack.Navigator>
  );
}

export function AccountStack() {
  const options = {headerShown: false};
  return (
    <Stack.Navigator screenOptions={screenOptions} headerMode="float" animation="spring">
      <Stack.Screen name="Account" component={Account} options={options} />
      <Stack.Screen name="PasswordChange" component={PasswordChange} options={options} />
      <Stack.Screen name="PhoneChange" component={PhoneChange} options={options} />
      <Stack.Screen name="EmailChange" component={EmailChange} options={options} />
      <Stack.Screen name="Verification" component={Verification} options={options} />
      <Stack.Screen name="TermsConditions" component={TermsConditions} options={options} />
    </Stack.Navigator>
  );
}

export function DiscountStack() {
  const options = {headerShown: false};
  return (
    <Stack.Navigator screenOptions={screenOptions} headerMode="float" animation="spring">
      <Stack.Screen name="Scanner" component={Scanner} options={options} />
      <Stack.Screen name="Discount" component={Discount} options={options} />
      <Stack.Screen name="Congratulations" component={Congratulations} options={options} />
      <Stack.Screen name="Subscription" component={SubscriptionStack} options={options} />
    </Stack.Navigator>
  );
}

export function SavingHistoryStack() {
  const options = {headerShown: false};
  return (
    <Stack.Navigator screenOptions={screenOptions} headerMode="float" animation="spring">
      <Stack.Screen name="SavingHistory" component={SavingHistory} options={options} />
      <Stack.Screen name="SavingHistoryFilter" component={SavingHistoryFilter} options={options} />
      <Stack.Screen name="SavingHistoryReport" component={SavingHistoryReport} options={options} />
    </Stack.Navigator>
  );
}

export function ProductStack() {
  const options = {headerShown: false};
  return (
    <Stack.Navigator screenOptions={screenOptions} headerMode="float" animation="spring">
      <Stack.Screen name="Products" component={Products} options={options} />
      <Stack.Screen name="Offer" component={Offer} options={options} />
      <Stack.Screen name="Coupon" component={Coupon} options={options} />
    </Stack.Navigator>
  );
}

export function HomeStack() {
  const options = {headerShown: false};
  return (
    <Stack.Navigator
      screenOptions={screenOptions}
      headerMode="float"
      animation="spring"
      initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} options={options} />
      <Stack.Screen name="Brand" component={BrandStack} options={options} />
      <Stack.Screen name="Notifications" component={Notifications} options={options} />
      <Stack.Screen name="Collection" component={Collection} options={options} />
      <Stack.Screen name="MainFilter" component={MainFilterStack} options={options} />
      <Stack.Screen name="Payment" component={PaymentStack} options={options} />
      <Stack.Screen name="OrderTable" component={OrderTable} options={options} />
      <Stack.Screen name="Message" component={Message} options={options} />
      <Stack.Screen name="Offer" component={Offer} options={options} />
      <Stack.Screen name="Coupon" component={Coupon} options={options} />
    </Stack.Navigator>
  );
}

const HomeTabStack = () => {
  const More = () => <></>;
  const options = ({route}) => ({
    tabBarVisible: route.state && route.state.index === 0,
  });
  return (
    <Tab.Navigator tabBar={props => <TabBar {...props} />}>
      <Tab.Screen name="Home" component={HomeStack} options={options} />
      <Tab.Screen name="Products" component={ProductStack} options={options} />
      <Tab.Screen
        name="Scanner"
        component={DiscountStack}
        options={{
          tabBarVisible: false,
        }}
      />
      <Tab.Screen name="SavingHistory" component={SavingHistoryStack} options={options} />
      <Tab.Screen name="More" component={More} />
    </Tab.Navigator>
  );
};

export const MainStack = () => {
  return (
    <Drawer.Navigator
      drawerPosition={I18nManager.isRTL ? 'right' : 'left'}
      drawerStyle={{
        width: sizeX(SIZES.DRAWER),
      }}
      drawerContentOptions={{activeTintColor: PALETTE.PRIMARY_COLOR}}
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={HomeTabStack} />
      <Drawer.Screen name="Account" component={AccountStack} />
      <Drawer.Screen name="InviteUser" component={InviteUser} />
      <Drawer.Screen name="About" component={About} />
      <Drawer.Screen name="Faq" component={Faq} />
      <Drawer.Screen name="Blog" component={BlogStack} />
      <Drawer.Screen name="Favorite" component={Favorite} />
      <Drawer.Screen name="Contacts" component={Contacts} />
      <Drawer.Screen name="SuggestBrand" component={SuggestBrand} />
      <Drawer.Screen name="JoinBrand" component={JoinBrand} />
      <Drawer.Screen name="Subscription" component={SubscriptionStack} />
      <Drawer.Screen name="Activation" component={Activation} />
      <Drawer.Screen name="UploadReceipt" component={UploadReceipt} />
    </Drawer.Navigator>
  );
};
