import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import * as Location from 'expo-location';


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

  return geocode[0];
}




export { getZipcode };