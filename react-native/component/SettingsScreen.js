import React, { useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { ListItem, Icon, Avatar, Divider, Header } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Signin from './Signin'
import Signup from './Signup'
import UserProfile from './UserProfile'
import Preference from './Preference'
import { getCurrentUser } from '../functions/backend'

export default function SettingsScreen(props) {
  const { isSignin } = props
  const SettingStack = createStackNavigator()
  const navigation = useNavigation()
  const [currentUser, setCurrentUser] = useState(null)
  // const [username, setUsername] = useState(null)

  // const { isSignin } = React.useContext(TokenContext)

  // console.log(isSignin)s
  const functionList = [_onPressPreference, _selfReport]

  const setting_list = [
    {
      title: 'Preference',
      icon: 'playlist-add-check',
    },
    {
      title: 'Self Report',
      icon: 'report',
    },
  ]

  function _onPressPreference() {
    navigation.navigate('Preference')
  }

  function _selfReport() {
    alert('Self Report')
  }

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      var user = await getCurrentUser()
      setCurrentUser(user)
    }
    bootstrapAsync()
  }, [])

  function getUsername() {
    return isSignin && currentUser
      ? 'Hello, ' + currentUser.get('username')
      : 'Sign In'
  }

  function _onPressAvatar() {
    if (isSignin) {
      navigation.navigate('Profile')
    } else {
      navigation.navigate('Signin')
    }
  }

  function settingPage() {
    return (
      <View style={styles.container}>
        {/* <Header
          centerComponent={{ text: 'Settings', style: { color: '#fff' } }}
        /> */}
        {/* <Text style={styles.header}>Settings</Text> */}
        {/* <Divider style={{ backgroundColor: 'black' }} /> */}
        <View>
          <TouchableOpacity key={'user avatar'} onPress={_onPressAvatar}>
            <ListItem bottomDivider>
              <Avatar
                source={{
                  uri:
                    'https://cdn0.iconfinder.com/data/icons/set-ui-app-android/32/8-512.png',
                }}
              />
              <ListItem.Content>
                <ListItem.Title>{getUsername()}</ListItem.Title>
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
      <SettingStack.Screen name="Profile">
        {(props) => <UserProfile {...props} />}
      </SettingStack.Screen>
      <SettingStack.Screen name="Preference">
        {(props) => <Preference {...props} />}
      </SettingStack.Screen>
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
