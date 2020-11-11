import { storeData, retrieveData } from "../functions/localStorage.js"

/**
 * Assumes the array is in decreasing order
 *
 * @param {Array} keys Array of keys to add rate of change to
 * @param {Array} data Array of Json data
 */
function addRateOfChange(keys, data) {
  var i
  keys.forEach((key) => {
    for (i = 0; i < data.length - 1; i++) {
      data[i][key + 'ROC'] = data[i][key] - data[i + 1][key]
    }
  })

  return data
}

/**
 * Changes the date prop to a string over a integer in us standard form
 * 
 * @param {JsonArray} data - the data that has the date prop to change
 */
function transformDate( data ){
  for ( let i = 0; i < data.length; i++ ) {
    let date = data[i]['date'].toString();
    let year = date.slice(0, 4);
    let month = date.slice(4, 6);
    let day = date.slice(6, 8);

    data[i]['date'] = month + '-' + day + '-' + year;
  }
  
  return data;
}

/// Fields [date, deathCt, positiveCt, recoveredCt]
async function covidCasesByZipcode(zipCode, days = 7, rateOfChange = false) {
  let data

  /// API rules days cannot be greater then 7
  days = days > 7 ? 7 : days

  /// If the information is up to date
  let lastUpdateStr = await retrieveData("lastUpdateZipcode");
  let currentDate = new Date().setHours(0,0,0,0);
  let lastUpdate = new Date(lastUpdateStr).setHours(0,0,0,0);

  if (currentDate == lastUpdate) {
    /// If the information is cached
    let dataByState = await retrieveData('CovidCasesByZipcode')
      
    data = JSON.parse(dataByState);

    /// If information is old
  } else {
    try {
      let response = await fetch(
        'https://localcoviddata.com/covid19/v1/cases/newYorkTimes?zipCode=' +
          zipCode +
          '&daysInPast=7'
      )

      let jsonData = await response.json()
      let jsonArray = jsonData.counties[0].historicData

      /// Update cache
      storeData("lastUpdateZipcode", Date());
      storeData("CovidCasesByZipcode", JSON.stringify(jsonArray));

      data = jsonArray
    } catch (error) {
      console.error(error)
    }
  }

  if (rateOfChange) {
    let arrayLength = days < data.length ? days : data.length - 1

    return addRateOfChange(['deathCt', 'positiveCt'], data).slice(
      0,
      arrayLength
    )
  } else {
    return data
  }
}

/**
 * Gets the local data for the day and caches the rest
 * Check https://covidtracking.com/data/api for the fields
 * 
 * @param {String} state - Lower case state short
 * @param {Integer} days - Amount of days to use in graph, up to 30 are cached local
 */
async function covidCasesByState(state, days = 31) {
  let data;

  /// Check if information is up to date
  let lastUpdateStr = await retrieveData("lastUpdateState");
  let currentDate = new Date().setHours(0,0,0,0);
  let lastUpdate = new Date(lastUpdateStr).setHours(0,0,0,0);

  if( currentDate == lastUpdate ){

    let response =  await retrieveData("CovidCasesByState");

    data = JSON.parse(response);

  } else {
    try {
      let response = await fetch(
        'https://api.covidtracking.com/v1/states/' + state + '/daily.json'
      )

      let jsonData = await response.json()

      storeData("lastUpdateState", Date());
      storeData("CovidCasesByState", JSON.stringify(jsonData));
  
      data = jsonData;

    } catch (error) {
      console.error(error)
    }
  }

  let dataCorrectedDate = transformDate( data )

  let dataWithROC = addRateOfChange(
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
