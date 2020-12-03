import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { Appbar, Snackbar } from 'react-native-paper'
import { Icon } from 'react-native-elements'

export const AppHeader = (props) => {
  return (
    <Appbar.Header style={{ backgroundColor: '#2289DC' }}>
      <Appbar.Content title={props.title} style={{ marginLeft: 5 }} />
    </Appbar.Header>
  )
}
