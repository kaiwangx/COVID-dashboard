import React, { useState } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

export default function SymptomChecker(props) {
  return (
    <View style={styles.container}>
      <Text>Symptom Checker</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
