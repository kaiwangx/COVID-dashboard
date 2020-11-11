import * as TaskManager from 'expo-task-manager';
import AsyncStorage from "react-native";
import { storeData, retrieveData } from "../functions/localStorage.js"

/**
 * This function removes all location data that is older then two weeks
 * 
 * @param {JSON} jsonLocation - json object that uses date keys and arrays for locations
 */
function RemoveOldData( jsonLocation ){

  let dateCutoff = new Date();
  dateCutoff.setDate(dateCutoff.getDate() - 14)

  jsonLocation.keys().array.forEach(key => {
    if( new Date( key ) < dateCutoff ){
      delete jsonLocation[key]
    }
  });
}

/**
 * If not existent create a location task to run in the background
 */
async function DefineLocationTask(){

  if( await TaskManager.isTaskRegisteredAsync("BackgroundLocationTracker") ){

    TaskManager.defineTask("BackgroundLocationTracker", ({ data: { locations }, error }) => {

      if ( error ) {
        return;
      }
      
      let currentData = await retrieveData( "LocationData" )

    })

  }
}