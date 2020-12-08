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
    backgroundColor : '#fcc9c0'
  },
  'title' : {
    padding: 5,
    fontSize: 34,
    marginBottom: 0
  }
}

const dividerStyles = {
  height: 2,
  backgroundColor: '#b5b5b5',
  width: '95%',
  marginLeft: 'auto',
  marginRight: 'auto'
}

export const TitleCard = ( props ) => {
  return (
    <Card containerStyle={titleCardStyles.card}>
      <Card.Title style={titleCardStyles.title}>{props.children}</Card.Title>
    </Card>
  )
}

const autoKey = ( i ) => ( ++i );

export const InfoCard = {
  Sub : ( props ) => {
    return (
      <>
        <Card.Title key={props.title} style={infoCardStyles.title}>{props.title}</Card.Title>
        {props.children}
      </>
    )
  },
  Main : ( props ) => {

    let key = 0;

    return (
      <Card containerStyle={infoCardStyles.card}>
        {props.children
        .reduce((accu, elem) => [accu, <Card.Divider key={autoKey(key)} style={dividerStyles} />, elem])} 
      </Card>
    )
  }
}