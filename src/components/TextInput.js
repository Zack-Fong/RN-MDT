import React from 'react';
import { TextInput } from 'react-native';

import { COLORS } from '../common/colors';

class TextInputComponent extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            text: ""
        }
    }

    render() {
        return (
            <TextInput
                style={{
                    margin: 15,
                    height: 40,
                    borderColor: COLORS.LIGHT_GRAY,
                    borderBottomWidth: 2,
                    fontSize: 15
                }}
                autoCorrect={false}
                textContentType={"none"}
                underlineColorAndroid={"transparent"}
                placeholder={this.props.placeholder}
                placeholderTextColor={COLORS.LIGHT_GRAY}
                autoCapitalize={"none"}
                secureTextEntry={this.props.secureTextEntry}
                keyboardType={this.props.decimalKeyboard ? 'decimal-pad' : 'default'}
                returnKeyType={this.props.decimalKeyboard ? 'done' : 'default'}
                onChangeText={(text) => {
                    this.setState({
                        text
                    })
                    this.props.onChangeText && this.props.onChangeText(text);
                }}
            />
        )
    }
}
export default TextInputComponent;