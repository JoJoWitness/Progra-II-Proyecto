import React from 'react';
import { Image, StyleSheet, View, Button, Text, StatusBar, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();
  return (
    
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/images/RutUNET.png')} // Adjust the path to your logo
          style={styles.logo}
        />
      </View>
      <Text style={styles.title}>RUTUNET</Text>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.buttonLog} onPress={() => router.push('./(tabs)/user')}>
            <Text style={styles.buttonTextLog}>Ingresar</Text>
          </Pressable>
          <Pressable style={styles.buttonSing} onPress={() => router.push('./(tabs)/explore')}>
            <Text style={styles.buttonTextSing }>
              <Text>Registrarse</Text>
            </Text>
          </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#52a0de', // Change the background color
  },
  logoContainer: {
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
});