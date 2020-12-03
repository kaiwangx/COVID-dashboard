import React from 'react'
import { View } from 'react-native'
import { VictoryBar, VictoryChart, VictoryAxis, VictoryLabel, VictoryStack, VictoryLegend } from 'victory-native'
import { InfoCard } from './InfoCard';

export default function BarChart(props) {
    const { data, title, styles } = props;

    if (!data) {
        return <VictoryBar />;
    }

    // const yAxisTickFormat = y => y / 1000 + "k"
    return (
        <InfoCard title={data[0].state + " Cases over Past " + numDays + " Days"}>
            <VictoryChart domainPadding={15}>
                <VictoryLabel 
                    textAnchor="middle" x={150} y={20} style={[{fontSize: 24}]}
                />
                <VictoryAxis fixLabelOverlap />
                <VictoryAxis dependentAxis />
                <VictoryBar data={data} />
            </VictoryChart>
        </InfoCard>
    );
}
