import React, { useState } from 'react'
import { Text, View, Image } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Parse from 'parse/react-native.js'
import { AppHeader } from './component/AppHeader'
import HomeScreen from './component/HomeScreen'
import MapScreen from './component/MapScreen'
import SettingsScreen from './component/SettingsScreen'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import SymptomChecker from './component/SymptomChecker'
import TokenContext from './component/context/TokenContext.js'
import AuthContext from './component/context/AuthContext.js'
import {
  retrieveData,
  storeData,
  removeData,
} from './functions/localStorage.js'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { loginWithToken, getCurrentUser } from './functions/backend'

const Tab = createBottomTabNavigator()

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
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignin: true,
          }
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignin: false,
          }
      }
    },
    {
      isSignin: false,
    }
  )

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      // loginWithToken()
      var user = await getCurrentUser()
      // console.log(user)
      if (user) {
        dispatch({ type: 'SIGN_IN' })
      } else {
        dispatch({ type: 'SIGN_OUT' })
      }
    }

    bootstrapAsync()
  }, [])

  const authContext = React.useMemo(
    () => ({
      signIn: async (_token, _name) => {
        dispatch({ type: 'SIGN_IN' })
      },
      signOut: async () => {
        dispatch({ type: 'SIGN_OUT' })
      },
    }),
    []
  )

  function HomeTabNavigation() {
    return (
      <>
        {/* <AppHeader title={"MyCovid"}/> */}
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
                return (
                  <MaterialIcons name={iconName} size={size} color={color} />
                )
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
            {(props) => <SettingsScreen {...props} isSignin={state.isSignin} />}
          </Tab.Screen>
        </Tab.Navigator>
      </>
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
