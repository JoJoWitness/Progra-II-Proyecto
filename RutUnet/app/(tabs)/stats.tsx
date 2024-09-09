
import { supabase } from '@/lib/supabase';
import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, Platform, View, Text, Button, TextInput } from 'react-native';
import { BarChart } from "react-native-chart-kit";

export default function TabTwoScreen() {

  const [weeklyUser, setWeeklyUser] = useState<[string]>()
  

  async function getUsers(){
    const {data, error} = await supabase
      .from("week_days")
      .select("bus_users")
      .order("id")

      if(error){
        console.log("There was an error: ", error)
      }
      else{
        console.log(data)
        const busUsersArray = data.map(item => item.bus_users);
        setWeeklyUser(busUsersArray)
        console.log(busUsersArray)
      }

    }

    useEffect(() => {
      getUsers()
    }, []);



  const data = {
    labels: ["Lun", "Mar", "Mie", "Jue", "Vie"],
    datasets: [
      {
        data: weeklyUser
      }
    ]
  };

  const chartConfig = {
    backgroundColor: "#EDF3FC",
    backgroundGradientFrom: "#EDF3FC",
    backgroundGradientTo: "#EDF3FC",
    color: (opacity = 1) => `rgba(82, 160, 222, 1)`,
    strokeWidth: 2, // optional, default 3 
    useShadowColorFromDataset: false // optional
  };

  return (
    <View style={styles.container_bg}>
     <View style={styles.container_inner}>
      <View style={styles.statsGraphsContainer}>
        <Text style={styles.weeklyText}>Uso de la ruta en la semana</Text>
          {weeklyUser
            ? <BarChart
                  data={data}
                  width={300}
                  height={220}
                  yAxisLabel=""
                  yAxisSuffix=""
                  fromZero={true}
                  showValuesOnTopOfBars={true}
                  chartConfig={chartConfig}
                />
                :
                null }
           
      
      </View>
      <View style={styles.statsGraphsContainer}>
        <Text style={styles.weeklyText}>Actualizar información</Text>
        <Link style={styles.weeklyBtn} href="/editDays" >
          Actualizar
        </Link>
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
  justifyContent: 'center',
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
  gap: 16,
  width: '100%'
},

weeklyText: {
  fontSize: 16,
  fontWeight: "bold",
  alignSelf: 'flex-start',
  color: '#52a0de',
},

weeklyBtn: {
  width: '60%',
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
  alignSelf: 'flex-start',
}

});

// import React, { useState } from 'react';
// import { View, StyleSheet, Button, Alert } from 'react-native';
// import { SelectList } from 'react-native-dropdown-select-list';
// import { useNavigation } from '@react-navigation/native';
// import {supabase} from '@/lib/supabase';

// const RouteSelectionScreen: React.FC = () => {
//     const navigation = useNavigation();
//     const [selected, setSelected] = useState<string | null>(null);

//     const data = [
//         { key: '1', value: '19 Abril' },
//         { key: '2', value: 'Tariba' },
//         { key: '3', value: 'Av Carabobo' },
//         { key: '4', value: 'Colon' },
//         { key: '5', value: 'Capacho' },
//         { key: '6', value: 'Cordero' }
//     ];
// const saveRouteSelection = async () => {
//     if (selected) {
//         const userId = "e9ddd8e0-fab5-461e-8100-0dd67b21fe8b"; // ID del usuario
//       console.log(selected)
//         const {error: fetchError } = await supabase
//             .from('profile_bus')
//             .update({ id_bus: parseInt(selected) })
//             .eq('id_profile', userId)
//         if (fetchError) {
//             console.error("No se puedo lograr la actualizacion", fetchError.message);
//             Alert.alert('Error', 'No se pudo verificar la selección de la ruta.');
//             return;
//         }

     
//         }
// };


//     return (
//         <View style={styles.container}>
//             <SelectList
//                 setSelected={(val: string) => setSelected(val)}
//                 data={data}
//                 defaultOption={{ key: '', value: 'Seleccione una ruta' }} 
//             />
//             <Button title="Guardar" onPress={saveRouteSelection} />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         paddingHorizontal: 20,
//         paddingTop: 20,
//         backgroundColor: '#edf3fc'
//     },
// });

// export default RouteSelectionScreen;
