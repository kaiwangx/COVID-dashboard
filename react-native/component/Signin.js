import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Input } from 'react-native-elements'
import { Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Parse from 'parse/react-native.js'
import AuthContext from './AuthContext.js'

export default function Signin() {
  const { signIn } = React.useContext(AuthContext)
  const [username, onChangeUsename] = useState('')
  const [password, onChangePassword] = useState('')
  const navigation = useNavigation()

  function login(username, password) {
    Parse.setAsyncStorage(AsyncStorage)
    Parse.initialize(
      'vpmiVf8KrJoGqkU5jo2M26jtX4wiL5oxQROLLRwO',
      'fn39GXtWxBJyQTM1Eyl11uRYUYPyKjib5MtfbMWb'
    ) //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
    Parse.serverURL = 'https://parseapi.back4app.com/'

    var user = Parse.User.logIn(username, password)
      .then(function (user) {
        signIn(user.get('sessionToken'), user.get('username'))
        alert('You have signed in successfully')
        navigation.navigate('Setting')
      })
      .catch(function (error) {
        console.log('Error: ' + error.code + ' ' + error.message)
        alert(error.message)
      })
  }

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Sign in</Text>
      </View>

      <View style={styles.text}>
        <Text>USERNAME</Text>
      </View>

      <View style={styles.input}>
        <Input
          placeholder="Username"
          onChangeText={(username) => onChangeUsename(username)}
        />
      </View>

      <View style={styles.text}>
        <Text>PASSWORD</Text>
      </View>

      <View style={styles.input}>
        <Input
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(password) => onChangePassword(password)}
        />
      </View>

      <View style={styles.loginButton}>
        <Button title="Sign In" onPress={() => login(username, password)} />
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text
          style={styles.text_link}
          onPress={() => navigation.navigate('Signup')}
        >
          Create an account
        </Text>
      </View>
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
