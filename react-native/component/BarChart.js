import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { VictoryBar, VictoryChart, VictoryAxis, VictoryLabel } from 'victory-native'

export default function BarChart() {
    // these will eventually be props
    const url = "https://api.covidtracking.com/v1/states/daily.json";
    const state = "WI";
    const numDays = 5;

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

    if (!data) {
        return <VictoryBar />;
    }

    let stateData = data.filter(row => row.state == state);
    // assume data is ordered reverse chronologically 
    stateData = stateData.map(row => {return {"date": row.date, "positiveIncrease": row.positiveIncrease}}).slice(0, numDays);

    return (
        <View>
            <VictoryChart domainPadding = {20}>
                <VictoryLabel text={state + " Positive Cases over Past " + numDays + " Days"} textAnchor="middle" x ={190} y={30}/>
                <VictoryAxis  dependentAxis/>
                <VictoryBar data={stateData} x="date" y="positiveIncrease"/> 
            </VictoryChart>
        </View>
    );
}