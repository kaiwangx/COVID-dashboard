import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
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

function HomeScreen() {
  const data = [
    {date: "Oct 19", cases: 7525},
    {date: "Oct 20", cases: 4721},
    {date: "Oct 21", cases: 4327}
  ];
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Dashboard!</Text>
      <VictoryBar data={data} x="date" y="cases"/>
    </View>
  )
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  )
}

function MapScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Map!</Text>
    </View>
  )
}

const Tab = createBottomTabNavigator()

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
    </NavigationContainer>
  )
}
