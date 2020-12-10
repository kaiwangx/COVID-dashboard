import React from 'react';
import { Text, View } from 'react-native'
import { Icon } from 'react-native-elements'
import useData from '../functions/useData.js'
import { covidCasesByZipcode } from '../functions/dataCollection.js'
import { TitleCard, InfoCard } from '../component/InfoCards'
import BarChart from './BarChart'
import Statistic from './Statistic.js';
import LineGraph from './LineGraph.js';

export default function LocalInfo(props) {
    const { zipcode, styles, numDays } = props;

    const data = useData(() => covidCasesByZipcode(zipcode, 7));
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
        <>
            <TitleCard>Local: {zipcode}</TitleCard>
            <InfoCard.Main>
                <InfoCard.Sub title={"Deaths this Week:"}>
                    <Statistic
                        data={deathData[deathData.length - 1].y - deathData[0].y}
                        style={styles.container}
                    />
                </InfoCard.Sub>
                <InfoCard.Sub title={"Positive Cases Increase"}>
                    <BarChart data={positiveChangeData} styles={styles}/>
                </InfoCard.Sub>
                <InfoCard.Sub title={"Total Counts:"}>
                    <LineGraph
                        data={data}
                        x={'date'}
                        yTitles={['Positive Cases', 'Death']}
                        yKeys={['positiveCt', 'deathCt']}
                        colors={['#ff6347', '#000000']}
                    />
                </InfoCard.Sub>
            </InfoCard.Main>
        </>
    );
}