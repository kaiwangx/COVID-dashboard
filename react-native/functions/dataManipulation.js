/**
 * Puts dayPeriod over previous dayPeriod to estimate change
 * @param {JSON} data An array of json objects
 * @param {String} key The object key to be used
 * @param {Integer} dayPeriod 
 */
function periodOverPeriod( data, key, dayPeriod ){

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

function dayOverDay( data, key ){
  return periodOverPeriod( data, key, 1);
}

function weekOverWeek( data, key ){
  return periodOverPeriod( data, key, 7);
}

function monthOverMonth( data, key ){
  return periodOverPeriod( data, key, 30);
}

export { dayOverDay, weekOverWeek, monthOverMonth }