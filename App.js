// React Navigation
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

// Aplication pages
import Home from './src/pages/Home';
import Dashboard from './src/pages/Dashboard';
import List from './src/pages/List';

const AppNavigator = createSwitchNavigator({
  Home,
  Dashboard,
  List
});

export default createAppContainer(AppNavigator);