function weekOverMonthAverage( data, key ){
  let monthSum = 0;

  let i
  for( i = 0; i < data.length - 7; i++ ) {
    monthSum += data[i][key] 
  }

  let monthAverage = monthSum / (data.length - 7)

  let weekSum = 0;

  for( i = i; i < data.length; i++ ) {
    weekSum += data[i][key] 
  } 

  let weekAverage = weekSum / 7

  return weekAverage / monthAverage;
}

export { weekOverMonthAverage }