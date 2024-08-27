import React from 'react';
import { Image, StyleSheet, View, Button, Text, StatusBar, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import bus from "@/assets/icons/bus.png"
import gps from "@/assets/icons/gps_pin.png"
import clock from "@/assets/icons/clock.png"
import {UserDisplay, UserDisplayWeek} from '@/components/Components/UserDisplay';


export default function UserInfo() {
  const router = useRouter();
  return (
    
    <View style={styles.container_bg}>
      <View style={styles.container_goBack}>
      <Pressable  onPress={() => router.push('./notification')}>
        <Image 
            source={require('../../assets/icons/arrow_left.png')} // Adjust the path to your logo
            style={styles.arrow}
          />
      </Pressable>
       </View>
      <View style={styles.container_inner}>
        <View style={styles.userAccountInfo}>
          <Image
            source={require('../../assets/icons/user_placeHolder.png')} // Adjust the path to your logo
            style={styles.account}
           />
           <Text style={[styles.user_Text, styles.mediumbold, styles.thinMargin]}>John Due</Text>
          <Text style={styles.user_Text}>
            <Text style={styles.bold}>Rol: </Text>
            <Text>Coordinador</Text>
          </Text>
          
          <View style={styles.user_informationFullContainer}>
            <UserDisplay icon={bus} displayName="Ruta" displayText="19 de Abril" editInfo={() => console.log("hi")} />
            <UserDisplay icon={gps} displayName="Tu Parada" displayText="Liceo Roman Valecillos" editInfo={() =>console.log("hello")} />
            <UserDisplay icon={clock} displayName="Notificar cuando falten" displayText="5 min" editInfo={() =>console.log("goodbye")} />
            <UserDisplayWeek displayName="Dias de uso en la mañana" displayText={["Lun", "Mar", "Mie", "Jue", "Vie"]} dayBool={[false, false, false, false, true]} editInfo={() =>console.log("goodbye")} />
            <UserDisplayWeek displayName="Dias de uso en la tarde" displayText={["Lun", "Mar", "Mie", "Jue", "Vie"]} dayBool={[true, false, false, true, true]} editInfo={() =>console.log("goodbye")} />
          </View>
          
        

        </View>
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderRadius: 24,
    backgroundColor: '#EDF3FC',
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