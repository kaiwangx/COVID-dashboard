import React, { useState } from 'react'
import { Text, View, Image } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { VictoryBar } from 'victory-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Parse from 'parse/react-native.js'

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
  Parse.setAsyncStorage(AsyncStorage)
  Parse.initialize("vpmiVf8KrJoGqkU5jo2M26jtX4wiL5oxQROLLRwO","fn39GXtWxBJyQTM1Eyl11uRYUYPyKjib5MtfbMWb"); //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
  Parse.serverURL = 'https://parseapi.back4app.com/'

  const MyFirstClass = Parse.Object.extend("BryanTesting");
  const myFirstClass = new MyFirstClass();

  myFirstClass.set("name", "I'm able to save objects!");
  myFirstClass.set("name", "another row")
  myFirstClass.save();
  /*
  .then((object) => {
    // Success
    alert('New object created with objectId: ' + object.id);
  }, (error) => {
    // Save fails
    alert('Failed to create new object, with error code: ' + error.message);
  });
  */

  const covid_tracking_url = "https://api.covidtracking.com/v1/states/daily.json"
  s = useState(fetch(covid_tracking_url, {method: "GET"})
			.then(response => response.json()));
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
