import React from 'react';
import {createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import {Icon} from 'react-native-elements';

// 引导页面
import WelcomePage from '../../pages/WelcomePage';
// 发现
import HomeScreen from '../../pages/HomeScreen';
// 我的
import FavoriteScreen from '../../pages/FavoriteScreen';
// 云村
import PopularScreen from '../../pages/PopularScreen';
// 账号
import ProfileScreen from '../../pages/ProfileScreen';
// 播放器
import Player from '../../pages/Player';

const switchNavigationOptions = {
  gesturesEnabled: true,
  headerTitle: null,
};

const commonNavigationOptions = {
  tabBarVisible: false,
  headerShown: false,
};

const bottomTabOptions = (tabBarTitle, {iconName, typeName}, navTitle) => {
  const tabBarLabel = tabBarTitle;
  const tabBarIcon = ({tintColor, focused}) => {
    return <Icon name={iconName} type={typeName} size={25} color={tintColor} />;
  };
  const headerTitle = navTitle;
  const headerTitleStyle = {fontSize: 22, color: 'white', alignSelf: 'center'};
  // header的style
  const headerStyle = {backgroundColor: '#4ECBFC'};
  const tabBarVisible = true;
  return {
    tabBarLabel,
    tabBarIcon,
    tabBarVisible,
    headerTitle,
    headerTitleStyle,
    headerStyle,
  };
};

const AppTabNavigator = createBottomTabNavigator(
  {
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: () =>
        bottomTabOptions('发现', {
          iconName: 'social-github',
          typeName: 'foundation',
        }),
    },
    FavoriteScreen: {
      screen: FavoriteScreen,
      navigationOptions: () =>
        bottomTabOptions('我的', {
          iconName: 'graph-bar',
          typeName: 'foundation',
        }),
    },
    PopularScreen: {
      screen: PopularScreen,
      navigationOptions: () =>
        bottomTabOptions('云村', {iconName: 'heart', typeName: 'foundation'}),
    },
    ProfileScreen: {
      screen: ProfileScreen,
      navigationOptions: () =>
        bottomTabOptions('账号', {iconName: 'torso', typeName: 'foundation'}),
    },
  },
  {
    initialRouteName: 'HomeScreen',
    tabBarOptions: {
      activeTintColor: '#FF9744',
      inactiveTintColor: 'gray',
    },
  },
);

let AppAllStack = createStackNavigator(
  {
    TabNavigator: {
      screen: AppTabNavigator,
      navigationOptions: commonNavigationOptions,
    },
    Player: {
      screen: Player,
      navigationOptions: commonNavigationOptions,
    },
  },
  {
    initialRouteName: 'TabNavigator',
    headerMode: 'none',
    navigationOptions: {
      gesturesEnabled: true,
      headerTitle: null,
      headerShown: false,
    },
  },
);

const SplashStack = createSwitchNavigator(
  {
    SplashPage: {
      screen: WelcomePage,
      navigationOptions: switchNavigationOptions,
    },
    AppPage: {
      screen: AppAllStack,
      navigationOptions: switchNavigationOptions,
    },
  },
  {
    // mode: 'card',
    headerMode: 'none',
    initialRouteName: 'SplashPage',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);

// const prefix = 'qimao://';

export default SplashStack;
