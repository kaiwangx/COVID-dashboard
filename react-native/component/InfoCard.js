import { Card } from 'react-native-elements'
import { View, Text, Image } from 'react-native'
import React from 'react'

export const InfoCard = ( props ) => {
  const styles = {
    'card' : {
      margin: 8,
      padding: 0,
      borderRadius: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: .5,
      shadowRadius: 5,  
      elevation: 5,
    },
    'title' : {
      padding: 5,
      fontSize: 34,
      marginBottom: 0
    }
  }

  return(

    <Card containerStyle={styles.card}>
      <Card.Title style={styles.title}>{props.title}</Card.Title>
      {props.children}
    </Card>

  )
}