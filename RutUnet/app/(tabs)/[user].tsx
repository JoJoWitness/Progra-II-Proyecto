import React, { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, View, Button, Text, StatusBar, Pressable, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import bus from "@/assets/icons/bus.png"
import gps from "@/assets/icons/gps_pin.png"
import clock from "@/assets/icons/clock.png"
import {UserDisplay, UserDisplayWeek} from '@/components/Components/UserDisplay'
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: false,
//     shouldSetBadge: false,
//   }),
// });

// async function sendPushNotification(expoPushToken: string) {
//   const message = {
//     to: expoPushToken,
//     sound: 'default',
//     title: 'Original Title',
//     body: 'And here is the body!',
//     data: { someData: 'goes here' },
//   };

//   await fetch('https://exp.host/--/api/v2/push/send', {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       'Accept-encoding': 'gzip, deflate',
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(message),
//   });
// }

// function handleRegistrationError(errorMessage: string) {
//   alert(errorMessage);
//   throw new Error(errorMessage);
// }

// async function registerForPushNotificationsAsync() {
//   if (Platform.OS === 'android') {
//     Notifications.setNotificationChannelAsync('default', {
//       name: 'default',
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: '#FF231F7C',
//     });
//   }

//   if (Device.isDevice) {
//     const { status: existingStatus } = await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;
//     if (existingStatus !== 'granted') {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }
//     if (finalStatus !== 'granted') {
//       handleRegistrationError('Permission not granted to get push token for push notification!');
//       return;
//     }
//     const projectId =
//       Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
//     if (!projectId) {
//       handleRegistrationError('Project ID not found');
//     }
//     try {
//       const pushTokenString = (
//         await Notifications.getExpoPushTokenAsync({
//           projectId,
//         })
//       ).data;
//       console.log(pushTokenString);
//       return pushTokenString;
//     } catch (e: unknown) {
//       handleRegistrationError(`${e}`);
//     }
//   } else {
//     handleRegistrationError('Must use physical device for push notifications');
//   }
// }


export default function UserInfo() {

  // const [expoPushToken, setExpoPushToken] = useState('');
  // const [notification, setNotification] = useState<Notifications.Notification | undefined>(
  //   undefined
  // );
  // const notificationListener = useRef<Notifications.Subscription>();
  // const responseListener = useRef<Notifications.Subscription>();

  // useEffect(() => {
  //   registerForPushNotificationsAsync()
  //     .then(token => setExpoPushToken(token ?? ''))
  //     .catch((error: any) => setExpoPushToken(`${error}`));

  //   notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
  //     setNotification(notification);
  //   });

  //   responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
  //     console.log(response);
  //   });

  //   return () => {
  //     notificationListener.current &&
  //       Notifications.removeNotificationSubscription(notificationListener.current);
  //     responseListener.current &&
  //       Notifications.removeNotificationSubscription(responseListener.current);
  //   };
  // }, []);


  const router = useRouter();
  return (
    
    <View style={styles.container_bg}>
      
      <View style={styles.container_inner}>
        <View style={styles.userAccountInfo}>
          <Image
            source={require('../../assets/icons/user_placeHolder.png')} // Adjust the path to your logo
            style={styles.account}
           />
           <Text style={[styles.user_Text, styles.mediumbold, styles.thinMargin]}>John Doe</Text>
          <Text style={styles.user_Text}>
            <Text style={styles.bold}>Rol: </Text>
            <Text>Coordinador</Text>
          </Text>
        </View>
        
          
          <View style={styles.user_informationFullContainer}>
            <UserDisplay icon={bus} displayName="Ruta" displayText="19 de Abril" editInfo={() => console.log("hi")} />
            <UserDisplay icon={gps} displayName="Tu Parada" displayText="Liceo Roman Valecillos" editInfo={() =>console.log("hello")} />
            <UserDisplay icon={clock} displayName="Notificar cuando falten" displayText="5 min" editInfo={() =>console.log("goodbye")} />
            <UserDisplayWeek displayName="Dias de uso en la mañana" displayText={["Lun", "Mar", "Mie", "Jue", "Vie"]} dayBool={[false, false, false, false, true]} editInfo={() =>console.log("goodbye")} />
            <UserDisplayWeek displayName="Dias de uso en la tarde" displayText={["Lun", "Mar", "Mie", "Jue", "Vie"]} dayBool={[true, false, false, true, true]} editInfo={() =>console.log("goodbye")} />
          </View>
          
          {/* <Button
        title="Press to Send Notification"
        onPress={async () => {
          await sendPushNotification(expoPushToken);
        }}
      /> */}

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container_bg: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 8,
    backgroundColor: '#52a0de', // Change the background color
  },
  container_goBack:{
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 16, // Change the background color
    paddingVertical: 8,
  },
  arrow: {
    width: 32,
    height: 32,
  },
  account: {
    width: 160,
    height: 160,
   padding: 0,
  },
  container_inner: {
    flex: 1,
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderRadius: 24,
    backgroundColor: '#EDF3FC',
    gap: 24
  },
  userAccountInfo: {
    flex: 0,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
 
  },
  user_Text:{
    fontSize: 14,
    color: '#133D87',
    fontFamily: 'Roboto',
  },
  bold:{
    fontWeight: 'bold',
  },
  mediumbold:{
    fontWeight: 400,
  },
  infoImage: {
    width: 30,
    height : 30,
  },
  thinMargin: {
    marginBottom: 8,
  },

  user_informationFullContainer: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
 
  
  },
  
 


});