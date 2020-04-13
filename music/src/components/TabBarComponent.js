import React from 'react';
import {connect} from 'react-redux';
import {View, Text} from 'react-native';

class TabBarComponent extends React.Component {
  render() {
    return (
      <View>
        <Text
          style={{
            color: this.props.themeColor,
          }}>
          测试
        </Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  themeColor: state.theme.themeColor,
});

export default connect(mapStateToProps)(TabBarComponent);
