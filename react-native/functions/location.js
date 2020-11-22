import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';

import { storeData, retrieveData } from "../functions/localStorage.js"


function getStateTwoDigitCode(stateFullName) {
  stateList = {
    'Arizona': 'AZ',
    'Alabama': 'AL',
    'Alaska':'AK',
    'Arkansas': 'AR',
    'California': 'CA',
    'Colorado': 'CO',
    'Connecticut': 'CT',
    'Delaware': 'DE',
    'Florida': 'FL',
    'Georgia': 'GA',
    'Hawaii': 'HI',
    'Idaho': 'ID',
    'Illinois': 'IL',
    'Indiana': 'IN',
    'Iowa': 'IA',
    'Kansas': 'KS',
    'Kentucky': 'KY',
    'Louisiana': 'LA',
    'Maine': 'ME',
    'Maryland': 'MD',
    'Massachusetts': 'MA',
    'Michigan': 'MI',
    'Minnesota': 'MN',
    'Mississippi': 'MS',
    'Missouri': 'MO',
    'Montana': 'MT',
    'Nebraska': 'NE',
    'Nevada': 'NV',
    'New Hampshire': 'NH',
    'New Jersey': 'NJ',
    'New Mexico': 'NM',
    'New York': 'NY',
    'North Carolina': 'NC',
    'North Dakota': 'ND',
    'Ohio': 'OH',
    'Oklahoma': 'OK',
    'Oregon': 'OR',
    'Pennsylvania': 'PA',
    'Rhode Island': 'RI',
    'South Carolina': 'SC',
    'South Dakota': 'SD',
    'Tennessee': 'TN',
    'Texas': 'TX',
    'Utah': 'UT',
    'Vermont': 'VT',
    'Virginia': 'VA',
    'Washington': 'WA',
    'West Virginia': 'WV',
    'Wisconsin': 'WI',
    'Wyoming': 'WY'}

  return stateList[stateFullName];
} 


/**
 * Returns a location object of the current device
 * Uses keys 
 * [city, country, district, isoCountryCode, name, postalCode, region, street, subregion, timezone]
 */
async function getZipcode( key ) {
  let { status } = await Location.requestPermissionsAsync();

  if (status !== 'granted') {
    console.error( error );
  }

  let location = await Location.getCurrentPositionAsync({});
  let geocode = await Location.reverseGeocodeAsync(location.coords)

  return geocode[0][key];
}

/**
 * Looks for location permission status
 * 
 * Returns false if permission is not given, the status otherwise
 */
async function getPermissionStatus() {
  let { status } = await Location.requestPermissionsAsync();

  if (status !== 'granted') {
    console.error( error );
    return false
  }

  return status
}

/**
 * This function removes all location data that is older then two weeks
 * 
 * @param {JSON} jsonLocation - json object that uses date keys and arrays for locations
 */
function removeOldData( jsonLocation ){

  let dateCutoff = new Date();
  dateCutoff.setDate(dateCutoff.getDate() - 14)

  Object.keys(jsonLocation).forEach(key => {
  
    if( key < dateCutoff.getTime() ){
    
      delete jsonLocation[key]
    }
  });
 
  return jsonLocation;
}

/**
 * If not existent create a location task to run in the background
 */
async function addLocationTask(){

  // Permission check
  let permission = await getPermissionStatus()

  if( !permission ) {
    return;
  }

  // Check that there is a task to manage this background activity
  if( !(await TaskManager.isTaskRegisteredAsync("BackgroundLocationTracker")) ){

    TaskManager.defineTask("BackgroundLocationTracker", async ({ data: { locations }, error }) => {

      if ( error ) {
        return;
      }
      
      let currentData = retrieveData( "LocationData" )

      // Remove old data and add new data
      let currDate = new Date().getTime();
      let freshData = removeOldData(currentData);
      freshData[currDate] = locations;

      storeData("LocationData", freshData)

    })
  }

  // Start location Tracker if not already started
  if( !(await Location.hasStartedLocationUpdatesAsync()) ){
    let asyncLocationOptions = {
      'accuracy' : 3,
      'deferredUpdatesInterval' : 86400000,
      'distanceInterval' : 200,
    }

    Location.startLocationUpdatesAsync("BackgroundLocationTracker", asyncLocationOptions)
  }
}

/**
 * Removes the location tracking task
 */
async function removeLocationTask(){
  if( await TaskManager.isTaskRegisteredAsync("BackgroundLocationTracker") ){
    Location.stopLocationUpdatesAsync("BackgroundLocationTracker")
  }
}

export { getZipcode, getStateTwoDigitCode, addLocationTask, getPermissionStatus};