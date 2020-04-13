import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducer';
import {middleware} from '../navigator/AppNavigators';

const middlewares = [middleware, thunk];

/**
 * 创建store
 */
export default () => {
  // 根据 reducer 初始化 store
  const store = createStore(reducers, applyMiddleware(...middlewares));

  return store;
};
