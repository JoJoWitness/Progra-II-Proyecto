import React from 'react';
import { Image, StyleSheet, View, Button, Text, StatusBar, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function UserInfo() {
  const router = useRouter();
  return (
    
    <View style={styles.container_bg}>
      <View style={styles.container_goBack}>
      <TouchableOpacity  onPress={() => router.back()}>
        <Image 
            source={require('../../assets/icons/arrow_left.png')} // Adjust the path to your logo
            style={styles.arrow}
          />
      </TouchableOpacity>
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
            <View style={styles.user_informationContainer}>
              <Text style={[styles.user_Text,styles.bold, styles.user_informationDisplayUpperText]}>Ruta: </Text>
              <View style={styles.user_informationDisplay}>
                <View style={styles.user_informationDisplayLeftPart}>
                  <Image 
                      source={require('../../assets/icons/bus.png')}
                      style={styles.infoImage}
                    />
                  <Text style={[styles.user_Text, styles.user_informationDisplayText]}>19 de Abril</Text>
                </View>
                <Image 
                      source={require('../../assets/icons/edit.png')}
                      style={styles.infoImage}/>
                      
              </View>
            </View>
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
    borderRadius: 24,
  
  },
  user_informationContainer: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  user_informationDisplayUpperText: {
    marginLeft: 10,
    alignSelf: 'flex-start',
  },
  user_informationDisplay: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#CBDDF6',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  user_informationDisplayLeftPart: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  user_informationDisplayText: {
    fontWeight: '600',
    fontSize: 14,
  },
  
 


});