import React from 'react'
import { View, Text } from 'react-native'

const Statistic = (props) => {
    const { title, data, style} = props;
  
    if (!data) {
        return <View></View>
    }
  
    return (
        <View style={style}>
            <Text style={{ fontSize: 24, }}>
                {title} 
            </Text>
            <Text style={{ fontSize: 60, }}>
                {data}
            </Text>
        </View>
    )
};

export default Statistic;