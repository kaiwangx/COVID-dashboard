import React, { useState } from 'react';
import { Text, View, TextInput } from 'react-native'
import { Icon } from 'react-native-elements'
import { WeekOverWeek, addRateOfChange, weekOverWeek } from '../functions/dataManipulation'
import useData from '../functions/useData.js'
import { covidCasesByState } from '../functions/dataCollection.js'
import DALineGraph from './DoubleAxisLineGraph.js';
import { TitleCard, InfoCard } from '../component/InfoCards'
import { retrieveData, storeData } from "../functions/localStorage.js"
import Statistic from './Statistic.js';

export default function StateInfo(props) {
    const { state, styles, numDays } = props;

    const data = useData(() => covidCasesByState(state));
    /*
    const onChangeText = async function(text) {
        setState(text);
        storeData("userState", text);
    };
    */

    if (!data) {
        return (
            <View style={styles.loading}>
                <Text>Loading data for {state}...</Text>
            </View>
        );
    }
    
    const cleanData = data.slice().
        sort((a, b) => (a.date > b.date) ? 1 : -1).
        slice(Math.max(data.length - numDays, 0), data.length); // TODO : This slice is handled in the data collection section
    
    // For the Statistic component
    /*
    const stateDataROC = addRateOfChange(['positive'], cleanData)
    const stateWeekOverWeek = weekOverWeek(stateDataROC, 'positiveROC');
    const percentage = ((stateWeekOverWeek - 1)*100).toFixed(2);
    const negativeString = percentage < 0 ? "-" : "";
    const statisticPercentage = negativeString + "%" + Math.abs(percentage);
    */

    const positiveIncData = cleanData.map(row => { return {"x": row.date, "y": row.positiveIncrease} });
    const negativeIncData = cleanData.map(row => { return {"x": row.date, "y": row.negativeIncrease} });
    const datasets = [positiveIncData, negativeIncData];
    const deathData = cleanData.map(row => { return {"x": row.date, "y": row.death} });

    return (
        <>
            <TitleCard> State: {state} </TitleCard>
            <InfoCard.Main>
                {/*
                <InfoCard.Sub title={"Weekly Positive Cases:"}>
                    <Statistic data={statisticPercentage}/>
                </InfoCard.Sub>
                */}
                <InfoCard.Sub title={"Monthly COVID-19 Test Results"}>
                    <DALineGraph data={datasets} />
                </InfoCard.Sub>
                <InfoCard.Sub title={"Deaths this Month:"}>
                    <Statistic
                        data={deathData[deathData.length - 1].y - deathData[0].y}
                    />
                </InfoCard.Sub>
                {/*
                <InfoCard.Sub title={"Change State"}>
                    <TextInput 
                        onChangeText={text => onChangeText(text)}
                        value={state}
                        style={{ height: 40, textAlign: "center", fontSize: 20 }}
                    />
                </InfoCard.Sub>
                */}
            </InfoCard.Main>
        </>
    );
}