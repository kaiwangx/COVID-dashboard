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

const CountyLineGraph = () => {
  const [data, setData] = useState()

  useEffect(() => {
    covidCasesByZipcode(53703, 7, true).then((r) => setData(r))
  }, [])

  if (!data) {
    return <VictoryLine />
  }

  return (
    <View width="100%">
      <LineGraph
        data={data.reverse()}
        x="date"
        titles={['Death', 'Positive']}
        keys={['deathCtROC', 'positiveCtROC']}
        colors={['#000000', '#FF2D00']}
      />
    </View>
  )
}

const StateScatterPlot = () => {
  const [data, setData] = useState()

  useEffect(() => {
    covidCasesByState('WI').then((r) => setData(r))
  }, [])

  if (!data) {
    return <VictoryScatter />
  }

  return (
    <View width="100%">
      <Text
        style={{
          fontSize: 60,
        }}
      >
        State COVID Cases
      </Text>
      <ScatterPlot
        data={data.reverse()}
        x="date"
        titles={['Death', 'Positive']}
        keys={['death', 'positive']}
        colors={['#000000', '#FF2D00']}
      />
    </View>
  )
}

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
<<<<<<< HEAD
    margin: 1,
    justifyContent: 'center', 
    alignItems: 'center',
    borderWidth: 2,
    borderColor: "#20232a",
=======
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#20232a',
>>>>>>> 4f59fd4253ca712e6a20619f6c69c490e9775744
    borderRadius: 6,
  },
})

export default function HomeScreen() {
<<<<<<< HEAD
    // prop?
    // const state = "WI";

    const [stateData, setStateData] = useState(null);

    async function fetchStateData() {
        const response = await covidCasesByState("WI");
        setStateData(response);
    }
    useEffect(() => {
        fetchStateData()
    }, []);

    return (
        <>
            <ScrollView>
                <View style={styles.container}>
                    <BarChart data={stateData} numDays={7} />
                </View>
                <View style={styles.container}>
                    <CountyLineGraph />
                </View>
                <View style={styles.container}>
                    <StateScatterPlot/>
                </View>
                <View style={styles.container}>
                    <StateBreakDown />
                </View>
            </ScrollView>
        </>
=======
  return (
    <>
      <ScrollView>
        {/* <View style={styles.container}>
          <BarChart state="WI" numDays={6} />
        </View> */}
        <View style={styles.container}>
          <CountyLineGraph />
        </View>
        <View style={styles.container}>
          <StateScatterPlot />
        </View>
        <View style={styles.container}>
          <StateBreakDown />
        </View>
      </ScrollView>
    </>
>>>>>>> 4f59fd4253ca712e6a20619f6c69c490e9775744
  )
}
