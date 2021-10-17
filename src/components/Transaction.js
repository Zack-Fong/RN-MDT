import React from 'react';
import { View, Text } from 'react-native';
import moment from 'moment';

import { isNumberEmpty, formatNumberIntoMoney, isStringEmpty, isEqual, isObjectEmpty } from '../common/commonFunctions';
import { COLORS } from '../common/colors';
import { TEXT_CONSTANTS } from '../common/constants';

class Transaction extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{ padding: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ flex: 1, fontWeight: 'bold' }}>
                    {!isObjectEmpty(this.props.transaction) && isStringEmpty(this.props.transaction.date) ? '' : moment(this.props.transaction.date).format("D MMM")}
                </Text>

                {
                    !isObjectEmpty(this.props.transaction) && isEqual(this.props.transaction.type, "transfer") && !isObjectEmpty(this.props.transaction.to) ?
                        <Text style={{ flex: 2, fontWeight: '500' }}>
                            {`${TEXT_CONSTANTS.TRANSFER_TO} ${this.props.transaction.to.accountHolderName}`}
                        </Text> : null
                }
                {
                    !isObjectEmpty(this.props.transaction) && isEqual(this.props.transaction.type, "receive") && !isObjectEmpty(this.props.transaction.from) ?
                        <Text style={{ flex: 2, fontWeight: '500' }}>
                            {`${TEXT_CONSTANTS.RECEIVED_FROM} ${this.props.transaction.from.accountHolderName}`}
                        </Text> : null
                }

                <Text style={{ flex: 1, fontWeight: 'bold', color: !isObjectEmpty(this.props.transaction) && isEqual(this.props.transaction.type, "receive") ? COLORS.LIGHT_GREEN : 'black' }}>
                    {(!isObjectEmpty(this.props.transaction) && isEqual(this.props.transaction.type, "transfer") ? '- ' : '') + `${!isObjectEmpty(this.props.transaction) && isNumberEmpty(this.props.transaction.amount) ? 0 : formatNumberIntoMoney(Number(this.props.transaction.amount))}`}
                </Text>
            </View>
        )
    }
}
export default Transaction;