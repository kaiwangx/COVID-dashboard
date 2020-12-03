import React from 'react';
import { Text, View } from 'react-native'
import useData from '../functions/useData.js'
import { covidCasesByZipcode } from '../functions/dataCollection.js'
import BarChart from './BarChart'
import Statistic from './Statistic.js';

export default function LocalInfo(props) {
    const { zipcode, styles, numDays } = props;

    const data = useData(() => covidCasesByZipcode(zipcode, 7, true));
    if (!data) {
        return (
            <View style={styles.loading}>
                <Text>Loading data for {zipcode} area...</Text>
            </View>
        );
    }

    const cleanData = data.slice().
        sort((a, b) => (a.date > b.date) ? 1 : -1).
        slice(Math.max(data.length - numDays, 0), data.length);

    const deathData = cleanData.map(row => { return {"x": row.date, "y": row.deathCt} });
    const positiveData = cleanData.map(row => { return {"x": row.date, "y": row.positiveCt} });
    const positiveChangeData = []
    for (let i = 1; i < positiveData.length; i++) {
        positiveChangeData.push(
            { x: positiveData[i].x, y: positiveData[i].y - positiveData[i - 1].y });
    }

    return (
        <View style={styles.separator}>
            <Text style={{ textAlign: 'center', fontSize: 28 }}> Info for {zipcode} </Text>
            <Statistic
                title={"Number of Deaths from\n" + deathData[0].x + " to " + deathData[deathData.length - 1].x + ":"}
                data={deathData[deathData.length - 1].y - deathData[0].y}
                style={styles.container}
            />
            <BarChart data={positiveChangeData} title="Positive Cases Increase" styles={styles}/>
        </View>
    );
}