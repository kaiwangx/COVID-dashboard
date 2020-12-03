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
        <>
            <VictoryChart domainPadding={15}>
                <VictoryAxis fixLabelOverlap />
                <VictoryAxis dependentAxis />
                <VictoryBar data={data} />
            </VictoryChart>
        </>
    );
}
