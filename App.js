// React Navigation
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

// Aplication pages
import Home from './src/pages/Home';

const AppNavigator = createSwitchNavigator({
  Home,
});

export default createAppContainer(AppNavigator);