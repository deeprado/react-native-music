import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {connect} from 'react-redux';

import {onThemeChange} from '../redux/actions/theme';

import TabBarComponent from '../components/TabBarComponent';

class HomeScreen extends React.Component {
  render() {
    return (
      <View>
        <Text>HomeScreen</Text>
        <TabBarComponent />
        <Button
          title="改变主题色"
          onPress={() => {
            // let {dispatch} = this.props.navigation;
            // dispatch(onThemeChange('red'))
            this.props.onThemeChange('red');
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  onThemeChange: themeColor => dispatch(onThemeChange(themeColor)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
