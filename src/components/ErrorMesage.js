import React from 'react';
import { Text } from 'react-native';

import { COLORS } from '../common/colors';
import { TEXT_CONSTANTS } from '../common/constants';
import { isEqual } from '../common/commonFunctions';

class ErrorMessage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Text style={{
                color: COLORS.RED, marginTop: this.props.forOtherInputComponent ? -5 : -15, marginLeft: 15, fontSize: 10
            }}>
                {isEqual(this.props.type, TEXT_CONSTANTS.USERNAME) ? TEXT_CONSTANTS.EMPTY_USERNAME_ERROR :
                    isEqual(this.props.type, TEXT_CONSTANTS.PASSWORD) ? TEXT_CONSTANTS.EMPTY_PASSWORD_ERROR :
                        isEqual(this.props.type, TEXT_CONSTANTS.RECIPIENT) ? TEXT_CONSTANTS.EMPTY_RECIPIENT_ERROR :
                            isEqual(this.props.type, TEXT_CONSTANTS.DATE_OF_TRANSFER) && this.props.emptyDateOfTransfer ? TEXT_CONSTANTS.EMPTY_DATE_OF_TRANSFER_ERROR :
                                isEqual(this.props.type, TEXT_CONSTANTS.DATE_OF_TRANSFER) && this.props.earlyDateOfTransfer ? TEXT_CONSTANTS.EARLY_DATE_OF_TRANSFER_ERROR :
                                    isEqual(this.props.type, TEXT_CONSTANTS.DESCRIPTION) ? TEXT_CONSTANTS.EMPTY_DESCRIPTION_ERROR :
                                        isEqual(this.props.type, TEXT_CONSTANTS.AMOUNT) ? TEXT_CONSTANTS.EMPTY_AMOUNT_ERROR :
                                            ''}
            </Text>
        )
    }
}
export default ErrorMessage;