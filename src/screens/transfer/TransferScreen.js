import React from 'react';
import { View, SafeAreaView, Text, Image, TouchableOpacity, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';

import { TEXT_CONSTANTS } from '../../common/constants';
import { capitalizeString, isArrayEmpty, isNumberEmpty, isStringEmpty, isObjectEmpty } from '../../common/commonFunctions';
import { COLORS } from '../../common/colors';

import ButtonComponent from '../../components/Button';
import ActivityIndicatorOverlay from '../../components/ActivityIndicatorOverlay';
import TextInputComponent from '../../components/TextInput';
import ErrorMessage from '../../components/ErrorMesage';

import { images } from '../../assets/assets';

import { retrievePayees } from '../../api/account/accountServices';
import { initiateTransfer } from '../../api/transfer/transferServices';

class TransferScreen extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            isShowDatePicker: false,

            payees: [],
            payeesOptions: [],

            recipient: "",
            openRecipientDropdown: false,
            emptyRecipient: false,

            dateOfTransfer: new Date(),
            emptyDateOfTransfer: false,

            description: "",
            emptyDescription: false,

            amount: null,
            emptyAmount: false
        }
    }

    componentDidMount() {
        this.setState({
            isLoading: true
        }, () => {
            retrievePayees()
                .then((retrievedPayees) => {
                    let payeesOptions = [];
                    if (!isArrayEmpty(retrievedPayees)) {
                        payeesOptions = retrievedPayees.map((payee) => {
                            return { key: payee.id, value: payee.accountNo, label: payee.accountHolderName }
                        })
                    }

                    this.setState({
                        isLoading: false,

                        payees: !isArrayEmpty(retrievedPayees) ? retrievedPayees : [],
                        payeesOptions: payeesOptions
                    })
                }).catch((retrievePayeesError) => {
                    console.log("retrievePayeesError: ", retrievePayeesError);
                    this.setState({
                        isLoading: false
                    })
                })
        })
    }

    onPressRecipientDropdown = (open) => {
        this.setState({
            openRecipientDropdown: open
        })
    }
    onChangeRecipentValue = (recipient) => {
        this.setState({
            recipient: recipient(recipient),
            emptyRecipient: isStringEmpty(recipient(recipient))
        })
    }

    onPressDateOfTransfer = () => {
        this.setState({
            isShowDatePicker: true
        })
    }

    onConfirmDatePicker = (date) => {
        this.setState({
            isShowDatePicker: false,

            dateOfTransfer: date,
            emptyDateOfTransfer: isObjectEmpty(date)
        })
    }

    onHideDatePicker = () => {
        this.setState({
            isShowDatePicker: false
        })
    }

    onDescriptionTextChange = (description) => {
        this.setState({
            description: description,
            emptyDescription: isStringEmpty(description)
        })
    }

    onAmountTextChange = (amount) => {
        this.setState({
            amount: amount,
            emptyAmount: isNumberEmpty(amount)
        })
    }

    onPressCancelButton = () => {
        this.props.navigation.goBack();
    }

    onPressSubmitButton = () => {
        this.setState({
            isLoading: true
        }, () => {
            let validationResult = this.validate();
            if (validationResult) {
                return;
            }

            initiateTransfer(this.state.recipient, Number(this.state.amount), moment(this.state.dateOfTransfer).format(), this.state.description)
                .then((initiateTransferResult) => {
                    console.log("initiateTransferResult: ", initiateTransferResult);
                    Alert.alert(
                        TEXT_CONSTANTS.SUCCESS,
                        TEXT_CONSTANTS.SUCCESS_TRANSACTION_ADDED,
                        [
                            {
                                text: "Ok",
                                onPress: () => {
                                    this.setState({
                                        isLoading: false
                                    })
                                    this.props.navigation.goBack();
                                },
                                style: "cancel",
                            },
                        ])
                }).catch((initiateTransferError) => {
                    this.setState({ isLoading: false });
                    console.log("initiateTransferError: ", initiateTransferError);
                })
        })
    }

    validate = () => {
        let errorsPresent = isStringEmpty(this.state.recipient) || isObjectEmpty(this.state.dateOfTransfer) || isNumberEmpty(this.state.amount) || isStringEmpty(this.state.description);
        this.setState({
            isLoading: errorsPresent ? false : true,

            emptyRecipient: isStringEmpty(this.state.recipient),
            emptyDateOfTransfer: isObjectEmpty(this.state.dateOfTransfer),
            emptyAmount: isNumberEmpty(this.state.amount),
            emptyDescription: isStringEmpty(this.state.description)
        })

        return (errorsPresent);
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
                    {/* <TouchableOpacity
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
                            {capitalizeString(TEXT_CONSTANTS.RECIPIENT)}
                        </Text>
                        <Image
                            source={images.dropdown}
                            style={{
                                width: 25,
                                height: 25,
                                resizeMode: 'contain',
                                marginRight: 5
                            }}
                        />
                    </TouchableOpacity> */}
                    <DropDownPicker
                        containerStyle={{ height: 40, marginLeft: 10, marginBottom: 20, width: '95%' }}
                        placeholder={capitalizeString(TEXT_CONSTANTS.RECIPIENT)}
                        placeholderStyle={{ color: COLORS.LIGHT_GRAY }}
                        items={this.state.payeesOptions}

                        open={this.state.openRecipientDropdown}
                        setOpen={this.onPressRecipientDropdown}

                        value={this.state.recipient}
                        setValue={this.onChangeRecipentValue}

                        disabled={this.state.isLoading}
                    />
                    {this.state.emptyRecipient ?
                        <ErrorMessage
                            forOtherInputComponent
                            type={TEXT_CONSTANTS.RECIPIENT} /> : null}

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
                        }}
                        onPress={this.onPressDateOfTransfer}>
                        <Text style={{ color: isObjectEmpty(this.state.dateOfTransfer) ? COLORS.LIGHT_GRAY : 'black', flex: 1 }}>
                            {isObjectEmpty(this.state.dateOfTransfer) ? capitalizeString(TEXT_CONSTANTS.DATE_OF_TRANSFER) : moment(this.state.dateOfTransfer).format('DD MMM YYYY')}
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
                    {this.state.emptyDateOfTransfer ?
                        <ErrorMessage
                            forOtherInputComponent
                            type={TEXT_CONSTANTS.DATE_OF_TRANSFER} /> : null}

                    <TextInputComponent
                        placeholder={capitalizeString(TEXT_CONSTANTS.DESCRIPTION)}
                        onChangeText={this.onDescriptionTextChange}
                    />
                    {this.state.emptyDescription ?
                        <ErrorMessage
                            type={TEXT_CONSTANTS.DESCRIPTION} /> : null}

                    <TextInputComponent
                        decimalKeyboard
                        placeholder={capitalizeString(TEXT_CONSTANTS.AMOUNT)}
                        onChangeText={this.onAmountTextChange}
                    />
                    {this.state.emptyAmount ?
                        <ErrorMessage
                            type={TEXT_CONSTANTS.AMOUNT} /> : null}
                </View>

                <View style={{ flex: 1, flexDirection: 'row', marginLeft: 15, marginRight: 15, justifyContent: 'space-between' }}>
                    <ButtonComponent
                        onPressButton={this.onPressCancelButton}
                        fullWidth
                        name={capitalizeString(TEXT_CONSTANTS.CANCEL)}
                    />

                    <ButtonComponent
                        onPressButton={this.onPressSubmitButton}
                        fullWidth
                        borderColor={COLORS.GREEN}
                        textColor={COLORS.GREEN}
                        name={capitalizeString(TEXT_CONSTANTS.SUBMIT)}
                    />
                </View>

                <DateTimePickerModal
                    mode={"date"}
                    minimumDate={new Date()}
                    isVisible={this.state.isShowDatePicker}
                    onConfirm={this.onConfirmDatePicker}
                    onCancel={this.onHideDatePicker}
                />
            </SafeAreaView>
        )
    }
}
export default TransferScreen;