import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import {
  covidCasesByZipcode,
  covidCasesByState,
} from '../functions/dataCollection.js'
import { weekOverWeek, addRateOfChange } from '../functions/dataManipulation.js'
import BarChart from './BarChart'
import LineGraph from './LineGraph'
import ScatterPlot from './ScatterPlot'
import Statistic from './Statistic'

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

const loadingStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default function HomeScreen() {
  // prop?
  // const state = "WI";
  // const zipcode = 53703;

  // data fetching code based on
  // https://reactjs.org/docs/testing-recipes.html#data-fetching
  const [stateData, setStateData] = useState(null)

  async function fetchStateData() {
    const response = await covidCasesByState('WI')
    setStateData(response)
  }
  useEffect(() => {
    fetchStateData()
  }, [])

  const [localData, setLocalData] = useState(null)

  async function fetchLocalData() {
    const response = await covidCasesByZipcode(53703)
    setLocalData(response)
  }
  useEffect(() => {
    fetchLocalData()
  }, [])

  if (!stateData || !localData) {
    return (
      <View style={loadingStyle.container}>
        <Text>Loading...</Text>
      </View>
    )
  }

  const change = weekOverWeek(addRateOfChange(['death'], stateData), 'deathROC')
  const percentChange = (change * 100).toFixed(2)

  return (
    <>
      <Text style={{ textAlign: 'center', fontSize: 24 }}>Hello Guest!</Text>
      <ScrollView>
        <BarChart data={stateData} numDays={7} style={styles.container} />
        <LineGraph
          data={addRateOfChange(['deathCt', 'positiveCt'], localData)}
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
        <Statistic
          title="State Death Rate Change"
          data={percentChange + '%'}
          style={styles.container}
        />
      </ScrollView>
    </>
  )
}
