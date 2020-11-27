import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage'

import { storeData, retrieveData } from "../functions/localStorage.js"


export function getStateTwoDigitCode(stateFullName) {
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
export async function getZipcode( key ) {
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
export async function getPermissionStatus() {
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
export function _removeOldData( jsonLocation ){

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
export async function addLocationTask(){

  // Permission check
  let permission = await getPermissionStatus()

  if( !permission ) {
    return;
  }

  // Check that there is a task to manage this background activity
  if( !(await TaskManager.isTaskRegisteredAsync("BackgroundLocationTracker")) ){

    async function backgroundLocationTask( task ){

      if ( task.error ) {
        return;
      }
      
      let currentData = await retrieveData( "LocationData" )
      currentData = currentData == undefined ? {} : JSON.parse(currentData);

      // Remove old data and add new data
      let currDate = new Date().getTime();
      let freshData = _removeOldData(currentData);
      freshData[currDate] = task.data.locations;

      storeData("LocationData", JSON.stringify(freshData))
    }

    TaskManager.defineTask("BackgroundLocationTracker", backgroundLocationTask)
  }

  // Start location Tracker if not already started
  if( !(await Location.hasStartedLocationUpdatesAsync("BackgroundLocationTracker")) ){
    let asyncLocationOptions = {
      'accuracy' : 6,
      'deferredUpdatesInterval' : 1,
      'distanceInterval' : 1,
    }

    Location.startLocationUpdatesAsync("BackgroundLocationTracker", asyncLocationOptions)
  }
}

/**
 * Removes the location tracking task
 */
export async function removeLocationTask(){
  if( await TaskManager.isTaskRegisteredAsync("BackgroundLocationTracker") ){
    Location.stopLocationUpdatesAsync("BackgroundLocationTracker")
  }
}

/**
 * Used to log the locations that have been recently logged
 */
export async function logBackgroundLocations(){
  const storedData = await retrieveData('LocationData');
  if( storeData == undefined ){
    console.log(JSON.parse(storedData))
  }
}

export async function backgroundLocationUpload(){
  Parse.setAsyncStorage(AsyncStorage)
  Parse.initialize(
    'vpmiVf8KrJoGqkU5jo2M26jtX4wiL5oxQROLLRwO',
    'fn39GXtWxBJyQTM1Eyl11uRYUYPyKjib5MtfbMWb'
  ) //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
  Parse.serverURL = 'https://parseapi.back4app.com/';

  const userLocationData = retrieveData('LocationData')
  var locationDump = new Parse.LocationData
}