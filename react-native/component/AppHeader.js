import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'

const headerStyle = {
  marginTop: 14,
  fontSize: 34,
  textAlign: 'center',
  color: '#ff6347',
  fontWeight: 'bold'
}


export const AppHeader = ( props ) => {

  return(
    <Text style={headerStyle}>{props.title}</Text>
  )
}
