import React from 'react';
import { View, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Text, Alert } from 'react-native';

import { isStringEmpty, capitalizeString } from '../../common/commonFunctions';
import { COLORS } from '../../common/colors';
import { TEXT_CONSTANTS } from '../../common/constants';

import ActivityIndicatorOverlay from '../../components/ActivityIndicatorOverlay';
import TextInputComponent from '../../components/TextInput';
import ButtonComponent from '../../components/Button';
import ErrorMessage from '../../components/ErrorMesage';

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
        let errorsPresent = isStringEmpty(this.state.username) || isStringEmpty(this.state.password)
        this.setState({
            isLoading: errorsPresent ? false : true,

            emptyUsername: isStringEmpty(this.state.username),
            emptyPassword: isStringEmpty(this.state.password)
        })

        return (errorsPresent);
    }

    onPressLoginButton = () => {
        Keyboard.dismiss();

        this.setState({
            isLoading: true
        }, () => {
            let validationResult = this.validate();
            if (validationResult) {
                return;
            }

            login(this.state.username, this.state.password)
                .then(() => {
                    this.props.navigation.navigate("DashboardScreen");
                    this.setState({ isLoading: false })
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
                            onChangeText={this.onUsernameTextChange}
                        />
                        {this.state.emptyUsername ?
                            <ErrorMessage
                                type={TEXT_CONSTANTS.USERNAME} /> : null}

                        <TextInputComponent
                            secureTextEntry
                            placeholder={capitalizeString(TEXT_CONSTANTS.PASSWORD)}
                            onChangeText={this.onPasswordTextChange}
                        />
                        {this.state.emptyPassword ?
                            <ErrorMessage
                                type={TEXT_CONSTANTS.PASSWORD} /> : null}

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