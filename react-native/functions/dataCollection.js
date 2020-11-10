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

/// Fields [date, deathCt, positiveCt, recoveredCt]
async function covidCasesByZipcode(zipCode, days = 7, rateOfChange = false) {
  let data

  /// API rules days cannot be greater then 7
  days = days > 7 ? 7 : days

  /// If the information is up to date
  let lastUpdateStr = await retrieveData("lastUpdate");
  let currentDate = new Date().setHours(0,0,0,0);
  let lastUpdate = new Date(lastUpdateStr).setHours(0,0,0,0);

  if (currentDate == lastUpdate) {
    /// If the information is cached
    let dataByState = await _retrieveData('CovidCasesByZipcode')

      /// If the information is cached
      let dataByState = await retrieveData("CovidCasesByZipcode");
      
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
      storeData("lastUpdate", Date());
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

/// Fields under historic value for single state
async function covidCasesByState(state, days = 31) {
  let data

  /// If the information is up to date
  let lastUpdateStr = await retrieveData("lastUpdate");
  let currentDate = new Date().setHours(0,0,0,0);
  let lastUpdate = new Date(lastUpdateStr).setHours(0,0,0,0);

  if( currentDate == lastUpdate ){

    let dataByState =  await retrieveData("CovidCasesByState");

    data = JSON.parse(dataByState);

    data = JSON.parse(dataByState)
  } else {
    try {
      let response = await fetch(
        'https://api.covidtracking.com/v1/states/' + state + '/daily.json'
      )

      let jsonData = await response.json()

<<<<<<< HEAD
      storeData("lastUpdate", Date());
      storeData("CovidCasesByState", JSON.stringify(jsonData));
  
      data = jsonData;
=======
      _storeData('lastUpdate', Date())
      _storeData('CovidCasesByState', JSON.stringify(jsonData))
>>>>>>> main

      data = jsonData
    } catch (error) {
      console.error(error)
    }
  }

  return addRateOfChange(
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
    data.slice(0, days + 1)
  ).slice(0, days)
}

export { covidCasesByZipcode, covidCasesByState }
