import React, { useState } from 'react'
import { Text, View, Image } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Parse from 'parse/react-native.js'
import HomeScreen from './component/HomeScreen'
import MapScreen from './component/MapScreen'
import SettingsScreen from './component/SettingsScreen'
import AuthContext from './component/AuthContext.js'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import SymptomChecker from './component/SymptomChecker'
import {addLocationTask} from "./functions/location.js"
//import {getPermissionStatus} from "./functions/location.js"
import {retrieveData} from "./functions/localStorage.js"

const Tab = createBottomTabNavigator()



//I've tried this approach
const task = async () => {
  try{
    const task1 = await addLocationTask()
    return task1
  } catch (e){
    console.error(e)
  }
}

// this approach
addLocationTask()

const data = async () => {
  try {
    const data1 = await retrieveData("LocationData");
    return data1
  } catch (e){
    console.error(e)
  }
}

//let currDate = new Date().getTime();

console.log(data.toString);

export default function App() {
  /*
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
  */

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
            userName: action.name,
          }
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignin: true,
            userToken: action.token,
            userName: action.name,
          }
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignin: false,
            userToken: null,
          }
      }
    },
    {
      isLoading: true, // reserved for loading screen
      isSignin: false,
      userToken: null,
      userName: null,
    }
  )
  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken, userName

      try {
        userToken = await AsyncStorage.getItem('userToken')
        userName = await AsyncStorage.getItem('userName')
        // console.log(userToken)
        // console.log(userName)
      } catch (e) {
        console.log(e)
      }
      // console.log('app.js token: ' + userToken)
      // After restoring token, we may need to validate it in production apps
      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken, name: userName })
    }

    bootstrapAsync()
  }, [])

  const authContext = React.useMemo(
    () => ({
      signIn: async (_token, _name) => {
        dispatch({ type: 'SIGN_IN', token: _token, name: _name })
        // store token to asyncStorage
        try {
          await AsyncStorage.setItem('userToken', _token)
          await AsyncStorage.setItem('userName', _name)
        } catch (e) {
          console.log(e)
        }
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
    }),
    []
  )

  function HomeTabNavigation() {
    return (
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName

            if (route.name === 'Home') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline'
            } else if (route.name === 'Settings') {
              iconName = 'settings'
              return <MaterialIcons name={iconName} size={size} color={color} />
            } else if (route.name === 'Map') {
              iconName = focused ? 'map' : 'map-outline'
              return (
                <MaterialCommunityIcons
                  name={iconName}
                  size={size}
                  color={color}
                />
              )
            } else if (route.name === 'Symptoms Checker') {
              iconName = focused ? 'ios-list-box' : 'ios-list'
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
        <Tab.Screen name="Symptoms Checker" component={SymptomChecker} />
        <Tab.Screen name="Settings">
          {(props) => (
            <SettingsScreen
              {...props}
              userName={state.userName}
              userToken={state.userToken}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    )
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <HomeTabNavigation />
      </NavigationContainer>
    </AuthContext.Provider>
  )
}
