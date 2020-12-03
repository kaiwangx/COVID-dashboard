import React from 'react'
import { View } from 'react-native'
import { VictoryBar, VictoryChart, VictoryAxis, VictoryLabel, VictoryGroup, VictoryLegend } from 'victory-native'

export default function BarChart(props) {
    const { data, title, styles } = props;

    if (!data) {
        return <VictoryBar />;
    }

    // const yAxisTickFormat = y => y / 1000 + "k"
    return (
        <View style={styles.container}>
            <VictoryChart domainPadding={15}>
                <VictoryLabel text={title} 
                    textAnchor="middle"  x = {200} y={20} style={[{fontSize: 22}]}
                />
                <VictoryAxis fixLabelOverlap />
                <VictoryAxis dependentAxis />
                <VictoryBar data={data} />
            </VictoryChart>
        </View>
    );
}
