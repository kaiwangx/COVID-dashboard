import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
<<<<<<< HEAD
import { VictoryBar } from 'victory-native'
import { Notifications } from 'react-native-notifications';

class MyComponent extends Component {
  constructor(props) {
    super(props);
    Notifications.registerRemoteNotifications();

    Notifications.events().registerNotificationReceivedForeground((notification: Notification, completion) => {
      console.log(`Notification received in foreground: ${notification.title} : ${notification.body}`);
      completion({alert: false, sound: false, badge: false});
    });

    Notifications.events().registerNotificationOpened((notification: Notification, completion) => {
      console.log(`Notification opened: ${notification.payload}`);
      completion();
    });
  }
}
=======
// import { VictoryBar } from 'victory-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Parse from 'parse/react-native.js'
import HomeScreen from './component/HomeScreen'
import MapScreen from './component/MapScreen'
import SettingsScreen from './component/SettingsScreen'
>>>>>>> 1af7e3645ec0256c304edf117b0f9b90c51b5df7

const Tab = createBottomTabNavigator()

export default function App() {
  Parse.setAsyncStorage(AsyncStorage)
  Parse.initialize(
    'vpmiVf8KrJoGqkU5jo2M26jtX4wiL5oxQROLLRwO',
    'fn39GXtWxBJyQTM1Eyl11uRYUYPyKjib5MtfbMWb'
  ) //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
  Parse.serverURL = 'https://parseapi.back4app.com/'

  const MyFirstClass = Parse.Object.extend('BryanTesting')
  const myFirstClass = new MyFirstClass()

  myFirstClass.set('name', "I'm able to save objects!")
  myFirstClass.set('name', 'another row')
  myFirstClass.save()

<<<<<<< HEAD
export default function App() {
  // Request permissions on iOS, refresh token on Android
  Notifications.registerRemoteNotifications();

  Notifications.events().registerRemoteNotificationsRegistered((event=Registered) => {
      // TODO: Send the token to my server so it could send back push notifications...
      console.log("Device Token Received", event.deviceToken);
  });
  Notifications.events().registerRemoteNotificationsRegistrationFailed((event=RegistrationError) => {
      console.error(event);
  });
  return (
    <NavigationContainer>
=======
  function homeTabNavigation() {
    return (
>>>>>>> 1af7e3645ec0256c304edf117b0f9b90c51b5df7
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName

            if (route.name === 'Home') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline'
            } else if (route.name === 'Settings') {
              iconName = focused ? 'ios-list-box' : 'ios-list'
            } else if (route.name === 'Map') {
              iconName = focused ? 'map' : 'map-outline'
              return (
                <MaterialCommunityIcons
                  name={iconName}
                  size={size}
                  color={color}
                />
              )
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Map" component={MapScreen} />
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    )
  }

  return <NavigationContainer>{homeTabNavigation()}</NavigationContainer>
}
