import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

import { isStringEmpty } from '../common/commonFunctions';

class ButtonComponent extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity
                style={{
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: !isStringEmpty(this.props.borderColor) ? this.props.borderColor : 'black',
                    padding: 3,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: 20,
                    height: 35,
                    flex: this.props.fullWidth ? 1 : undefined,
                    backgroundColor: !isStringEmpty(this.props.backgroundColor) ? this.props.backgroundColor : undefined
                }}
                onPress={this.props.onPressButton}
            >
                <Text numberOfLines={1} ellipsizeMode={'tail'} style={{ color: !isStringEmpty(this.props.textColor) ? this.props.textColor : 'black' }}>
                    {this.props.name}
                </Text>
            </TouchableOpacity>
        )
    }
}
export default ButtonComponent;