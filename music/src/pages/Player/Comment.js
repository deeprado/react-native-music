import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  pop,
  listDetail,
  classical,
  rock,
  hiphop,
  hotComment,
  west,
  japan,
  minyao,
  metal,
  punk,
  eng,
} from '../../config/api';
import {connect} from 'react-redux';
import {
  changeSong,
  controlPlay,
  songId,
  songName,
  singerName,
} from '../../redux/actions/music';

const arrowlPng = require('../../assets/images/arrowl.png');
const arrowrPng = require('../../assets/images/arrowr.png');

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ranking: [],
      order: 0,
      type: 'pop',
      songId: 0,
      showImg: {
        uri: 'https://facebook.github.io/react/logo-og.png',
      },
      comment: '',
      commentWriter: '',
      type: '流行',
      hideMore: true,
    };
    this.getComment = this.getComment.bind(this);
    this.typeList = [
      {
        name: '流行',
        api: 'pop',
      },
      {
        name: '经典',
        api: 'classical',
      },
      {
        name: '摇滚',
        api: 'rock',
      },
      {
        name: '嘻哈',
        api: 'hiphop',
      },
      {
        name: '欧美',
        api: 'west',
      },
      {
        name: '日语',
        api: 'japan',
      },
      {
        name: '民谣',
        api: 'minyao',
      },
      {
        name: '金属',
        api: 'metal',
      },
      {
        name: '朋克',
        api: 'punk',
      },
      {
        name: '英伦',
        api: 'eng',
      },
    ];
  }

  componentWillReceiveProps() {
    // if (store.getState().songId) {
    //   this.getComment(store.getState().songId);
    // }
  }

  componentDidMount() {
    this.getPlayList();
  }

  toggleMore() {
    this.setState({
      hideMore: !this.state.hideMore,
    });
  }

  // 切换歌曲列表
  changeType(api, name) {
    this.getPlayList(api);
    this.setState({
      type: name,
    });
    this.toggleMore();
  }

  // 切歌
  change(order) {
    if (order === 'next') {
      this.setState(
        {
          order:
            this.state.order !== this.state.ranking.length - 1
              ? this.state.order + 1
              : 0,
          showImg: Object.assign({}, this.state.showImg, {
            uri: this.state.ranking[
              this.state.order !== this.state.ranking.length - 1
                ? this.state.order + 1
                : 0
            ].al.picUrl,
          }),
          songId: this.state.ranking[
            this.state.order !== this.state.ranking.length - 1
              ? this.state.order + 1
              : 0
          ].id,
        },
        () => {
          this.play(
            this.state.order == this.state.ranking.length - 1
              ? this.state.order + 1
              : 0,
          );
          this.getComment();
        },
      );
    } else if (order === 'last') {
      this.setState(
        {
          order:
            this.state.order !== 0
              ? this.state.order - 1
              : this.state.ranking.length - 1,
          showImg: Object.assign({}, this.state.showImg, {
            uri: this.state.ranking[
              this.state.order !== 0
                ? this.state.order - 1
                : this.state.ranking.length - 1
            ].al.picUrl,
          }),
          songId: this.state.ranking[
            this.state.order !== 0
              ? this.state.order - 1
              : this.state.ranking.length - 1
          ].id,
        },
        () => {
          this.play(
            this.state.order == 0
              ? this.state.ranking.length - 1
              : this.state.order - 1,
          );
          this.getComment();
        },
      );
    }
  }

  // 向player发送请求
  play() {
    this.props.changeSong(this.state.ranking);
    this.props.controlPlay(this.state.order);
    this.props.songId(this.state.songId);
    this.props.songName(this.state.ranking[this.state.order].name);
    this.props.singerName(this.state.ranking[this.state.order].ar[0].name);
  }

  // 获取评论
  getComment(id) {
    let songId = id ? id : this.state.songId;
    fetch(hotComment + songId)
      .then(res => {
        return res.json();
      })
      .then(res => {
        this.setState({
          comment: res.hotComments[0].content,
          commentWriter: res.hotComments[0].user.nickname,
        });
      })
      .catch(err => {
        console.warn(err);
      });
  }

  // 获取播放列表
  getPlayList(type = 'pop') {
    let api;
    switch (type) {
      case 'pop':
        api = pop;
        break;
      case 'classical':
        api = classical;
        break;
      case 'rock':
        api = rock;
        break;
      case 'hiphop':
        api = hiphop;
        break;
      case 'west':
        api = west;
        break;
      case 'japan':
        api = japan;
        break;
      case 'minyao':
        api = minyao;
        break;
      case 'metal':
        api = metal;
        break;
      case 'punk':
        api = punk;
        break;
      case 'eng':
        api = eng;
        break;
      default:
        break;
    }
    fetch(api)
      .then(res => {
        return res.json();
      })
      .then(res => {
        fetch(listDetail + res.playlists[0].id)
          .then(res => {
            return res.json();
          })
          .then(res => {
            this.setState(prevState => ({
              ranking: [...prevState.ranking, ...res.playlist.tracks],
              showImg: Object.assign({}, this.state.showImg, {
                uri: res.playlist.tracks[0].al.picUrl,
              }),
            }));
          });
      })
      .catch(err => {
        console.warn(err);
      });
  }

  render() {
    let moreTypeBtn = this.typeList.map(item => (
      <TouchableOpacity
        onPress={() => {
          this.changeType(item.api, item.name);
        }}
        key={item.api}>
        <Text style={styles.moreTypeItem}>{item.name}</Text>
      </TouchableOpacity>
    ));
    return (
      <View style={styles.commentwrap}>
        <Image
          source={this.state.showImg}
          style={styles.Image}
          blurRadius={5}
        />
        <TouchableOpacity
          onPress={() => {
            this.change('last');
          }}
          style={{position: 'absolute', top: 280, left: 20}}>
          <Image source={arrowlPng} style={styles.arrow} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.change('next');
          }}
          style={{position: 'absolute', top: 280, right: 20}}>
          <Image source={arrowrPng} style={styles.arrow} />
        </TouchableOpacity>
        <View style={styles.Bg}>
          <View style={styles.type}>
            <TouchableOpacity
              onPress={() => {
                this.toggleMore();
              }}>
              <Text style={styles.curentType}> {this.state.type} </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.moreType}>
            {this.state.hideMore ? null : moreTypeBtn}
          </View>
          <View style={styles.redBg}>
            <View style={styles.comment}>
              <Text style={styles.comment_content}>
                {' '}
                {this.state.comment
                  ? this.state.comment
                  : '在NeatMusic中发现有趣的评论'}
              </Text>
              <Text style={styles.comment_info}>
                来自网易云音乐用户{' '}
                {this.state.commentWriter
                  ? this.state.commentWriter
                  : 'RicoFishing'}{' '}
                在 《
                {this.state.ranking.length >= 1
                  ? this.state.ranking[this.state.order].name
                  : ''}
                》下的评论{' '}
              </Text>
              <View style={styles.redArrow}></View>
              <View style={styles.whiteArrow}></View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  commentwrap: {position: 'relative'},
  type: {position: 'absolute', top: 30, backgroundColor: 'black', padding: 8},
  curentType: {color: 'white'},
  moreType: {
    flexDirection: 'row',
    position: 'absolute',
    top: 27,
    width: 250,
    flexWrap: 'wrap',
  },
  moreTypeItem: {
    backgroundColor: 'black',
    color: 'white',
    padding: 8,
    margin: 3,
  },
  Image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  arrow: {width: 20, height: 20},
  Bg: {
    width: (Dimensions.get('window').width * 7) / 10,
    height: 617,
    position: 'absolute',
    left: 65,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  redBg: {
    backgroundColor: '#cc3300',
    width: (Dimensions.get('window').width * 7) / 10 - 10,
    position: 'relative',
    bottom: 20,
  },
  comment: {
    backgroundColor: 'white',
    position: 'relative',
    width: (Dimensions.get('window').width * 7) / 10,
    right: 16,
    top: 6,
    padding: 10,
    borderColor: '#cc3300',
    borderWidth: 4,
  },
  comment_content: {
    color: '#cc3300',
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 22,
  },
  comment_info: {color: '#cc3300', fontSize: 12, marginTop: 10},
  redArrow: {
    width: 0,
    height: 0,
    borderWidth: 10,
    borderLeftColor: '#cc3300',
    borderTopColor: '#cc3300',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    position: 'absolute',
    bottom: -24,
    left: -4,
  },
  whiteArrow: {
    width: 0,
    height: 0,
    borderWidth: 10,
    borderLeftColor: '#ffffff',
    borderTopColor: '#ffffff',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    position: 'absolute',
    bottom: -14,
    left: 0,
  },
});

const mapStateToProps = ({musit}) => {
  return {
    songList: musit.songList,
    songOrder: musit.songOrder,
    songName: musit.songName,
    singerName: musit.singerName,
  };
};

const mapDispatchToProps = dispatch => ({
  changeSong: ranking => dispatch(changeSong(ranking)),
  controlPlay: order => dispatch(controlPlay(order)),
  songId: id => dispatch(songId(id)),
  songName: name => dispatch(songName(name)),
  singerName: author => dispatch(singerName(author)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Comment);
