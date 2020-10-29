import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { ListItem, Icon, Avatar, Divider, Header } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Signin from './Signin'
import Signup from './Signup'

const SettingStack = createStackNavigator()

const functionList = [_setNotification, _selfReport]

function _setNotification() {
  alert('notificaiton')
}

function _selfReport() {
  alert('selfReport')
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
        {user_list.map((l, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => navigation.navigate('Signin')}
          >
            <ListItem bottomDivider>
              <Avatar source={{ uri: l.avatar_url }} />
              <ListItem.Content>
                <ListItem.Title>{l.name}</ListItem.Title>
                <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          </TouchableOpacity>
        ))}
      </View>
      <View>
        {/* <TouchableOpacity onPress={_setNotification}>
          <ListItem key="1" bottomDivider>
            <Icon name="av-timer" />
            <ListItem.Content>
              <ListItem.Title>Notification</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        </TouchableOpacity> */}

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

const user_list = [
  {
    name: 'Sign In',
    avatar_url:
      'https://cdn0.iconfinder.com/data/icons/set-ui-app-android/32/8-512.png',
  },
]

const setting_list = [
  {
    title: 'Notification',
    icon: 'av-timer',
  },
  {
    title: 'Self Report',
    icon: 'report',
  },
]

export default function SettingsScreen() {
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
