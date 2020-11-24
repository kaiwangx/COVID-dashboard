import Parse from 'parse/react-native.js'
import AsyncStorage from '@react-native-async-storage/async-storage'

Parse.setAsyncStorage(AsyncStorage)
Parse.initialize(
  'vpmiVf8KrJoGqkU5jo2M26jtX4wiL5oxQROLLRwO',
  'fn39GXtWxBJyQTM1Eyl11uRYUYPyKjib5MtfbMWb'
) //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
Parse.serverURL = 'https://parseapi.back4app.com/'

function register(username, password, navigation = null, dest) {
  var user = new Parse.User()
  user.set('username', username)
  user.set('password', password)
  // user.set('email', 'email@example.com')

  // other fields can be set just like with Parse.Object
  // user.set('phone', '415-392-0202')
  user
    .signUp()
    .then(function (user) {
      alert('User created successful with name: ' + user.get('username'))
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
    .then(function (user) {
      alert('User sign in successful with name: ' + user.get('username'))
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
  var user = await Parse.User.currentAsync()
  // console.log('current user: ' + user.get('username'))
  return user
}

function loginWithToken() {
  Parse.User.currentAsync()
    .then(function (user) {
      // console.log('token' + user.get('sessionToken'))

      return Parse.User.become(user.get('sessionToken'))
    })
    .then(function (user) {
      // console.log(user)
    })
    .catch(function (error) {
      console.log('Error: ' + error.code + ' ' + error.message)
      alert(error.message)
    })
}

function logout() {
  Parse.User.logOut()
}

export { register, loginWithPassword, getCurrentUser, loginWithToken, logout }
