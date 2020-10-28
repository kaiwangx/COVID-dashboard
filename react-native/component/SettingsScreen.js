import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

import { ListItem, Icon, Avatar, Divider, Header } from 'react-native-elements'

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
    <View style={styles.container}>
      {/* <Header
        centerComponent={{ text: 'Settings', style: { color: '#fff' } }}
      /> */}
      <Text style={styles.header}>Settings</Text>
      <Divider style={{ backgroundColor: 'black' }} />
      <View>
        {user_list.map((l, i) => (
          <ListItem key={i} bottomDivider>
            <Avatar source={{ uri: l.avatar_url }} />
            <ListItem.Content>
              <ListItem.Title>{l.name}</ListItem.Title>
              <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))}
      </View>
      <View>
        {setting_list.map((item, i) => (
          <ListItem key={i} bottomDivider>
            <Icon name={item.icon} />
            <ListItem.Content>
              <ListItem.Title>{item.title}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },

  header: {
    marginTop: 20,
    fontSize: 30,
    fontWeight: 'bold',
  },
})
