import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {changeSong, controlPlay, songId} from '../../redux/actions/music';
import {lyric} from '../../config/api';

class Lyric extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lrc: '',
    };
  }
  // componentWillReceiveProps() {
  //   let Id = store.getState().songId;
  //   fetch(lyric + Id)
  //     .then(res => {
  //       return res.json();
  //     })
  //     .then(res => {
  //       this.setState({lrc: res.lrc.lyric});
  //     });
  // }
  render() {
    return (
      <View style={styles.commentwrap}>
        {/* <Image source={require("../images/lrcbg.jpeg")} style={styles.Image} blurRadius={1} /> */}
        <ScrollView style={styles.scroll}>
          <Text style={styles.lrc}>
            {this.state.lrc.replace(/\[[^\[^\]]*\]/g, '')}
          </Text>
        </ScrollView>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  commentwrap: {height: 617},
  scroll: {height: 617, paddingLeft: 10, paddingRight: 10},
  lrc: {fontSize: 18, lineHeight: 40, fontStyle: 'italic', textAlign: 'center'},
  // Image: { width: 412, height: 617 },
});

const mapStateToProps = ({music}) => {
  return {
    songList: music.songList,
    songOrder: music.songOrder,
    songId: music.songId,
  };
};

export default connect(mapStateToProps)(Lyric);
