/**
 * @format
 */

import { AppRegistry, YellowBox } from 'react-native';
import App from './App';
import {name as appName} from './app.json';

// Ignora AsyncStorage error
YellowBox.ignoreWarnings([
  "Warning: AsyncStorage has been extracted from react-native core"
]);

AppRegistry.registerComponent(appName, () => App);
