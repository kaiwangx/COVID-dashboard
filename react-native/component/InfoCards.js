import { Card } from 'react-native-elements'
import { View, Text, Image } from 'react-native'
import React from 'react'

const infoCardStyles = {
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
    fontSize: 28,
    marginBottom: 0
  }
}

const titleCardStyles = {
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

export const TitleCard = ( props ) => {
  return (
    <Card containerStyle={titleCardStyles.card}>
      <Card.Title style={titleCardStyles.title}>{props.children}</Card.Title>
    </Card>
  )
}

export const InfoCard = ( props ) => {
  return(
    <Card containerStyle={infoCardStyles.card}>
      <Card.Title style={infoCardStyles.title}>{props.title}</Card.Title>
      {props.children}
    </Card>
  )
}