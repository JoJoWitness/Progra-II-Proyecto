import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View, PermissionsAndroid, Platform, Button, Text, StatusBar, Pressable, Alert } from 'react-native';
import Auth from '@/components/Components/Auth';
import MapView , {Marker, Polyline}from 'react-native-maps';
import { supabase } from '@/lib/supabase';
import * as Location from 'expo-location';
import MapViewDirections from 'react-native-maps-directions';

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
    </View>
  );
}

export  function HomeMap() {
  const ApiKey = process.env.GOOGLE_MAPS_KEY;
  const [region, setRegion] = useState({
    latitude: 7.7638637,
    longitude: -72.2113146,
    latitudeDelta: 0.005,
    longitudeDelta: 0.009,
  });

  const [locations, setLocations] = useState<{ stop_name: string, location_long: number,location_lat: number }[]>([]);
  const [busLocation, setBusLocation] = useState<{ latitude: number, longitude: number}>({ latitude: 0, longitude: 0 });
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [userId, setUserId] = useState<string>()
  const [userBus, setUserBus] = useState<string>()
  const [userBusId, setUserBusId] = useState<string>()
  const [userStop, setUserStop] = useState<string>()
  const [userStopLocation, setUserStopLocation] = useState<{}>({long: 0, lat: 0})
  

  const fetchUserProfile = async () => {
    const { data: {session}, error  } = await supabase.auth.getSession();
    if (session) {
      const user = session.user; 
      setUserId(user.id)

      }
    else{
      console.log("There was an error: ", error)
   
    }
    }
  

    useEffect(() => {
      fetchUserProfile()
    }, []);

    async function fetchUserStop(){
      const {data: bus_stop, error} = await supabase
      .from("profiles")
      .select("bus_stop_id")
      .eq("id", userId)
      .single()

      if(error){
        console.log("there was an error while fetching the user data: ", error )
      }
      else{
          const {data, error} = await supabase
        .from("bus_stops")
        .select("stop_name, location_long, location_lat")
        .eq("id", bus_stop.bus_stop_id)
        .single()

        if(error){
          console.log("there was an error fetching the bus stop: ", error)
        }else{
          setUserStop(data.stop_name)
          setUserStopLocation({long: data.location_long, lat: data.location_lat})
        }
        
       }
    }

    async function fetchUserBus(){
      const {data: bus_id, error} = await supabase
       .from("profile_bus")
       .select("id_bus")
       .eq("id_profile", userId)
       .single()

       if(error){
        console.log("there was an error while fetching the bus id: ", error )
       }
       else{
        setUserBusId(bus_id.id_bus)
        const {data, error} = await supabase
        .from("buses")
        .select("bus_name")
        .eq("id", bus_id.id_bus)
        .single()

        if(error){
          console.log("there was an error while fetching the bus name: ", error )
        }
        else{
          setUserBus(data.bus_name)
        }
       }
      
    }



    useEffect(() => {
      fetchUserStop()
      fetchUserBus()
    }, [userId]);



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
    requestStopsTable()
  }, []);

  const requestStopsTable = async () => {
    try{
      const { data, error } = await supabase.from('bus_stops').select(`
        stop_name, 
        location_long, 
        location_lat
      `)
      .eq("bus_id", userBusId)
      .order("id");
   
      if (data) {
        setLocations(data);
      }
    } catch(error){
      console.error('Error fetching location data:', error);
    }
  }

  async function requestBusTable() {
    try{
      const {data, error} = await supabase.from('buses').select(`
        bus_location_long,
        bus_location_lat,
        is_transmiting
        `)
        .eq("id", userBusId)
        .single()
        
        if(data){
          setBusLocation({
            latitude: data.bus_location_lat,
            longitude: data.bus_location_long,
          })
          console.log(data.is_transmiting, "info")
          setIsTransmitting(data.is_transmiting)
         
          console.log(isTransmitting, "state")
        }
    }catch(error){
      console.error('Error fetching location data:', error);
    }
  }
   

  useEffect(() => {
    const interval = setInterval(() => {
      requestBusTable()
   
    }, 10000);
  

    return () => clearInterval(interval);

  }, []);
  


    
  return (
    
    <View style={styles.container_bg}>
      <View style={styles.header_containerUser}>
        {/* <Text style={styles.ruta_name}>Ruta: 19 de abril</Text> */}

        <View style={styles.ruta_informationContainer}>
          {/* <Text style={[styles.ruta_text, styles.ruta_informationDisplayUpperText]}>Tu Parada</Text> */}
          {/* <View style={styles.ruta_informationDisplay}>
              <Image 
                source={require("../../assets/icons/gps_pin.png")}
                style={styles.infoImage}
              />
              <Text style={ styles.ruta_informationDisplayText}>La Normal</Text>
            </View> */}
        </View>
        
        <View style={styles.ruta_informationContainerBig}>
          <View style={styles.ruta_informationDisplay}>
              <Image 
                source={require("../../assets/icons/busFull.png")}
                style={styles.infoImage}
              />
              <Text style={ styles.ruta_informationDisplayText}>Tu ruta: {userBus}</Text>
            </View>
            <View style={styles.ruta_separator}/>
            <View style={styles.ruta_informationDisplay}>
              <Image 
                source={require("../../assets/icons/gps_pinRed.png")}
                style={styles.infoImage}
              />
              <Text style={ styles.ruta_informationDisplayText}>Tu parada: {userStop}</Text>
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
       >
        {(isTransmitting) ? locations.map((location, index) => (
        <Marker
          key={index}
          coordinate={{
            latitude: location.location_lat,
            longitude: location.location_long,
          }}
          title={location.stop_name}
          pinColor='teal'
        />
      ))
      : null}
      {isTransmitting && (
            <MapViewDirections
              origin={{latitude: locations[0].location_lat, longitude: locations[0].location_long}}
              destination={{latitude: locations[locations.length-1].location_lat, longitude: locations[locations.length-1].location_long}}
              apikey={`${ApiKey}`}
              waypoints={locations.map(location => ({
                latitude: location.location_lat,
                longitude: location.location_long,
              }))}
              strokeColor="#A8C6F0"
           
              splitWaypoints={true}

              strokeWidth={4} 
              
            />
          )}

        {isTransmitting && (
          <Marker
            coordinate={{
              latitude: busLocation.latitude,
              longitude: busLocation.longitude,
            }}
            title="Bus"
            pinColor='red'
            icon={require('../../assets/icons/busFull_darkBlue.png')}
          />
        )}

        {userStop && (
          <Marker
            coordinate={{
              latitude: userStopLocation.lat,
              longitude: userStopLocation.long,
            }}
            title="Tu parada"
            pinColor='red'
            rotation={1}
          />
        )}

        </MapView>
        
       
    </View>
  );
}

export  function HomeMapCoordinator() {
  
  const [locations, setLocations] = useState<{ stop_name: string, location_long: number,location_lat: number }[]>([]);
  const [busLocation, setBusLocation] = useState<{ latitude: number, longitude: number}>({ latitude: 0, longitude: 0 });
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [userId, setUserId] = useState<string>()
  const [userBus, setUserBus] = useState<string>()
  const [userBusId, setUserBusId] = useState<string>()
  const [userStop, setUserStop] = useState<string>()
  const [userStopLocation, setUserStopLocation] = useState<{}>({long: 0, lat: 0})

  const requestBusTable = async () => {
    try{
      const { data, error } = await supabase.from('bus_stops').select(`
        stop_name, 
        location_long, 
        location_lat
      `)
      .eq("bus_id", userBusId)
      .order("id");
   
      if (data) {
        setLocations(data);
      }
    } catch(error){
      console.error('Error fetching location data:', error);
    }
  }

  const fetchUserProfile = async () => {
    const { data: {session}, error  } = await supabase.auth.getSession();
    if (session) {
      const user = session.user; 
      setUserId(user.id)

      }
    else{
      console.log("There was an error: ", error)
   
    }
    }
  

    useEffect(() => {
      fetchUserProfile()
    }, []);

    async function fetchUserStop(){
      const {data: bus_stop, error} = await supabase
      .from("profiles")
      .select("bus_stop_id")
      .eq("id", userId)
      .single()

      if(error){
        console.log("there was an error while fetching the user data: ", error )
      }
      else{


          const {data, error} = await supabase
        .from("bus_stops")
        .select("stop_name, location_long, location_lat")
        .eq("id", bus_stop.bus_stop_id)
        .single()

        if(error){
          console.log("there was an error fetching the bus stop: ", error)
        }else{
          setUserStop(data.stop_name)
          setUserStopLocation({long: data.location_long, lat: data.location_lat})
        }
        
       }
    }

    async function fetchUserBus(){
      const {data: bus_id, error} = await supabase
       .from("profile_bus")
       .select("id_bus")
       .eq("id_profile", userId)
       .single()

       if(error){
        console.log("there was an error while fetching the bus id: ", error )
       }
       else{
        setUserBusId(bus_id.id_bus)
        const {data, error} = await supabase
        .from("buses")
        .select("bus_name")
        .eq("id", bus_id.id_bus)
        .single()

        if(error){
          console.log("there was an error while fetching the bus name: ", error )
        }
        else{
          setUserBus(data.bus_name)
        }
       }
      
    }



    useEffect(() => {
      fetchUserStop()
      fetchUserBus()
    }, [userId]);


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
  }

    const setBusMarker = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }
  
      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setBusLocation({
        ...busLocation,
        latitude,
        longitude,
      });   
  };

  function changeTransmitting() {
    if(isTransmitting){
      setIsTransmitting(false) 
      setBusMarker();
      setBusLocation({ ...busLocation, latitude: 0, longitude: 0});
      changeBusTable();
    }
    else{

      setIsTransmitting(true);
      changeBusTable();
    }


  }

  async function changeBusTable() {
  
    try{
      const { data, error } = await supabase
      .from('buses')
      .update({ bus_location_long: busLocation.longitude, bus_location_lat: busLocation.latitude, is_transmiting: !isTransmitting })
      .eq('id', userBusId);

     
    } catch(error){
      console.error('Error updating location data:', error);
    }
  }
  

  useEffect(() => {
 
    requestLocationPermission();

    const interval = setInterval(() => {
      if (isTransmitting) {
        setBusMarker();
      }
    }, 10000);
  

    return () => clearInterval(interval);

  }, [isTransmitting]);

  useEffect(() =>{
    requestBusTable();
  }), [userBusId]
  

    const ApiKey = process.env.GOOGLE_MAPS_KEY;

   

  
  return (
    
    <View style={styles.container_bg}>
      <View style={styles.header_container}>
        <View style={styles.ruta_informationContainerBig}>
          <View style={styles.ruta_informationDisplay}>
              <Image 
                source={require("../../assets/icons/busFull.png")}
                style={styles.infoImage}
              />
              <Text style={ styles.ruta_informationDisplayText}>Tu ruta: {userBus}</Text>
            </View>
            <View style={styles.ruta_separator}/>
            <View style={styles.ruta_informationDisplay}>
              <Image 
                source={require("../../assets/icons/gps_pinRed.png")}
                style={styles.infoImage}
              />
              <Text style={ styles.ruta_informationDisplayText}>Tu parada: {userStop}</Text>
            </View>
        </View>
   
        <Pressable style={styles.ruta_transmitButton}  onPress={changeTransmitting}>
          {isTransmitting 
            ? 
            <Text style={styles.ruta_transmitText}>Dejar de Transmitir</Text>
            :
            <Text style={styles.ruta_transmitText}>Transmitir</Text>
            }
         
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
       >
       {(isTransmitting) ? locations.map((location, index) => (
        <Marker
          key={index}
          coordinate={{
            latitude: location.location_lat,
            longitude: location.location_long,
          }}
          title={location.stop_name}
          pinColor='teal'
        />
      ))
      : null}
      {isTransmitting && (
            <MapViewDirections
              origin={{latitude: locations[0].location_lat, longitude: locations[0].location_long}}
              destination={{latitude: locations[locations.length-1].location_lat, longitude: locations[locations.length-1].location_long}}
              apikey={`${ApiKey}`}
              waypoints={locations.map(location => ({
                latitude: location.location_lat,
                longitude: location.location_long,
              }))}
              strokeColor="#A8C6F0"
           
              splitWaypoints={true}

              strokeWidth={4} 
              
            />
          )}

        {isTransmitting && (
          <Marker
            coordinate={{
              latitude: busLocation.latitude,
              longitude: busLocation.longitude,
            }}
            title="Bus"
            pinColor='red'
            icon={require('../../assets/icons/busFull_darkBlue.png')}
          />
        )}
         {userStop && (
          <Marker
            coordinate={{
              latitude: userStopLocation.lat,
              longitude: userStopLocation.long,
            }}
            title="Tu parada"
            pinColor='red'
            rotation={1}
          />
        )}

      </MapView>
        
       
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
    height: 210,
    width: '100%',
    backgroundColor: '#52a0de',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingHorizontal: 35,
    paddingTop: 45,
    gap: 12
  },
  header_containerUser:{
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    position: "absolute",
    top: 0,
    zIndex: 100,
    height: 180,
    width: '100%',
    backgroundColor: '#52a0de',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingHorizontal: 35,
    paddingTop: 40,
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
    flex: 1,
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