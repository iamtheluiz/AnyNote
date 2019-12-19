// React Navigation
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

// Aplication pages
import Home from './src/pages/Home';
import Dashboard from './src/pages/Dashboard';

const AppNavigator = createSwitchNavigator({
  Home,
  Dashboard
});

export default createAppContainer(AppNavigator);