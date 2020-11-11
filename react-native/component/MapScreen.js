import { PROVIDER_GOOGLE, Heatmap } from 'react-native-maps'
import React from 'react'
import MapView from 'react-native-maps'
import { StyleSheet, View, Dimensions } from 'react-native'

export default function MapScreen() {
  return (
    <View style={styles.container}>
      <MapView
        showsUserLocation={true}
        style={styles.mapStyle}
        provider={PROVIDER_GOOGLE}
      />
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
