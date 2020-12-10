import { useLinkProps } from '@react-navigation/native';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform, TouchableOpacity } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const NotificationLink = ( props ) => {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  return (
    <TouchableOpacity
      onPress={async () => {
        await schedulePushNotification();
      }}
    >
      {props.children}
    </TouchableOpacity>
  );
}

function schedulePushNotification() {

  Notifications.scheduleNotificationAsync({
    content: {
      title: "COVID update ready",
      body: 'You daily COVID report is ready',
    },
    trigger: {
      hour: 9,
      minute: 0,
      repeats: true
    },
  });
}

async function registerForPushNotificationsAsync() {

  let token;

  if ( Constants.isDevice ) {

    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);

    let finalStatus = existingStatus;

    // If 
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

export async function setDailyNotification( active ){

  const currentNotifications =  await Notifications.getAllScheduledNotificationsAsync();

  // If we want notifications and none are present
  if( active && currentNotifications == 0 ){

    schedulePushNotification();
  
  // Remove all notifications
  } else if( !active ) {

    Notifications.cancelAllScheduledNotificationsAsync();
  }
}

export async function isNotificationsActive(){
  const currentNotifications =  await Notifications.getAllScheduledNotificationsAsync();

  if( currentNotifications.length == 0 ){
    return false;
  } else {
    return true;   
  }
}

export default NotificationLink;
