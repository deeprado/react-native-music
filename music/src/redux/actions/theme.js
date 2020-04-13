import * as type from './actionType';

export function onThemeChange(themeColor) {
  return dispatch => {
    dispatch(changeThemColor(themeColor));
  };
}

function changeThemColor(themeColor) {
  console.log('themeColor', themeColor);
  return {
    type: type.THEME_CHANAGE,
    themeColor: themeColor,
  };
}

/* default 导出所有 Action Creators */
export default {
  // 虽然是同步的函数，但请不要自行 bindActionCreators
  // 皆因调用 connect 后，react-redux 已经帮我们做了，见：
  // https://github.com/reactjs/react-redux/blob/master/src/utils/wrapActionCreators.js
  onThemeChange,
};

// ================================
// Action handlers for Reducer
// 本来更新 state 是 Reducer 的责任
// 但要把 ActionType 导出又引入实在太麻烦
// 且在 Reducer 中写 switch-case 实在太不优雅
// 故在此直接给出处理逻辑
// ================================
