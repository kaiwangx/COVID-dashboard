import { storeData, retrieveData } from "../functions/localStorage.js"

/**
 * Assumes the array is in decreasing order
 *
 * @param {Array} keys Array of keys to add rate of change to
 * @param {Array} data Array of Json data
 */
function addRateOfChange(keys, data) {
  let i;
  keys.forEach((key) => {
    for (i = 0; i < data.length - 1; i++) {
      data[i][key + 'ROC'] = data[i][key] - data[i + 1][key];
    }
  })

  return data;
}

/**
 * Changes the date prop to a string over a integer in us standard form
 * 
 * @param {JsonArray} data - the data that has the date prop to change
 */
function transformDate( data ){
  for ( let i = 0; i < data.length; i++ ) {
    const date = data[i]['date'].toString();
    const year = date.slice(0, 4);
    const month = date.slice(4, 6);
    const day = date.slice(6, 8);

    data[i]['date'] = month + '-' + day + '-' + year;
  }
  
  return data;
}

/// Fields [date, deathCt, positiveCt, recoveredCt]
async function covidCasesByZipcode(zipCode, numberOfDays = 7, rateOfChange = false) {
  
  /// API rules days cannot be greater then 7
  numberOfDays = numberOfDays > 7 ? 7 : numberOfDays;

  // Get currently store data
  const storedData = await retrieveData('CovidCasesByZipcode');
  const storedJSON = JSON.parse(storedData);

  /// If the information is up to date
  const currentDate = new Date().setHours(0,0,0,0);
  const lastUpdate = new Date(storedJSON['lastUpdated']).setHours(0,0,0,0);

  if (currentDate == lastUpdate && zipCode == storedJSON['zipCode']) { 

    /// If the information is cached
     const data = storedJSON['data']; 

  } else {

    /// If information is old or in wrong region
    try {

      /// Get new information
      const response = await fetch(
        'https://localcoviddata.com/covid19/v1/cases/newYorkTimes?zipCode=' +
          zipCode + '&daysInPast=' + days
      );
      const dirtyResponse = await response.json();
      const data = dirtyResponse.counties[0].historicData;

      /// Update cache
      let updatedJSON = {};
      updatedJSON['lastUpdated'] = currentDate;
      updatedJSON['zipCode'] = zipCode;
      updatedJSON['data'] = data;
      storeData("CovidCasesByZipcode", JSON.stringify(updatedJSON));

    } catch (error) {
      console.error(error);
    }
  }

  if (rateOfChange) {

    /// Add rate of change metric 
    const arrayLength = numberOfDays < data.length ? numberOfDays : data.length - 1;
    const dataWithROC = addRateOfChange(['deathCt', 'positiveCt'], data)
                          .slice(0, arrayLength);

    return dataWithROC;

  } else {

    const slicedData = data.slice(0, numberOfDays);
    return slicedData;

  }
}

/**
 * Gets the local data for the day and caches the rest
 * Check https://covidtracking.com/data/api for the fields
 * 
 * @param {String} state - Lower case state short
 * @param {Integer} days - Amount of days to use in graph, up to 30 are cached local
 */
async function covidCasesByState(state, numberOfDays = 31) {
  
  /// API rules days cannot be greater then 7
  numberOfDays = numberOfDays > 7 ? 7 : numberOfDays;

  // Get currently store data
  const storedData = await retrieveData('CovidCasesByState');
  const storedJSON = JSON.parse(storedData);

  /// If the information is up to date
  const currentDate = new Date().setHours(0,0,0,0);
  const lastUpdate = new Date(storedJSON['lastUpdated']).setHours(0,0,0,0);

  if (currentDate == lastUpdate && zipCode == storedJSON['state']) { 

    /// If the information is cached
     const data = storedJSON['data']; 

  } else {

    /// If information is old or in wrong region
    try {

      /// Get new information
      const response = await fetch(
        'https://api.covidtracking.com/v1/states/' + state + '/daily.json'
      )
      const data = await response.json();

      /// Update cache
      let updatedJSON = {};
      updatedJSON['lastUpdated'] = currentDate;
      updatedJSON['state'] = state;
      updatedJSON['data'] = data;
      storeData("CovidCasesByState", JSON.stringify(updatedJSON));

    } catch (error) {
      console.error(error);
    }
  }

  const dataCorrectedDate = transformDate(data)

  const dataWithROC = addRateOfChange(
      [
        'positive',
        'probableCases',
        'negative',
        'pending',
        'totalTestResults',
        'hospitalizedCurrently',
        'hospitalizedCumulative',
        'inIcuCurrently',
        'inIcuCumulative',
        'recovered',
        'death',
        'hospitalized',
      ],
      dataCorrectedDate.slice(0, days + 1)
    ).slice(0, days);

  return dataWithROC;
}

export { covidCasesByZipcode, covidCasesByState }
