import React from 'react';
import { View, SafeAreaView, Text, ScrollView } from 'react-native';


import { TEXT_CONSTANTS, KEYS_SAVED_IN_ASYNC_STORAGE } from '../../common/constants';
import { capitalizeString, retrieveAsyncStorageData, deleteAsyncStorageData } from '../../common/commonFunctions';
import { COLORS } from '../../common/colors';

import ButtonComponent from '../../components/Button';
import ActivityIndicatorOverlay from '../../components/ActivityIndicatorOverlay';
import Line from '../../components/Line';

class DashboardScreen extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false
        }
    }

    componentDidMount() {
        retrieveAsyncStorageData(KEYS_SAVED_IN_ASYNC_STORAGE.AUTHORIZATION_TOKEN).then((token) => {
            console.log("token: ", token);
        })
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ActivityIndicatorOverlay
                    isShow={this.state.isLoading}
                />

                <View style={{ alignSelf: 'flex-end', width: '30%' }}>
                    <ButtonComponent
                        onPressButton={() => {
                            deleteAsyncStorageData()
                                .then(() => {
                                    this.props.navigation.reset({
                                        index: 0,
                                        routes: [{ name: 'LoginScreen' }]
                                    })
                                })
                        }}
                        name={capitalizeString(TEXT_CONSTANTS.LOGOUT)}
                    />
                </View>

                <Text style={{
                    padding: 10,
                    margin: 10,
                    borderRadius: 10,
                    borderWidth: 1
                }}>
                    <Text style={{ fontWeight: '500' }}>
                        You have
                    </Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                        {`\n\nSGD ${10000}\n\n`}
                    </Text>
                    <Text style={{ fontWeight: '500' }}>
                        in your account
                    </Text>
                </Text>

                <Line />

                <Text style={{
                    marginTop: 10,
                    marginLeft: 15,
                    fontSize: 20,
                    fontWeight: 'bold'
                }}>
                    {capitalizeString(TEXT_CONSTANTS.YOUR_ACTIVITY)}
                </Text>

                <ScrollView />

                <ButtonComponent
                    onPressButton={() => {
                        this.props.navigation.navigate("TransferScreen");
                    }}
                    borderColor={COLORS.BLUE}
                    textColor={COLORS.BLUE}
                    name={capitalizeString(TEXT_CONSTANTS.MAKE_A_TRANSFER)}
                />
            </SafeAreaView>
        )
    }
}
export default DashboardScreen;