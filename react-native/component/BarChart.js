import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { VictoryBar, VictoryChart, VictoryAxis, VictoryLabel, VictoryStack, VictoryLegend } from 'victory-native'

export default function BarChart(props) {
    // const url = "https://api.covidtracking.com/v1/states/daily.json";
    const { data, numDays } = props;

    /*
    // data fetching code based on 
    // https://reactjs.org/docs/testing-recipes.html#data-fetching 
    const [data, setData] = useState(null);

    async function fetchData(url) {
        const response = await fetch(url, {method: "GET"});
        setData(await response.json());
    }

    useEffect(() => {
        fetchData(url);
    }, [url]);
    */

    if (!data) {
        return <VictoryBar />;
    }

    // console.log(data)
    // assume data is ordered reverse chronologically 
    let cleanData = data.map(row => {
        return {"date": row.date, "positiveIncrease": row.positiveIncrease, 
            "deathIncrease": row.deathIncrease, "negativeIncrease": row.negativeIncrease}}).slice(0, numDays);
    // ymd???
    cleanData = cleanData.sort((a, b) => (a.date > b.date) ? 1 : -1);
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
        <View>
            <VictoryChart domainPadding = {15}>
                <VictoryLabel text={data[0].state + " Cases over Past " + numDays + " Days"} textAnchor="middle" x={150} y={30}/>
                <VictoryAxis tickFormat={xticks} />
                <VictoryAxis dependentAxis tickFormat={y => y / 1000 + "k"}/>
                <VictoryStack colorScale={["red", "green"]}>
                    <VictoryBar data={cleanData} x="x" y="positiveIncrease"/> 
                    <VictoryBar data={cleanData} x="x" y="negativeIncrease"/> 
                </VictoryStack>
                <VictoryLegend x={240} colorScale={["red", "green"]} 
                    data={[{name: "+ Increase"}, {name: "- Increase"}]}/>
            </VictoryChart>
        </View>
    );
}
