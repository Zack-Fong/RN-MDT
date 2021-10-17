import React from 'react';
import { View, SafeAreaView, Text, FlatList, RefreshControl } from 'react-native';

import { TEXT_CONSTANTS, INTERVAL_MILLISECONDS } from '../../common/constants';
import { capitalizeString, deleteAsyncStorageData, isNumberEmpty, isArrayEmpty, formatNumberIntoMoney } from '../../common/commonFunctions';
import { COLORS } from '../../common/colors';

import ButtonComponent from '../../components/Button';
import ActivityIndicatorOverlay from '../../components/ActivityIndicatorOverlay';
import Line from '../../components/Line';
import Transaction from '../../components/Transaction';

import { retrieveBalances, retrieveTransactions } from '../../api/account/accountServices';

class DashboardScreen extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            isRefreshing: false,

            balance: 0,
            transactions: []
        }

        this.apiCallsInProgress = 0;
    }

    componentDidMount() {
        this.focusListener = this.props.navigation.addListener("focus", () => {
            // The screen is focused
            // Call any action
            this.retrieveBalancesAndTransactions();
        });
    }

    componentWillUnmount() {
        if (this.focusListener) {
            this.focusListener();
        }
    }

    retrieveBalancesAndTransactions = () => {
        this.setState({
            isLoading: true
        }, () => {
            let balance = 0;
            let transactions = [];

            this.apiCallsInProgress += 1;
            retrieveBalances()
                .then((retrievedBalances) => {
                    this.apiCallsInProgress -= 1;
                    if (!isNumberEmpty(retrievedBalances)) {
                        balance = formatNumberIntoMoney(Number(retrievedBalances));
                    }
                }).catch((retrieveBalancesError) => {
                    console.log("retrieveBalancesError: ", retrieveBalancesError);
                    this.apiCallsInProgress -= 1;
                })

            this.apiCallsInProgress += 1;
            retrieveTransactions()
                .then((retrievedTransactions) => {
                    this.apiCallsInProgress -= 1;

                    if (!isArrayEmpty(retrievedTransactions)) {
                        transactions = retrievedTransactions;
                    }
                }).catch((retrieveTransactionsError) => {
                    console.log("retrieveTransactionsError: ", retrieveTransactionsError);
                    this.apiCallsInProgress -= 1;
                })

            let interval = setInterval(() => {
                if (this.apiCallsInProgress < 1) {
                    clearInterval(interval);

                    this.setState({
                        isLoading: false,

                        transactions,
                        balance
                    })
                }
            }, INTERVAL_MILLISECONDS.CHECK_PROMISES_DONE);
        })
    }

    handleRefresh = () => {
        this.setState({
            isRefreshing: true
        }, () => {
            this.retrieveBalancesAndTransactions();
            this.setState({ isRefreshing: false });
        });
    }

    onPressLogoutButton = () => {
        deleteAsyncStorageData()
            .then(() => {
                this.props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'LoginScreen' }]
                })
            })
    }

    onPressMakeATransfer = () => {
        this.props.navigation.navigate("TransferScreen");
    }

    renderTransactions = ({ item }) => {
        return (
            <Transaction
                transaction={item}
            />
        )
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ActivityIndicatorOverlay
                    isShow={this.state.isLoading}
                />

                <View style={{ alignSelf: 'flex-end', flex: 1 }}>
                    <ButtonComponent
                        onPressButton={this.onPressLogoutButton}
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
                        {`\n\nSGD ${this.state.balance}\n\n`}
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

                <FlatList
                    data={this.state.transactions}
                    renderItem={this.renderTransactions}
                    keyExtractor={item => item.id}
                    refreshControl={
                        <RefreshControl
                            onRefresh={() => {
                                this.handleRefresh()
                            }}
                            refreshing={this.state.isRefreshing}
                            enabled={true}
                            title={"Release to refresh"}
                        />
                    }
                />

                <ButtonComponent
                    onPressButton={this.onPressMakeATransfer}
                    borderColor={COLORS.BLUE}
                    textColor={COLORS.BLUE}
                    name={capitalizeString(TEXT_CONSTANTS.MAKE_A_TRANSFER)}
                />
            </SafeAreaView>
        )
    }
}
export default DashboardScreen;