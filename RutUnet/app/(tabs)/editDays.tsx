import { supabase } from '@/lib/supabase';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Image, Platform, View, Text, Button, TextInput, Pressable, Alert } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';


export default function TabTwoScreen() {

  const [number, setNumber] = useState<string>("");
  const [weekDay, setWeekDay] = useState<string>("")
  const [selected, setSelected] = useState<string | null>(null);

  const data = [
        { key: '1', value: 'Lun' },
        { key: '2', value: 'Mar' },
        { key: '3', value: 'Mie' },
        { key: '4', value: 'Jue' },
        { key: '5', value: 'Vie' },
    ];

    function editUserWeekly(){
      if(selected && number){

   
        editWeekQuerry()
        setNumber("")
        setWeekDay("")
        console.log(number)
        console.log("selected:", selected)
        router.back()
      }
      else{
        console.log(number)
        console.log("selected:", selected)
        Alert.alert("Falta informacion")
      }
    }

    async function editWeekQuerry() {
      const {error} = await supabase
        .from("week_days")
        .update({bus_users: parseInt(number)})
        .eq('id', parseInt(selected))

        if(error){
          console.log("There was an error: ", error)
        }
        else{
          console.log("gato")
        }

    }



  return (
    <View style={styles.container_bg}>
     <View style={styles.container_inner}>
     
        <Text style={styles.weeklyText}>Usuarios del dia</Text>
        
        <TextInput
          placeholder="Ingresa los usuarios"
          keyboardType="numeric"
          defaultValue={number}
          onChangeText={newText => setNumber(newText)}
          style={styles.weekInput}
        />
      <View style={styles.weekContainer}>
        <SelectList
                setSelected={(val: string) => setSelected(val)}
                data={data}
                boxStyles={{borderColor: '#5fcda4', width: 100}}
                dropdownStyles={{borderColor: '#5fcda4', backgroundColor: '#edf3fc'}}
                inputStyles={{ backgroundColor: '#edf3fc'}}
                defaultOption={{ key: '', value: 'Dia' }} 
            />

        <Pressable
          style={styles.weeklyBtn}
          onPress={() => editUserWeekly()}
        >
          <Text style={{color: "#52a0de", fontWeight: "600"}}>Actualizar</Text>
        </Pressable>
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
  padding: 16,
  paddingVertical: 34,
  borderRadius: 24,
  backgroundColor: '#EDF3FC',
  gap: 16,
  },

statsGraphsContainer:{
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: 10,
  width: '100%'
},

weeklyText: {
  fontSize: 16,
  fontWeight: "bold",
  alignSelf: 'flex-start',
  color: '#52a0de',
},

weekInput: {
  width: '90%',
  height: 40,
  borderColor: '#5FCDA4',
  borderWidth: 1,
  borderRadius: 10,
  padding: 8,
  backgroundColor: '#fff',
  color: '#52a0de',
  fontSize: 16,
  fontWeight: '400',
  textAlign: "left",
  alignSelf: 'center',
},

weeklyBtn: {
  width: '40%',
  height: 40,
  borderColor: '#5FCDA4',
  borderWidth: 2,
  borderRadius: 20,
  padding: 8,
  backgroundColor: '#CFF2EE',
  color: '#52a0de',
  fontSize: 16,
  fontWeight: '600',
  textAlign: 'center',
  alignItems: 'center',
},
weekContainer:{
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  gap: 20,
  width: "100%",
  height: 200
}

});