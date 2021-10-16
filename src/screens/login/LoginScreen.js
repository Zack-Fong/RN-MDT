import React from 'react';
import { View, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from 'react-native';

import { isStringEmpty, capitalizeString } from '../../common/commonFunctions';
import { COLORS } from '../../common/colors';
import { TEXT_CONSTANTS } from '../../common/constants';

import ActivityIndicatorOverlay from '../../components/ActivityIndicatorOverlay';
import TextInputComponent from '../../components/input/TextInput';
import ButtonComponent from '../../components/Button';

class LoginScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,

            emptyUsername: false,
            emptyPassword: false,

            username: "",
            password: ""
        }
    }

    componentDidMount() {

    }

    validate() {
        this.setState({
            emptyUsername: isStringEmpty(this.state.username),
            emptyPassword: isStringEmpty(this.state.password)
        })

        return (isStringEmpty(this.state.username) || isStringEmpty(this.state.password));
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={() => {
                Keyboard.dismiss()
            }}>
                <KeyboardAvoidingView behavior={"padding"} enabled={Platform.OS == 'ios' ? true : false} style={{ flex: 1 }}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <ActivityIndicatorOverlay
                            isShow={this.state.isLoading}
                        />

                        <TextInputComponent
                            placeholder={capitalizeString(TEXT_CONSTANTS.USERNAME)}
                            onBlurTextInput={(username) => {
                                this.setState({
                                    username: username
                                })
                            }}
                        />

                        <TextInputComponent
                            placeholder={capitalizeString(TEXT_CONSTANTS.PASSWORD)}
                            onBlurTextInput={(password) => {
                                this.setState({
                                    password: password
                                })
                            }}
                        />

                        <ButtonComponent
                            borderColor={COLORS.GREEN}
                            textColor={COLORS.GREEN}
                            onPressButton={() => {
                                this.props.navigation.navigate("DashboardScreen");
                            }}
                            name={capitalizeString(TEXT_CONSTANTS.LOGIN)}
                        />
                    </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        )
    }
}
export default LoginScreen;