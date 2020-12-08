/**
 * Converts the received data and turns it into a set of weight points to go on the map
 * 
 * @param {*} data - The data retrieved from the API
 * @param {*} province - The State/Province Short Long form
 * @param {*} metric - The metric to use i.e. deaths, confirmed, recovered
 */
export function createMapPointsCountyByState( data, province, metric ){

  // Initialize key variables
  let provinceData = [];
  let provinceMetricTotal = 0;

  // Get all the information from the data
  for( let i = 0; i < data.length; i++ ){
    if( data[i]['province'] == province ){

      // Create the point
      let countyData = {};
      countyData['metric'] = data[i]['stats'][metric];
      countyData['latitude'] = Number(data[i]['coordinates']['latitude']);
      countyData['longitude'] = Number(data[i]['coordinates']['longitude']);

      // Add to the total
      provinceMetricTotal += data[i]['stats'][metric];

      // Add the new point
      provinceData.push(countyData)
    }
  }

  // Calculate the weights
  for( let i = 0; i < provinceData.length; i++ ){
    provinceData[i]['weight'] = provinceData[i]['metric'] / provinceMetricTotal;
    delete provinceData[i]['metric']
  }

  return provinceData;
}



/**
 * Adds Rate of Change to data
 * 
 * Works from the start setting each days ROC value to equal 
 * its value minus the previous days
 *
 * @param {Array} keys Array of keys to add rate of change to
 * @param {Array} data Array of Json data
 */
export function addRateOfChange( keys, data ) {

  // Sort the data so we know what we are working with
  const sortedData = data.sort((a, b) => (a.date > b.date) ? -1 : 1)

  // Add ROC attribute for all indicated keys
  keys.forEach((key) => {
    for (let i = 0; i < sortedData.length - 1; i++) {
      let rateOfChange = sortedData[i][key] - sortedData[i + 1][key];
      sortedData[i][key + 'ROC'] = rateOfChange;
    }
  })
  
  return sortedData.slice(0, -1);
}

/**
 * Puts dayPeriod over previous dayPeriod to estimate change
 * @param {JSON} data An array of json objects
 * @param {String} key The object key to be used
 * @param {Integer} dayPeriod 
 */
function _periodOverPeriod( data, key, dayPeriod ){

  // Check for valid arguments
  if( dayPeriod*2 > data.length ){
    throw new RangeError("Error: Not enough data passed")
  } else if( !( key in data[0])){
    throw new RangeError("Error: Key not valid")
  }

  let currentSum = 0;

  let i = 0;
  for( i = i; i < dayPeriod; i++ ) {
    currentSum += data[i][key] 
  }

  let previousSum = 0;

  for( i = i; i < dayPeriod*2; i++ ) {
    previousSum += data[i][key] 
  } 

  return currentSum / previousSum;
}

export function dayOverDay( data, key ){
  return _periodOverPeriod( data, key, 1);
}

export function weekOverWeek( data, key ){
  return _periodOverPeriod( data, key, 7);
}

export function monthOverMonth( data, key ){
  return _periodOverPeriod( data, key, 30);
}