import React from 'react';
import { Image, StyleSheet, View, Button, Text, StatusBar, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import MapView from 'react-native-maps';


export default function UserInfo() {
  const router = useRouter();

  
  return (
    
    <View style={styles.container_bg}>
      <View style={styles.header_container}>
        <Text style={styles.ruta_name}>Ruta: 19 de abril</Text>

        <View style={styles.ruta_informationContainer}>
          <Text style={[styles.ruta_text, styles.ruta_informationDisplayUpperText]}>Tu Parada</Text>
          <View style={styles.ruta_informationDisplay}>
              <Image 
                source={require("../../assets/icons/gps_pin.png")}
                style={styles.infoImage}
              />
              <Text style={ styles.ruta_informationDisplayText}>La Normal</Text>
            </View>
        </View>
        
        <View style={styles.ruta_informationContainerBig}>
          <View style={styles.ruta_informationDisplay}>
              <Image 
                source={require("../../assets/icons/busFull.png")}
                style={styles.infoImage}
              />
              <Text style={ styles.ruta_informationDisplayText}>Tiempo para llegar: 7 min</Text>
            </View>
            <View style={styles.ruta_separator}/>
            <View style={styles.ruta_informationDisplay}>
              <Image 
                source={require("../../assets/icons/gps_pinRed.png")}
                style={styles.infoImage}
              />
              <Text style={ styles.ruta_informationDisplayText}>Proxima parada: C.C el Este</Text>
            </View>
        </View>
   
      </View>
       <MapView style={styles.map} 

       initialRegion={{
        latitude: 7.7638637,
        longitude: -72.2113146,
        latitudeDelta: 0.005,
        longitudeDelta: 0.009,
      }}
       />
    </View>
  );
}

const styles = StyleSheet.create({
  container_bg: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: '#52a0de', // Change the background color
  },
  header_container:{
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    position: "absolute",
    top: 0,
    zIndex: 100,
    height: 250,
    width: '100%',
    backgroundColor: '#52a0de',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingHorizontal: 35,
    paddingVertical: 20,
    gap: 12

  },
  ruta_name:{
    fontSize: 14,
    color: '#EDF3FC',
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    alignSelf: "flex-end"
  },
  ruta_text:{
    fontSize: 12,
    color: '#EDF3FC',
    fontFamily: 'Roboto',
  },
  infoImage: {
    width: 30,
    height :30,
  },
  thinMargin: {
    marginBottom: 8,
  },
  ruta_separator:{
    width: '70%',
    height: 2,
    backgroundColor: '#A8C6F0',
    borderRadius: 20
  },
  map: {
    zIndex: -1,
    width: '100%',
    height: '100%',
  },
 
 

  ruta_informationContainer: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5
  },
  ruta_informationContainerBig: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2,
    backgroundColor: '#EDF3F6',
    borderRadius: 20
  },
  ruta_informationDisplayUpperText: {
    marginLeft: 10,
    alignSelf: 'flex-start',
  },
  ruta_informationDisplay: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#EDF3FC',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 30,
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 15
  },
 
  ruta_informationDisplayText: {
    fontWeight: '500',
    fontSize: 12,
    color: '#52a0de'
  },
  
  

  
 


});