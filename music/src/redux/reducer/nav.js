import {createNavigationReducer} from 'react-navigation-redux-helpers';

import RootNavigator from '../navigator/App.routes';

// 官方示例
const navReducer = createNavigationReducer(RootNavigator);

export default navReducer;
