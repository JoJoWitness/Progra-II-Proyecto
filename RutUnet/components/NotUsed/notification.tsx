import React from 'react';
import { Image, StyleSheet, View, Button, Text, StatusBar, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { NotificationDisplay } from '@/components/Components/Notification';



export default function UserNotification() {
  const router = useRouter();

  let notificationText = [["La ruta pasa en 5 min!","7:20 am - xx/xx/202x"], ["La ruta empezó el recorrido","7:00 am - xx/xx/202x"], ["La ruta esta por salir!","1:15 pm - xx/xx/202x"], ["La ruta pasa en 5 min!","7:20 am - xx/xx/202x"]]

  return (
    
    <View style={styles.container_bg}>
      <View style={styles.container_goBack}>
      <Pressable  onPress={() => router.push('./user')}>
        <Image 
            source={require('../../assets/icons/arrow_left.png')} // Adjust the path to your logo
            style={styles.arrow}
          />
      </Pressable>
       </View>
      <View style={styles.container_inner}>
        <Text style={[styles.user_Text, styles.bold, styles.s16]}>
          Notificaciones
        </Text>
        {notificationText.map((item, index) => (
           <NotificationDisplay 
                index={index} 
                notifacationText={item[0]} 
                dateText={item[1]}
            />
        
            ))}
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 16,
    borderRadius: 24,
    backgroundColor: '#EDF3FC',
    position: "relative",
    gap: 12
  },
  userAccountInfo: {
    flex: 1,
    width: '100%',
    height: '100%',
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
  medium:{
    fontWeight: 400,
  },
  mediumbold:{
    fontWeight: 600,
  },
  infoImage: {
    width: 30,
    height : 30,
  },
  s16:{
    fontSize: 16
  }
  
  


  
  
 


});