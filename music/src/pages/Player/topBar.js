import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

const collectPng = require('../../assets/images/collect.png');
const musicPng = require('../../assets/images/music.png');
const mePng = require('../../assets/images/me.png');

class TopBar extends Component {
  constructor(props) {
    super(props);
  }

  // 处理props回调
  changeBar(name) {
    this.props.onChangeBar(name);
  }

  render() {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#ffffff',
          height: 40,
          width: 420,
        }}>
        <TouchableOpacity
          style={{marginLeft: 15, marginRight: 15}}
          onPress={() => {
            this.changeBar('collect');
          }}>
          <View>
            <Image source={collectPng} style={{width: 20, height: 20}} />
            <Text style={{fontSize: 10}}>收藏</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{marginLeft: 15, marginRight: 15}}
          onPress={() => {
            this.changeBar('find');
          }}>
          <View>
            <Image source={musicPng} style={{width: 20, height: 20}} />
            <Text style={{fontSize: 10}}>音乐</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{marginLeft: 15, marginRight: 15}}
          onPress={() => {
            this.changeBar('play');
          }}>
          <View>
            <Image source={mePng} style={{width: 20, height: 20}} />
            <Text style={{fontSize: 10}}>歌词</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default TopBar;
