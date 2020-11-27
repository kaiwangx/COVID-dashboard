import { storeData, retrieveData } from "../functions/localStorage.js"

/**
 * Changes the date prop to a string over a integer in us standard form
 * 
 * @param {JsonArray} data - the data that has the date prop to change
 */
function _cleanDate( data ){
  for ( let i = 0; i < data.length; i++ ) {
    const date = data[i]['date'].toString();
    const year = date.slice(0, 4);
    const month = date.slice(4, 6);
    const day = date.slice(6, 8);

    data[i]['date'] = month + '-' + day + '-' + year;
  }
  
  return data;
}

/**
 * Gets the data that is required from New York Times source
 * 
 * @param {Int} zipCode - Location of data required
 */
async function _refreshZipcodeData(zipCode){
  try {

    // Fetch new information
    const response = await fetch(
      'https://localcoviddata.com/covid19/v1/cases/newYorkTimes?zipCode=' +
        zipCode + '&daysInPast=7'
    );
    const dirtyResponse = await response.json();
    const data = dirtyResponse.counties[0].historicData;

    /// Update cache
    const currentDate = new Date().setHours(0,0,0,0);
    let updatedJSON = {};
    updatedJSON['lastUpdated'] = currentDate;
    updatedJSON['location'] = zipCode;
    updatedJSON['data'] = data;
    storeData("CovidCasesByZipcode", JSON.stringify(updatedJSON));

    return data;

  } catch (error) {
    console.error(error);
  }
}

/**
 * Gets the data that is required from CovidTracking.com
 * 
 * @param {String} state - Location of data required
 */
async function _refreshStateData( state ){
  try {
    /// Get new information
    const response = await fetch(
      'https://api.covidtracking.com/v1/states/' + state + '/daily.json'
    )
    const dirtyData = await response.json();
    const data = _cleanDate(dirtyData)

    /// Update cache
    const currentDate = new Date().setHours(0,0,0,0);
    let updatedJSON = {};
    updatedJSON['lastUpdated'] = currentDate;
    updatedJSON['location'] = state;
    updatedJSON['data'] = data;
    storeData("CovidCasesByState", JSON.stringify(updatedJSON));

    return data;

  } catch (error) {
    console.error(error);
  }
}

/**
 * 
 * @param {String} key - The key to the async storage location 
 * @param {String} location - The location to be accessed
 */
async function _getAsyncCovidData( key, location ){

  const asyncData = await retrieveData(key);

  // If nothing is stored at this key
  if( asyncData == undefined ){
    return false;
  }

  const data = JSON.parse(asyncData);

  //If the date or location do not match
  const currentDate = new Date().setHours(0,0,0,0);
  const lastUpdate = new Date(data['lastUpdated']).setHours(0,0,0,0);

  if( currentDate == lastUpdate && location == data['location']){
    return data['data'];
  } else {
    return false;
  }
}

/// Fields [date, deathCt, positiveCt, recoveredCt]
export async function covidCasesByZipcode(zipCode, numberOfDays = 7) {
  
  // Parameter validity check
  if( numberOfDays > 7 ){
    throw new RangeError("Error: For zipcode data by zipcode 7 days is max history")
  }

  // Get currently stored data
  let data = await _getAsyncCovidData('CovidCasesByZipcode', zipCode);
  
  // If the required data is not stored
  if( !data ){
    data = await _refreshZipcodeData(zipCode);
  }
  
  // Return requested amount of days worth of data
  return data.slice(0, numberOfDays);
}

/**
 * Gets the local data for the day and caches the rest
 * Check https://covidtracking.com/data/api for the fields
 * 
 * @param {String} state - Lower case state short
 * @param {Integer} days - Amount of days to use in graph, up to 30 are cached local
 */
export async function covidCasesByState(state, numberOfDays = 31) {

  // Get currently store data
  let data = await _getAsyncCovidData('CovidCasesByState', state);

  // If the required data is not stored
  if( !data ){
    data = await _refreshStateData(state);
  }
  
  // Return requested amount of days worth of data
  return data.slice(0, numberOfDays);
}


