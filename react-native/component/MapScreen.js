import { PROVIDER_GOOGLE, Heatmap } from 'react-native-maps'
import React from 'react'
import MapView from 'react-native-maps'
import { StyleSheet, View, Dimensions } from 'react-native'
import { AppHeader } from './AppHeader'

export default function MapScreen() {
  return (
    <View style={styles.container}>
      {/* <AppHeader title="COVID Heatmap" /> */}
      <MapView
        showsUserLocation={true}
        style={styles.mapStyle}
        provider={PROVIDER_GOOGLE}
        region={{
          latitude: 43.073051,
          longitude: -89.40123, // madison location
          latitudeDelta: 0.09,
          longitudeDelta: 0.0121,
        }}
      >
        <MapView.Heatmap
          points={points}
          opacity={1}
          radius={50}
          maxIntensity={100}
          gradientSmoothing={10}
          heatmapMode={'POINTS_DENSITY'}
        />
      </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
})

let points = [
  { latitude: 43.07354, longitude: -89.39682, weight: 1 },
  { latitude: 43.07354, longitude: -89.39682, weight: 1 },
  { latitude: 43.07354, longitude: -89.39682, weight: 1 },
  { latitude: 43.07354, longitude: -89.39682, weight: 1 },
  { latitude: 43.07354, longitude: -89.39682, weight: 1 },
  { latitude: 43.07354, longitude: -89.39682, weight: 1 },
  { latitude: 43.07354, longitude: -89.39682, weight: 1 },
  { latitude: 43.07354, longitude: -89.39682, weight: 1 },
  { latitude: 43.07563, longitude: -89.397141, weight: 1 },
  { latitude: 43.07563, longitude: -89.397141, weight: 1 },
  { latitude: 43.07563, longitude: -89.397141, weight: 1 },
  { latitude: 43.07563, longitude: -89.397141, weight: 1 },
  { latitude: 43.07563, longitude: -89.397141, weight: 1 },
  { latitude: 43.07563, longitude: -89.397141, weight: 1 },
]
