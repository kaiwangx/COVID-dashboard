import React from 'react';
import { Text, View } from 'react-native'
import useData from '../functions/useData.js'
import { covidCasesByState } from '../functions/dataCollection.js'
import DALineGraph from './DoubleAxisLineGraph.js';

export default function StateInfo(props) {
    const { state, styles, numDays } = props;

    const data = useData(() => covidCasesByState(state));
    if (!data) {
        return (
            <View style={styles.loading}>
                <Text>Loading data for {state}...</Text>
            </View>
        );
    }

    const cleanData = data.slice().
        sort((a, b) => (a.date > b.date) ? 1 : -1).
        slice(Math.max(data.length - numDays, 0), data.length);

    // console.log(cleanData);
    const positiveIncData = cleanData.map(row => { return {"x": row.date, "y": row.positiveIncrease} });
    const negativeIncData = cleanData.map(row => { return {"x": row.date, "y": row.negativeIncrease} });
    const datasets = [positiveIncData, negativeIncData];

    return (
        <View style={styles.separator}>
            <Text style={{ textAlign: 'center', fontSize: 28 }}> Info for {state} </Text>
            <DALineGraph data={datasets} title={"Cases over the Last " + numDays + " Days"} />
        </View>
    );
}