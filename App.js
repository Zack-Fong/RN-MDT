import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import MainNavigator from './src/navigators/MainNavigator';

class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    )
  }
}

export default App;
