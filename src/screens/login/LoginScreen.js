import React from 'react';
import { View, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Text, Alert } from 'react-native';

import { isStringEmpty, capitalizeString } from '../../common/commonFunctions';
import { COLORS } from '../../common/colors';
import { TEXT_CONSTANTS } from '../../common/constants';

import ActivityIndicatorOverlay from '../../components/ActivityIndicatorOverlay';
import TextInputComponent from '../../components/input/TextInput';
import ButtonComponent from '../../components/Button';

import { login } from '../../api/authenticate/authenticateServices';

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

    onUsernameTextChange = (username) => {
        this.setState({
            username: username,
            emptyUsername: isStringEmpty(username)
        })
    }

    onPasswordTextChange = (password) => {
        this.setState({
            password: password,
            emptyPassword: isStringEmpty(password)
        })
    }

    validate = () => {
        this.setState({
            emptyUsername: isStringEmpty(this.state.username),
            emptyPassword: isStringEmpty(this.state.password)
        })

        return (isStringEmpty(this.state.username) || isStringEmpty(this.state.password));
    }

    onPressLoginButton = () => {
        Keyboard.dismiss();
        this.setState({
            isLoading: true
        }, () => {
            let validationResult = this.validate();
            if (validationResult) {
                this.setState({
                    isLoading: false
                })
                return;
            }

            login(this.state.username, this.state.password)
                .then(() => {
                    this.setState({
                        isLoading: false
                    }, () => {
                        this.props.navigation.navigate("DashboardScreen");
                    })
                }).catch(loginError => {
                    Alert.alert(
                        "Oops!",
                        loginError,
                        [
                            {
                                text: "Ok",
                                onPress: () => {
                                    this.setState({
                                        isLoading: false
                                    })
                                },
                                style: "cancel",
                            },
                        ])
                })
        })
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
                            onBlurTextInput={this.onUsernameTextChange}
                        />
                        {this.state.emptyUsername ?
                            <Text style={{ color: COLORS.RED, marginTop: -15, marginLeft: 15, fontSize: 10 }}>
                                {TEXT_CONSTANTS.EMPTY_USERNAME_ERROR}
                            </Text> : null}

                        <TextInputComponent
                            secureTextEntry
                            placeholder={capitalizeString(TEXT_CONSTANTS.PASSWORD)}
                            onBlurTextInput={this.onPasswordTextChange}
                        />
                        {this.state.emptyPassword ?
                            <Text style={{ color: COLORS.RED, marginTop: -15, marginLeft: 15, fontSize: 10 }}>
                                {TEXT_CONSTANTS.EMPTY_PASSWORD_ERROR}
                            </Text> : null}

                        <ButtonComponent
                            borderColor={COLORS.GREEN}
                            textColor={COLORS.GREEN}
                            onPressButton={this.onPressLoginButton}
                            name={capitalizeString(TEXT_CONSTANTS.LOGIN)}
                        />
                    </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        )
    }
}
export default LoginScreen;