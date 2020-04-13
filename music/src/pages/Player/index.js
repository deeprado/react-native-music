import React, {Component} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';

import PlayerControl from './PlayerControl';

import Tabs from './tab';

class Player extends Component {
  render() {
    return (
      <View style={sytles.container}>
        <Tabs />
        <PlayerControl />
      </View>
    );
  }
}

const sytles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default Player;
