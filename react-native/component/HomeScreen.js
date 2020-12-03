<<<<<<< HEAD
import React from 'react'
import { StyleSheet, Text, ScrollView } from 'react-native'
import LocalInfo from './LocalInfo'
import StateInfo from './StateInfo.js'
=======
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import {
  covidCasesByZipcode,
  covidCasesByState,
} from '../functions/dataCollection.js'
import { weekOverMonthAverage } from '../functions/dataManipulation.js'
import BarChart from './BarChart'
import LineGraph from './LineGraph'
import ScatterPlot from './ScatterPlot'
import Statistic from './Statistic'
>>>>>>> 7db074c3a14c76666a12bc9fb423ac02fae0300f

const styles = StyleSheet.create({
    container: {
        margin: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#20232a',
        borderRadius: 6,
    },
    loading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    separator: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: 3,
        borderBottomWidth: 3,
        borderColor: "gray",
    },
})

export default function HomeScreen() {
    // props?
    // retrieve from async storage or backend?
    const state = "WI";
    const stateNumDays = 31;
    const zipcode = 53703;
    const localNumDays = 7;

    return (
        <>
            <Text style={{ textAlign: 'center', fontSize: 24 }}>Hello Guest!</Text>
            <ScrollView>
                <LocalInfo zipcode={zipcode} styles={styles} numDays={localNumDays}/>
                <StateInfo state={state} styles={styles} numDays={stateNumDays}/>
            </ScrollView>
        </>
    )
<<<<<<< HEAD
=======
  }

  const change = weekOverMonthAverage(stateData, 'deathROC')
  const percentChange = (change * 100).toFixed(2)

  return (
    <>
      <Text style={{ textAlign: 'center', fontSize: 24 }}>Hello Guest!</Text>
      <ScrollView>
        <BarChart data={stateData} numDays={7} style={styles.container} />
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
        <Statistic
          title="State Death Rate Change"
          data={percentChange + '%'}
          style={styles.container}
        />
      </ScrollView>
    </>
  )
>>>>>>> 7db074c3a14c76666a12bc9fb423ac02fae0300f
}
