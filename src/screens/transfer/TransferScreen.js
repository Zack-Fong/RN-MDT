import React from 'react';
import { View, SafeAreaView, Text, Image, TouchableOpacity } from 'react-native';

import { TEXT_CONSTANTS } from '../../common/constants';
import { capitalizeString } from '../../common/commonFunctions';
import { COLORS } from '../../common/colors';

import ButtonComponent from '../../components/Button';
import ActivityIndicatorOverlay from '../../components/ActivityIndicatorOverlay';
import TextInputComponent from '../../components/input/TextInput';
import { images } from '../../assets/assets';

class TransferScreen extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false
        }
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
                <ActivityIndicatorOverlay
                    isShow={this.state.isLoading}
                />

                <Text style={{ margin: 10, paddingLeft: 10, fontWeight: 'bold', fontSize: 20 }}>
                    {capitalizeString(TEXT_CONSTANTS.MAKE_A_TRANSFER)}
                </Text>

                <View style={{ flex: 3, justifyContent: 'center' }}>
                    <TextInputComponent
                        placeholder={capitalizeString(TEXT_CONSTANTS.RECIPIENT)}
                        onBlurTextInput={(username) => {
                            this.setState({
                                username: username
                            })
                        }}
                    />

                    <TouchableOpacity
                        style={{
                            marginLeft: 15,
                            marginRight: 15,
                            marginTop: 15,
                            marginBottom: 10,
                            height: 30,
                            borderColor: COLORS.LIGHT_GRAY,
                            borderBottomWidth: 2,
                            flexDirection: 'row'
                        }}>
                        <Text style={{ color: COLORS.LIGHT_GRAY, flex: 1 }}>
                            {capitalizeString(TEXT_CONSTANTS.DATE_OF_TRANSFER)}
                        </Text>
                        <Image
                            source={images.calender}
                            style={{
                                width: 25,
                                height: 25,
                                resizeMode: 'contain',
                                marginRight: 5
                            }}
                        />
                    </TouchableOpacity>

                    <TextInputComponent
                        placeholder={capitalizeString(TEXT_CONSTANTS.DESCRIPTION)}
                        onBlurTextInput={(description) => {
                            this.setState({
                                description: description
                            })
                        }}
                    />

                    <TextInputComponent
                        placeholder={capitalizeString(TEXT_CONSTANTS.AMOUNT)}
                        onBlurTextInput={(amount) => {
                            this.setState({
                                amount: amount
                            })
                        }}
                    />
                </View>

                <View style={{ flex: 1, flexDirection: 'row', marginLeft: 15, marginRight: 15, justifyContent: 'space-between' }}>
                    <ButtonComponent
                        onPressButton={() => {
                            this.props.navigation.goBack();
                        }}
                        fullWidth
                        name={capitalizeString(TEXT_CONSTANTS.CANCEL)}
                    />

                    <ButtonComponent
                        onPressButton={() => {
                            // this.props.navigation.goBack();
                        }}
                        fullWidth
                        borderColor={COLORS.GREEN}
                        textColor={COLORS.GREEN}
                        name={capitalizeString(TEXT_CONSTANTS.SUBMIT)}
                    />
                </View>
            </SafeAreaView>
        )
    }
}
export default TransferScreen;