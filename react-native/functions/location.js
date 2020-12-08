import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage'

import { storeData, retrieveData } from "../functions/localStorage.js"


function _getState(zipString) {

  /* Ensure param is a string to prevent unpredictable parsing results */
  if (typeof zipString !== 'string') {
      console.log('Must pass the zipcode as a string.');
      return;
  }
 
  /* Ensure we have exactly 5 characters to parse */
  if (zipString.length !== 5) {
      console.log('Must pass a 5-digit zipcode.');
      return;
  } 

  /* Ensure we don't parse strings starting with 0 as octal values */
  const zipcode = parseInt(zipString, 10); 

  let st;
  let state;

  /* Code cases alphabetized by state */
  if (zipcode >= 35000 && zipcode <= 36999) {
      st = 'al';
      state = 'Alabama';
  } else if (zipcode >= 99500 && zipcode <= 99999) {
      st = 'ak';
      state = 'Alaska';
  } else if (zipcode >= 85000 && zipcode <= 86999) {
      st = 'az';
      state = 'Arizona';
  } else if (zipcode >= 71600 && zipcode <= 72999) {
      st = 'ar';
      state = 'Arkansas';
  } else if (zipcode >= 90000 && zipcode <= 96699) {
      st = 'ca';
      state = 'California';
  } else if (zipcode >= 80000 && zipcode <= 81999) {
      st = 'co';
      state = 'Colorado';
  } else if (zipcode >= 6000 && zipcode <= 6999) {
      st = 'ct';
      state = 'Connecticut';
  } else if (zipcode >= 19700 && zipcode <= 19999) {
      st = 'de';
      state = 'Delaware';
  } else if (zipcode >= 32000 && zipcode <= 34999) {
      st = 'fl';
      state = 'Florida';
  } else if (zipcode >= 30000 && zipcode <= 31999) {
      st = 'ga';
      state = 'Georgia';
  } else if (zipcode >= 96700 && zipcode <= 96999) {
      st = 'hi';
      state = 'Hawaii';
  } else if (zipcode >= 83200 && zipcode <= 83999) {
      st = 'id';
      state = 'Idaho';
  } else if (zipcode >= 60000 && zipcode <= 62999) {
      st = 'il';
      state = 'Illinois';
  } else if (zipcode >= 46000 && zipcode <= 47999) {
      st = 'in';
      state = 'Indiana';
  } else if (zipcode >= 50000 && zipcode <= 52999) {
      st = 'ia';
      state = 'Iowa';
  } else if (zipcode >= 66000 && zipcode <= 67999) {
      st = 'ks';
      state = 'Kansas';
  } else if (zipcode >= 40000 && zipcode <= 42999) {
      st = 'ky';
      state = 'Kentucky';
  } else if (zipcode >= 70000 && zipcode <= 71599) {
      st = 'la';
      state = 'Louisiana';
  } else if (zipcode >= 3900 && zipcode <= 4999) {
      st = 'me';
      state = 'Maine';
  } else if (zipcode >= 20600 && zipcode <= 21999) {
      st = 'md';
      state = 'Maryland';
  } else if (zipcode >= 1000 && zipcode <= 2799) {
      st = 'ma';
      state = 'Massachusetts';
  } else if (zipcode >= 48000 && zipcode <= 49999) {
      st = 'mi';
      state = 'Michigan';
  } else if (zipcode >= 55000 && zipcode <= 56999) {
      st = 'mn';
      state = 'Minnesota';
  } else if (zipcode >= 38600 && zipcode <= 39999) {
      st = 'ms';
      state = 'Mississippi';
  } else if (zipcode >= 63000 && zipcode <= 65999) {
      st = 'mo';
      state = 'Missouri';
  } else if (zipcode >= 59000 && zipcode <= 59999) {
      st = 'mt';
      state = 'Montana';
  } else if (zipcode >= 27000 && zipcode <= 28999) {
      st = 'nc';
      state = 'North Carolina';
  } else if (zipcode >= 58000 && zipcode <= 58999) {
      st = 'nd';
      state = 'North Dakota';
  } else if (zipcode >= 68000 && zipcode <= 69999) {
      st = 'ne';
      state = 'Nebraska';
  } else if (zipcode >= 88900 && zipcode <= 89999) {
      st = 'nv';
      state = 'Nevada';
  } else if (zipcode >= 3000 && zipcode <= 3899) {
      st = 'nh';
      state = 'New Hampshire';
  } else if (zipcode >= 7000 && zipcode <= 8999) {
      st = 'nj';
      state = 'New Jersey';
  } else if (zipcode >= 87000 && zipcode <= 88499) {
      st = 'nm';
      state = 'New Mexico';
  } else if (zipcode >= 10000 && zipcode <= 14999) {
      st = 'ny';
      state = 'New York';
  } else if (zipcode >= 43000 && zipcode <= 45999) {
      st = 'oh';
      state = 'Ohio';
  } else if (zipcode >= 73000 && zipcode <= 74999) {
      st = 'ok';
      state = 'Oklahoma';
  } else if (zipcode >= 97000 && zipcode <= 97999) {
      st = 'or';
      state = 'Oregon';
  } else if (zipcode >= 15000 && zipcode <= 19699) {
      st = 'pa';
      state = 'Pennsylvania';
  } else if (zipcode >= 300 && zipcode <= 999) {
      st = 'pr';
      state = 'Puerto Rico';
  } else if (zipcode >= 2800 && zipcode <= 2999) {
      st = 'ri';
      state = 'Rhode Island';
  } else if (zipcode >= 29000 && zipcode <= 29999) {
      st = 'sc';
      state = 'South Carolina';
  } else if (zipcode >= 57000 && zipcode <= 57999) {
      st = 'sd';
      state = 'South Dakota';
  } else if (zipcode >= 37000 && zipcode <= 38599) {
      st = 'tn';
      state = 'Tennessee';
  } else if ( (zipcode >= 75000 && zipcode <= 79999) || (zipcode >= 88500 && zipcode <= 88599) ) {
      st = 'tx';
      state = 'Texas';
  } else if (zipcode >= 84000 && zipcode <= 84999) {
      st = 'ut';
      state = 'Utah';
  } else if (zipcode >= 5000 && zipcode <= 5999) {
      st = 'vt';
      state = 'Vermont';
  } else if (zipcode >= 22000 && zipcode <= 24699) {
      st = 'va';
      state = 'Virgina';
  } else if (zipcode >= 20000 && zipcode <= 20599) {
      st = 'dc';
      state = 'Washington DC';
  } else if (zipcode >= 98000 && zipcode <= 99499) {
      st = 'wa';
      state = 'Washington';
  } else if (zipcode >= 24700 && zipcode <= 26999) {
      st = 'wv';
      state = 'West Virginia';
  } else if (zipcode >= 53000 && zipcode <= 54999) {
      st = 'wi';
      state = 'Wisconsin';
  } else if (zipcode >= 82000 && zipcode <= 83199) {
      st = 'wy';
      state = 'Wyoming';
  } else {
      st = 'none';
      state = 'none';
      console.log('No state found matching', zipcode);
  }

  return st;
}

function _getStateTwoDigitCode(stateFullName) {
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

export async function backgroundLocationTask( task ){

  if ( task.error ) {
    return;
  }
  
  // Get current data and remove dates older then 2 weeks
  let currentData = await retrieveData( "LocationData" )
  currentData = currentData == undefined ? {} : JSON.parse(currentData);
  let updatedData = _removeOldData( currentData );

  // Format the new data
  let currDate = new Date().setHours(0,0,0,0);
  let freshData = {};
  freshData[currDate.toString()] = task.data.locations;

  storeData("LocationData", JSON.stringify({...updatedData, ...freshData}))
}

/**
 * If not existent create a location task to run in the background
 */
export async function addLocationTask(){

  // Permission check
  const permission = await getPermissionStatus()

  if( permission != 'granted' ) {
    return;
  }

  const asyncLocationOptions = {
    'accuracy' : 6,
    'deferredUpdatesInterval' : 1,
    'distanceInterval' : 1,
  }

  Location.startLocationUpdatesAsync("BackgroundLocationTracker", asyncLocationOptions)
  
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
  if( storeData != undefined ){
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