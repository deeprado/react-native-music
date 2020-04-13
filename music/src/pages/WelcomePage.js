/**
 * 欢迎页
 * @flow
 * **/

import React, {Component} from 'react';
import {StyleSheet, View, Image, InteractionManager} from 'react-native';

export default class WelcomePage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {navigation} = this.props;

    this.timer = setTimeout(() => {
      InteractionManager.runAfterInteractions(() => {
        navigation.navigate('AppPage', {
          theme: this.theme,
        });
      });
    }, 1000);
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{flex: 1}}
          resizeMode="center"
          source={require('../assets/images/LaunchScreen.png')}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
