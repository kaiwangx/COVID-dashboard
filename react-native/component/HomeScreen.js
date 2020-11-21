import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, FlatList, View, ScrollView } from 'react-native'
import BarChart from './BarChart'
import {
  covidCasesByZipcode,
  covidCasesByState,
} from '../functions/dataCollection.js'
import { weekOverMonthAverage } from '../functions/dataManipulation.js'

import LineGraph from './LineGraph'
import ScatterPlot from './ScatterPlot'
import { VictoryLine, VictoryScatter } from 'victory-native'
import Constants from 'expo-constants'

const StateBreakDown = () => {
  const [data, setData] = useState()

  useEffect(() => {
    covidCasesByState('WI').then((r) => setData(r))
  }, [])

  if (!data) {
    return <View></View>
  }

  let change = weekOverMonthAverage(data, 'deathROC')
  // console.log(change)
  let percentChange = (change * 100).toFixed(2)

  return (
    <View width="100%">
      <Text
        style={{
          fontSize: 60,
        }}
      >
        State Death Rate Change %{percentChange}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#20232a',
    borderRadius: 6,
  },
})

export default function HomeScreen() {
    // prop?
    // const state = "WI";
    // const zipcode = 53703;

    // data fetching code based on 
    // https://reactjs.org/docs/testing-recipes.html#data-fetching 
    const [stateData, setStateData] = useState(null);

    async function fetchStateData() {
        const response = await covidCasesByState("WI");
        setStateData(response);
    }
    useEffect(() => {
        fetchStateData();
    }, []);

    const [localData, setLocalData] = useState(null);

    async function fetchLocalData() {
        const response = await covidCasesByZipcode(53703, 7, true);
        setLocalData(response);
    }
    useEffect(() => {
        fetchLocalData();
    }, []);

    return (
        <>
            <Text style={{textAlign: "center", fontSize: 16}}>
                Hello Guest! 
            </Text>
            <ScrollView>
                <BarChart data={stateData} numDays={7} style={styles.container}/>
                <LineGraph
                    data={localData}
                    x="date"
                    yTitles={['Death', 'Positive']}
                    yKeys={['deathCtROC', 'positiveCtROC']}
                    colors={['#000000', '#FF2D00']}
                    style={styles.container}
                />
                <ScatterPlot
                    data={stateData}
                    x="date"
                    yTitles={['Death', 'Positive']}
                    yKeys={['death', 'positive']}
                    colors={['#000000', '#FF2D00']}
                    style={styles.container}
                />
                <View style={styles.container}>
                    <StateBreakDown />
                </View>
            </ScrollView>
        </>
  );
}
