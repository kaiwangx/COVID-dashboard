import Parse from 'parse/react-native.js'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { removeData, retrieveData } from './localStorage'

Parse.setAsyncStorage(AsyncStorage)
Parse.initialize(
  'vpmiVf8KrJoGqkU5jo2M26jtX4wiL5oxQROLLRwO',
  'fn39GXtWxBJyQTM1Eyl11uRYUYPyKjib5MtfbMWb'
) //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
Parse.serverURL = 'https://parseapi.back4app.com/'

function register(username, password, navigation = null, dest) {
  var userLocations = new Parse.User()
  userLocations.set('username', username)
  userLocations.set('password', password)
  // userLocations.set('email', 'email@example.com')

  // other fields can be set just like with Parse.Object
  // userLocations.set('phone', '415-392-0202')
  userLocations
    .signUp()
    .then(function (userLocations) {
      alert(
        'User created successful with name: ' + userLocations.get('username')
      )
      if (navigation) {
        navigation.navigate(dest)
      }
    })
    .catch(function (error) {
      console.log('Error: ' + error.code + ' ' + error.message)
      alert(error.message)
    })
}

async function loginWithPassword(username, password, navigation = null, dest) {
  await Parse.User.logIn(username, password)
    .then(function (userLocations) {
      alert(
        'User sign in successful with name: ' + userLocations.get('username')
      )
      if (navigation) {
        navigation.navigate(dest)
      }
    })
    .catch(function (error) {
      console.log('Error: ' + error.code + ' ' + error.message)
      alert(error.message)
    })
}

async function getCurrentUser() {
  var userLocations = await Parse.User.currentAsync()
  // console.log(userLocations)
  return userLocations
}

function loginWithToken() {
  Parse.User.currentAsync()
    .then(function (userLocations) {
      // console.log('token' + userLocations.get('sessionToken'))

      return Parse.User.become(userLocations.get('sessionToken'))
    })
    .then(function (userLocations) {
      // console.log(userLocations)
    })
    .catch(function (error) {
      console.log('Error: ' + error.code + ' ' + error.message)
      alert(error.message)
    })
}

function logout() {
  Parse.User.logOut()
}

async function saveUsersLocations() {
  const userLocationsStrings = await retrieveData('LocationData')

  if (userLocationsStrings != undefined) {
    const currDate = new Date().setHours(0, 0, 0, 0)
    const userLocations = JSON.parse(userLocationsStrings)
    const dateKeys = Object.keys(userLocations)
    const UserLocation = Parse.Object.extend('UserLocation')

    // Iterate all stored days
    dateKeys.forEach((key) => {
      // Iterate all locations in that day
      userLocations[key].forEach((savedLocation) => {
        // Create and store location object
        let userLocation = new UserLocation()
        userLocation.set('longitude', savedLocation.coords['longitude'])
        userLocation.set('latitude', savedLocation.coords['latitude'])
        userLocation.set('timestamp', currDate)
        userLocation.save()
      })
    })

    removeData('LocationData')
  }
}

async function getUserLocations() {
  const UserLocation = Parse.Object.extend('UserLocation')
  const query = new Parse.Query(UserLocation)

  // Get all possible infection dates
  const currDate = new Date().setHours(0, 0, 0, 0)
  const beginningOfInfectivity = currDate - 12096e5
  query.greaterThanOrEqualTo('timestamp', beginningOfInfectivity)

  // Select only longitude and latitude
  query.select('latitude', 'longitude')

  const userLocationData = await query.find()

  const userLocationDataClean = userLocationData.map((parseData) => {
    let data = parseData.toJSON()

    data['weight'] = 1 / userLocationData.length

    delete data['objectId']
    delete data['createdAt']
    delete data['updatedAt']
    return data
  })

  return userLocationDataClean
}

export {
  register,
  loginWithPassword,
  getCurrentUser,
  loginWithToken,
  logout,
  saveUsersLocations,
  getUserLocations,
}
