import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import BarChart from './BarChart'
import {
  covidCasesByZipcode,
  covidCasesByState,
} from '../functions/dataCollection.js'
import { getZipcode } from '../functions/location.js'
import LineGraph from './LineGraph'
import { VictoryLine } from 'victory-native'

const CountyLineGraph = () => {
  const [data, setData] = useState()

  useEffect(() => {
    covidCasesByZipcode(53703, 7, true).then((r) => setData(r))
  }, [])

  if (!data) {
    return <VictoryLine />
  }

  return (
    <LineGraph
      data={data}
      x="date"
      titles={['Death', 'Positive']}
      keys={['deathCtROC', 'positiveCtROC']}
      colors={['#000000', '#FF2D00']}
    />
  )
}

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* <Text>Dashboard!</Text> */}
      {/* <VictoryBar data={data} x="date" y="cases"/> */}
      {/* <BarChart state="WI" numDays={6} /> */}
      <CountyLineGraph />
    </View>
  )
}
