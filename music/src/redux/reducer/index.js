import {combineReducers} from 'redux';

// 导航
import nav from './nav';
// 主题
import theme from './theme';
// 音乐
import music from './music';

/**
 * 3.合并reducer
 * @type {Reducer<any> | Reducer<any, AnyAction>}
 */
export default combineReducers({
  nav: nav,
  theme: theme,
  music: music,
});

// const redu = combineReducers({
//   nav: nav,
//   theme: theme,
// });

// export default redu;
