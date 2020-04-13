import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';

import {createMaterialTopTabNavigator} from 'react-navigation-tabs';

import Comment from './Comment';
import Collect from './Collect';
import Lyric from './Lyric';

export default createMaterialTopTabNavigator(
  {
    Collect: {
      screen: Collect,
      navigationOption: {
        title: '收藏',
      },
    },
    Comment: {
      screen: Comment,
      navigationOption: {
        title: '收藏',
      },
    },
    Lyric: {
      screen: Lyric,
      navigationOption: {
        title: '歌词',
      },
    },
  },
  {
    initialRouteName: 'Comment',
    tabBarOptions: {
      style: {
        backgroundColor: '#000000',
      },
      indicatorStyle: {
        backgroundColor: '#ffffff',
      },
    },
  },
);
