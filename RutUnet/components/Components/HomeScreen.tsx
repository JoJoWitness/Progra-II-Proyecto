import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View, PermissionsAndroid, Platform, Button, Text, StatusBar, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import Auth from '@/components/Components/Auth';
import MapView , {Marker}from 'react-native-maps';
import { supabase } from '@/lib/supabase';
import * as Location from 'expo-location';

export function AuthScreen() {


  

  return (
    
    <View style={styles.container}>
      <View>
        <StatusBar hidden={true} />
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/images/RutUNET.png')} // Adjust the path to your logo
            style={styles.logo}
          />
        </View>
        <Text style={styles.title}>RUTUNET</Text>
      </View>
      
      <Auth/>
      {/* <View style={styles.buttonContainer}>  
        <Pressable style={styles.buttonLog} onPress={() => router.push('./(tabs)/mainScreen')}>
            <Text style={styles.buttonTextLog}>Ingresar</Text>
          </Pressable>
          <Pressable style={styles.buttonSing} onPress={() => router.push('./(tabs)/explore')}>
            <Text style={styles.buttonTextSing }>
              <Text>Registrarse</Text>
            </Text>
          </Pressable>
      </View> */}
    </View>
  );
}

export  function HomeMap() {
  
  const [region, setRegion] = useState({
    latitude: 7.7638637,
    longitude: -72.2113146,
    latitudeDelta: 0.005,
    longitudeDelta: 0.009,
  });

  
  const requestLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;
    setRegion({
      ...region,
      latitude,
      longitude,
    });
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);
    
   

  
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
      <Pressable style={styles.locationButton}  onPress={requestLocationPermission}>
        <Image 
          source={require("../../assets/icons/my_location.png")}
          style={styles.infoImage}
        />
      </Pressable>
       <MapView 
        style={styles.map} 
        region={region}
        onRegionChangeComplete={(region) => setRegion(region)}
       />
        
       
    </View>
  );
}

export  function HomeMapCoordinator() {
  
  const [locations, setLocations] = useState<{ stop_name: string, location_long: number,location_lat: number }[]>([]);
  const requestBusTable = async () => {
    const { data, error } = await supabase.from('bus_stops').select(`
      stop_name, 
      location_long, 
      location_lat
    `);
 
    if (error) {
      console.error('Error fetching location data:', error);
    } else if (data) {
      setLocations(data);
    }
    console.log(locations[14].stop_name)
  }
    

  

 
  

  
   

  const [region, setRegion] = useState({
    latitude: 7.7638637,
    longitude: -72.2113146,
    latitudeDelta: 0.005,
    longitudeDelta: 0.009,
  });

  
  const requestLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;
    setRegion({
      ...region,
      latitude,
      longitude,
    });
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);
    


  
  return (
    
    <View style={styles.container_bg}>
      <View style={styles.header_container}>
        <Text style={styles.ruta_name}>Ruta: 19 de abril</Text>
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
   
        <Pressable style={styles.ruta_transmitButton}  onPress={requestBusTable}>
          <Text style={styles.ruta_transmitText}>Transmitir</Text>
        </Pressable>

      </View>
      <Pressable style={styles.locationButton}  onPress={requestLocationPermission}>
        <Image 
          source={require("../../assets/icons/my_location.png")}
          style={styles.infoImage}
        />
      </Pressable>
       <MapView 
        style={styles.map} 
        region={region}
        onRegionChangeComplete={(region) => setRegion(region)}
       />
        
       
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#52a0de', 
    gap: 20
  },
  logoContainer: {
    marginTop: 20,
    width: 145,
    height: 220,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'center',
    letterSpacing: -2.5,
    color: '#133D87',
    fontFamily: 'Roboto',
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  buttonLog: {
    marginVertical: 8,
    width: '80%',
    backgroundColor: '#EDF3FC',
    padding: 10,
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonSing: {
    marginVertical: 8,
    width: '80%',
    backgroundColor: '#52A0DE',
    padding: 10,
    borderRadius: 30,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#EDF3FC',
  },
  buttonTextLog: {
    color: '#52A0DE', // Change the text color for Log In button
    fontSize: 16,
    fontWeight: 'bold',
     fontFamily: 'Poppins',
  },
  buttonTextSing: {
    color: '#EDF3FC', // Change the text color for Sign Up button
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Poppins',
  },



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
    paddingVertical: 30,
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
  
  locationButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 80,
    right: 20,
    borderRadius: 100,
    height: 40,
    width: 40,
    backgroundColor: '#52a0de'

  },
  ruta_transmitButton:{
    width: '80%',
    backgroundColor: '#EDF3FC',
    padding: 10,
    borderRadius: 30,
    alignItems: 'center',
  },
  
  ruta_transmitText:{
    color: '#52A0DE', // Change the text color for Log In button
    fontSize: 16,
    fontWeight: 'bold',
     fontFamily: 'Poppins' 
  }

});