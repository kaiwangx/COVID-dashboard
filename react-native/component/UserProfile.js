import React, { useState } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { Input } from 'react-native-elements'
import { Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import AuthContext from './AuthContext.js'

export default function UserProfile(props) {
  //   const [userName, setUsername] = useState('')
  //   const [userToken, setUserToken] = useState('')
  //   const [profile, setProfile] = useState('')
  //   const [profileUpdated, setProfileUpdated] = useState('')
  const { signOut } = React.useContext(AuthContext)

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.title}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}></Text>
        </View>
        <View style={styles.loginButton}>
          <Button title="Sign Out" onPress={() => signOut()} />
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
  },

  scrollView: {
    marginTop: 20,
    marginBottom: 20,
  },

  title: {
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    marginLeft: 20,
    marginRight: 20,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },

  input: { marginLeft: 10, marginRight: 10 },

  loginButton: {
    marginLeft: 20,

    marginRight: 20,
    marginTop: 10,
    marginBottom: 20,
  },

  text_link: {
    color: '#6EC5E9',
  },
})
