import React from 'react'
import { Text, View } from 'react-native'
import BarChart from './BarChart'

export default function HomeScreen() {
  /*
  const data = [
    { date: 'Oct 19', cases: 7525 },
    { date: 'Oct 20', cases: 4721 },
    { date: 'Oct 21', cases: 4327 },
  ]
  */
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* <Text>Dashboard!</Text> */ }
      {/* <VictoryBar data={data} x="date" y="cases"/> */ }
      <BarChart />
    </View>
  )
}
