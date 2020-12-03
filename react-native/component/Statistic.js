import React from 'react'
import { View, Text } from 'react-native'

const Statistic = (props) => {
    const { title, data, style} = props;
  
    if (!data) {
        return <View></View>
    }
  
    return (
        <Text style={{ fontSize: 60, textAlign: "center"  }}>
            {data}
        </Text>
    )
};

export default Statistic;