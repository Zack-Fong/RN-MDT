import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/login/LoginScreen';
import DashboardScreen from '../screens/dashboard/DashboardScreen';
import TransferScreen from '../screens/transfer/TransferScreen';

const MainStack = createNativeStackNavigator();

class MainNavigator extends React.PureComponent {
    render() {
        return (
            <MainStack.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                <MainStack.Screen name="LoginScreen" component={LoginScreen} />
                <MainStack.Screen name="DashboardScreen" component={DashboardScreen} />
                <MainStack.Screen name="TransferScreen" component={TransferScreen} />
            </MainStack.Navigator>
        )
    }
}
export default MainNavigator;