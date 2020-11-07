import React, { useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { ListItem, Icon, Avatar, Divider, Header } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Signin from './Signin'
import Signup from './Signup'

export default function SettingsScreen() {
  const SettingStack = createStackNavigator()
  const functionList = [_setNotification, _symptomChecker, _selfReport]
  const [username, onChangeUsename] = useState('Sign in')

  const setting_list = [
    {
      title: 'Notification',
      icon: 'av-timer',
    },
    {
      title: 'Symptom Checker',
      icon: 'playlist-add-check',
    },
    {
      title: 'Self Report',
      icon: 'report',
    },
  ]

  function _setUsername(new_username) {
    onChangeUsename(new_username)
  }

  function _setNotification() {
    alert('notificaiton')
  }

  function _symptomChecker() {
    alert('Symptom Checker')
  }

  function _selfReport() {
    alert('Self Report')
  }

  function settingPage() {
    const navigation = useNavigation()
    return (
      <View style={styles.container}>
        {/* <Header
          centerComponent={{ text: 'Settings', style: { color: '#fff' } }}
        /> */}
        {/* <Text style={styles.header}>Settings</Text> */}
        {/* <Divider style={{ backgroundColor: 'black' }} /> */}
        <View>
          <TouchableOpacity
            key={'user avatar'}
            onPress={() => navigation.navigate('Signin')}
          >
            <ListItem bottomDivider>
              <Avatar
                source={{
                  uri:
                    'https://cdn0.iconfinder.com/data/icons/set-ui-app-android/32/8-512.png',
                }}
              />
              <ListItem.Content>
                <ListItem.Title>{username}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          </TouchableOpacity>
        </View>
        <View>
          {setting_list.map((item, i) => (
            <TouchableOpacity key={i} onPress={functionList[i]}>
              <ListItem bottomDivider>
                <Icon name={item.icon} />
                <ListItem.Content>
                  <ListItem.Title>{item.title}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    )
  }
  return (
    <SettingStack.Navigator initialRouteName="Setting">
      <SettingStack.Screen name="Setting" component={settingPage} />
      <SettingStack.Screen name="Signin" component={Signin} />
      <SettingStack.Screen name="Signup" component={Signup} />
    </SettingStack.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },

  header: {
    marginTop: 30,
    marginBottom: 10,
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 10,
  },
})
