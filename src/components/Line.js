import React from 'react';
import { View } from 'react-native';

import { COLORS } from '../common/colors';

class Line extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View
                style={{
                    borderBottomColor: COLORS.LIGHT_GRAY,
                    borderBottomWidth: 1,
                    margin: 10
                }}
            />
        )
    }
}
export default Line;