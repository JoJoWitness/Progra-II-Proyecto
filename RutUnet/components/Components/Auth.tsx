import React, { useState } from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import { supabase } from '../../lib/supabase'
import { Button, Input } from '@rneui/themed'

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  async function signUpWithEmail() {
    setLoading(true)
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    if (!session) Alert.alert('Revisa tu correo para la verificacion!')
    setLoading(false)
  }

  return (
    <View style={styles.container}>
      <View>
        <Input
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder="email@address.com"
            autoCapitalize={'none'}
            style={styles.auth_input}
            underlineColorAndroid="transparent"
            inputContainerStyle={styles.inputContainer}
          />
          <Input
          
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
            placeholder="Contraseña"
            autoCapitalize={'none'}
            style={[styles.auth_input, styles.mym20]}
            underlineColorAndroid="transparent"
            inputContainerStyle={styles.inputContainer}
          />
      </View>
        

      <View >
        <Button  
          buttonStyle={styles.buttonLog} 
          titleStyle={styles.buttonTextLog}
          title="Ingresar" 
          disabled={loading} 
          onPress={() => signInWithEmail()} />
    
        <Button
          buttonStyle={[styles.buttonSign, styles.mym0]} 
          titleStyle={styles.buttonTextSign}
          title="Registrarse" 
          disabled={loading} 
          onPress={() => signUpWithEmail()} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 25,
    width: '100%',
    gap: 0,
    

  },

  auth_input:{
    backgroundColor: '#FEFEFF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    color: '#133D87',
    margin: 0,
    borderBottomWidth: 0,
    width: '100%'
  },
  inputContainer: {
    borderBottomWidth: 0,
    
  },
  mym20:{
    marginTop: -20,
    marginBottom: -10
  },
  mym0:{
    marginTop: 0,
    marginBottom: 0
  },
  buttonLog: {
    marginVertical: 8,
    width: '100%',
    backgroundColor: '#EDF3FC',
    padding: 6,
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonSign: {
    marginVertical: 8,
    width: '100%',
    backgroundColor: '#52A0DE',
    padding: 6,
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
  buttonTextSign: {
    color: '#EDF3FC', // Change the text color for Sign Up button
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Poppins',
  },
})