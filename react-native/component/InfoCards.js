import { Card, Button } from 'react-native-elements'
import { View, Text, Image } from 'react-native'
import React from 'react'

const infoCardStyles = {
  card: {
    margin: 8,
    padding: 0,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  title: {
    padding: 5,
    fontSize: 28,
    marginBottom: 0,
  },
}

const titleCardStyles = {
  card: {
    margin: 8,
    padding: 0,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
    // backgroundColor: '#fcc9c0',
    backgroundColor: '#2089dc',
  },
  title: {
    padding: 5,
    fontSize: 30,
    marginBottom: 0,
    color: '#FFFFFF',
  },
  button: {
    marginLeft: 8,
    marginRight: 8,
    marginTop: 20,
    // marginBottom: 20,
  },
}

export const TitleCard = (props) => {
  return (
    <Card containerStyle={titleCardStyles.card}>
      <Card.Title style={titleCardStyles.title}>{props.children}</Card.Title>
    </Card>
    // <View style={titleCardStyles.button}>
    //   <Button
    //     title={props.children}
    //     // type="clear"
    //     titleStyle={{ fontSize: 30 }}
    //   />
    // </View>
  )
}

export const InfoCard = (props) => {
  return (
    <Card containerStyle={infoCardStyles.card}>
      <Card.Title style={infoCardStyles.title}>{props.title}</Card.Title>
      {props.children}
    </Card>
  )
}
