import * as type from '../actions/actionType';


const initialState = {
  songOrder: 0,
  songList: [],
  songId: '',
  songName: '',
  singerName: '',
};

const musicReducer = function(state = initialState, action) {
  switch (action.type) {
    case type.MUSIC_CHANGE:
      return Object.assign({}, state, {
        songList: action.songList,
      });
    case type.MUSIC_CONTROL:
      return Object.assign({}, state, {
        songOrder: action.songOrder,
      });
    case type.MUSIC_ID:
      return Object.assign({}, state, {
        songId: action.songId,
      });
    case type.MUSIC_NAME:
      return Object.assign({}, state, {
        songName: action.songName,
      });
    case type.MUSIC_SINGER_NAME:
      return Object.assign({}, state, {
        singerName: action.singerName,
      });
    default:
      return state;
  }
};

export default musicReducer;