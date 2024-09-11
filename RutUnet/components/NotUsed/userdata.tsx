import React, { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, View, Button, Text, StatusBar, Pressable, Platform } from 'react-native';
import { useRouter } from 'expo-router';

type RutaSelectorProps = {
  index: number
  ruta: string
  lat: string
  long: string

};



export default function UserData() {

  let array = ['19 de abril', 'Av Carabobo', 'Tariba-Palmira', 'Cordero', 'Capacho', 'Santa Ana']
  
  const router = useRouter();
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
        <Text style={styles.dataChange_mainText}>
          Seleccionar ruta
        </Text>
        <View style={styles.dataChange_Container}>
        {array.map((item, index) => (
           
           <RutaSelector
              index={index}
              ruta={item}
              lat='ryuk'
              long='ryu'/>
        
            ))}
        </View>
        
        <Pressable style={[styles.buttonContainer, styles.button]}>
          <Text style={styles.buttonText}>
            Guardar cambios
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const RutaSelector: React.FC<RutaSelectorProps> = ({index, ruta, lat, long}) =>{
  console.log(lat, long)
  console.log(ruta)
  return(
    
    <View style={(index % 2 ==0 ) ? [styles.dataChange_RutaCell, styles.dataChange_RutaEven] : [styles.dataChange_RutaCell, styles.dataChange_RutaOdd]}>  
      <Text style={styles.dataChange_rutaText}>
        {ruta}
      </Text>
    </View>
  )
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
 
  container_inner: {
    flex: 1,
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 32,
    borderRadius: 24,
    backgroundColor: '#EDF3FC',
    gap: 10
  },
  dataChange_mainText: {
    fontSize: 14,
    color: '#65A9E2',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf: 'flex-start'
  },
  dataChange_Container:{
    width: '100%',
    height: 'auto',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    borderColor: '#48CFAE', 
    borderWidth: 2,
    borderRadius: 6, 
    padding: 1,
    marginBottom:20
  },
  dataChange_RutaCell:{
    width: '100%',
    justifyContent: 'flex-start',
    
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  dataChange_rutaText:{
    fontSize: 12,
    color: '#133D87',
    
  },
  dataChange_RutaOdd:{
    backgroundColor: '##EDF3FC',
   
  },
  dataChange_RutaEven:{
    backgroundColor: '#FEFEFF',
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

  button: {
    backgroundColor: '#fff',
    borderColor: '#48CFAE',
    borderWidth: 2,
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#65A9E2',
    fontSize: 16,
    fontWeight: 'bold',
  },

});