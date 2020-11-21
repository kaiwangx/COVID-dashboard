import React from 'react'
import { View } from 'react-native'
import { VictoryBar, VictoryChart, VictoryAxis, VictoryLabel, VictoryStack, VictoryLegend } from 'victory-native'

export default function BarChart(props) {
    const { data, numDays, style } = props;

    if (!data) {
        return <VictoryBar />;
    }

    // assume data is ordered reverse chronologically 
    let cleanData = data.map(row => {
        return {"date": row.date, "positiveIncrease": row.positiveIncrease, 
            "deathIncrease": row.deathIncrease, "negativeIncrease": row.negativeIncrease}}).slice(0, numDays);
    // ymd???
    cleanData.sort((a, b) => (a.date > b.date) ? 1 : -1);
    for (let index = 0; index < cleanData.length; index++) {
        cleanData[index].x = index + 1;
    }
    // console.log(cleanData);

    const xticks = (x) => {
        if (x == 1 || x == numDays) {
            return cleanData[x - 1].date;
        }
        return "";
    };
    return (
        <View style={style}>
            <VictoryChart domainPadding={15}>
                <VictoryLabel text={data[0].state + " Cases over Past " + numDays + " Days"} 
                    textAnchor="middle" x={150} y={20} style={[{fontSize: 24}]}
                />
                <VictoryAxis tickFormat={xticks} />
                <VictoryAxis dependentAxis tickFormat={y => y / 1000 + "k"}/>
                <VictoryStack colorScale={["red", "gray"]}>
                    <VictoryBar data={cleanData} x="x" y="positiveIncrease"/> 
                    <VictoryBar data={cleanData} x="x" y="negativeIncrease"/> 
                </VictoryStack>
                <VictoryLegend x={290} colorScale={["red", "gray"]} 
                    data={[{name: "+ Increase"}, {name: "- Increase"}]}/>
            </VictoryChart>
        </View>
    );
}
