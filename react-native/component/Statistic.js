import React from 'react'
import { View, Text } from 'react-native'
import { InfoCard } from './InfoCard';

const Statistic = (props) => {
    const { title, data, style} = props;
  
    if (!data) {
        return <View></View>
    }
  
    return (
        <InfoCard title={title}>
            <Text style={{ fontSize: 60, textAlign: "center"  }}>
                {data}
            </Text>
        </InfoCard>
    )
};

export default Statistic;