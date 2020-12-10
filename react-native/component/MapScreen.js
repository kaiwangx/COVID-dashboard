import { PROVIDER_GOOGLE, Heatmap } from 'react-native-maps'
import React, { useEffect, useState } from 'react'
import MapView from 'react-native-maps'
import { StyleSheet, View, Dimensions } from 'react-native'
import { getUserLocations } from '../functions/backend';
import { countyCovidCasesByState } from '../functions/dataCollection';
import { createMapPointsCountyByState } from '../functions/dataManipulation';

export default function MapScreen() {

  // Create the states
  const [localPoints, setLocalPoints] = useState([]);
  const [stateByCountyPoints, setStateByCountyPoints] = useState([]);
  const [points, setPoints] = useState([]);

  useEffect(() => {
    
    async function getPoints(){

      // Get Local Data
      setLocalPoints(await getUserLocations());

      // Get state data
      const countyByStateData = await countyCovidCasesByState();
      const countyByStatePoints = createMapPointsCountyByState(
                                                                countyByStateData,
                                                                'Wisconsin',
                                                                'confirmed'
                                                              );
      setStateByCountyPoints(countyByStatePoints);

    }

    getPoints();
    
  }, [])

  let map = {};

  async function updateZoom(){
    
    let camera = await map.getCamera();

    if( camera.zoom < 10 ){
      setPoints(stateByCountyPoints);
    } else {
      setPoints(localPoints);
    }
  }

  return (
    <View style={styles.container}> 
      <MapView  
        showsUserLocation = {true}
        style={styles.mapStyle} 
        provider= {PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 43.073051,
          longitude: -89.401230, // madison location 
          latitudeDelta: 0.09,
          longitudeDelta: 0.0121
        }}
        ref={ref => {
          map = ref;
        }}
        onRegionChangeComplete={() => {
          updateZoom( map ) ;
        }}
        >
        { 
          points.length != 0 && <MapView.Heatmap 
          points={points}
          opacity={.8}
          radius={100}
          gradient={{
            colors: ['#ffdcd6', '#ff8e7a', '#fc6f56', '#ff4524', '#ff2f0a'],
            startPoints: [.01, .1, .25, .5, .75],
            colorMapSize: 100
          }}
          maxIntensity={1000}
          gradientSmoothing={10}
          heatmapMode={"POINTS_DENSITY"}
          />
        }  
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


let pointTemplate = [{latitude: 43.073540, longitude: -89.396820, weight: 1},
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




