import { PROVIDER_GOOGLE, Heatmap } from 'react-native-maps'
import React, { useEffect, useState } from 'react'
import MapView from 'react-native-maps'
import { StyleSheet, View, Dimensions,Text } from 'react-native'
import { getUserLocations } from '../functions/backend.js'

export default function MapScreen() {

  const [mapPoints, setMapPoints] = useState([]);

  useEffect(() => {

    // Fetch map locations
    const getMapPoints = async () => {

      const mapLocations = await getUserLocations();

      const weightedPoints = mapLocations.map(location => {

        // Parse.Object to JSON
        let locationJSON = location.toJSON()

        // Add weight remove unessecary stuff
        locationJSON['weight'] = 1;
        delete locationJSON['createdAt']
        delete locationJSON['objectId']
        delete locationJSON['updatedAt'];
        delete locationJSON['timestamp']

        return locationJSON;
      })
      
      setMapPoints(weightedPoints);
    }
    
    getMapPoints();
  }, [])

  if(mapPoints.length == 0){
    return(
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    )
  }
  console.log(mapPoints)
  return (
    <View style={styles.container}> 
      <MapView  
        showsUserLocation = {true}
        style={styles.mapStyle} 
        provider= {PROVIDER_GOOGLE}
        region={{
          latitude: 43.073051,
          longitude: -89.401230, // madison location 
          latitudeDelta: 0.09,
          longitudeDelta: 0.0121
        }}
        >

        <MapView.Heatmap 
          points={mapPoints}
          opacity={1}
          radius={50}
          maxIntensity={100}
          gradientSmoothing={10}
          heatmapMode={"POINTS_DENSITY"}
          />
        </MapView>
      </View>
    );
  
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
});


let points = [{latitude: 43.073540, longitude: -89.396820, weight: 1},
  {latitude: 43.073540, longitude: -89.396820, weight: 1},
  {latitude: 43.073540, longitude: -89.396820, weight: 1},
  {latitude: 43.073540, longitude: -89.396820, weight: 1},
  {latitude: 43.073540, longitude: -89.396820, weight: 1},
  {latitude: 43.073540, longitude: -89.396820, weight: 1},
  {latitude: 43.073540, longitude: -89.396820, weight: 1},
  {latitude: 43.073540, longitude: -89.396820, weight: 1},
  {latitude: 43.075630, longitude: -89.397141, weight: 1},
  {latitude: 43.075630, longitude: -89.397141, weight: 1},
  {latitude: 43.075630, longitude: -89.397141, weight: 1},
  {latitude: 43.075630, longitude: -89.397141, weight: 1},
  {latitude: 43.075630, longitude: -89.397141, weight: 1},
  {latitude: 43.075630, longitude: -89.397141, weight: 1},
];



