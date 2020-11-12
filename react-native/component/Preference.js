import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { Input } from 'react-native-elements'
import { Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import AuthContext from './AuthContext.js'
import { Switch } from 'react-native-paper'
import { ListItem, Icon, Avatar, Divider, Header } from 'react-native-elements'
import Foundation from 'react-native-vector-icons/Foundation'

export default function Preference(props) {
  const [isSwitchOn, setIsSwitchOn] = useState(false)

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn)

  const nothing = () => {}

  function _onPressStyle() {
    alert('style')
  }

  const setting_list = [
    {
      title: 'Location Permission',
      icon: <Icon name="location" type="evilicon" />,
      rightContent: (
        <Switch
          style={styles.switch}
          value={isSwitchOn}
          onValueChange={onToggleSwitch}
        />
      ),
    },
    {
      title: 'Graph Style',
      icon: <Icon name="graphic-eq" type="materialIcons" />,
      rightContent: <ListItem.Chevron />,
    },
  ]

  const functionList = [nothing, _onPressStyle]

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View>
          {setting_list.map((item, i) => (
            <ListItem bottomDivider onPress={functionList[i]} key={i}>
              {item.icon}
              <ListItem.Content>
                <ListItem.Title>{item.title}</ListItem.Title>
              </ListItem.Content>
              {item.rightContent}
            </ListItem>
          ))}
        </View>
        <View style={styles.title}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}></Text>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
  },

  scrollView: {
    marginTop: 20,
    marginBottom: 20,
  },

  title: {
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    marginLeft: 20,
    marginRight: 20,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },

  input: { marginLeft: 10, marginRight: 10 },

  settingText: {
    fontSize: 15,
    flex: 1,
    marginLeft: 20,
  },

  switch: { flex: 1, marginRight: -10 },

  button: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 20,
  },

  text_link: {
    color: '#6EC5E9',
  },
})
