import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button, Alert } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '@/lib/supabase';

const RouteSelectionScreen: React.FC = () => {
    const navigation = useNavigation();
    const [selected, setSelected] = useState<string | null>(null);
    const [userId, setUserId] = useState<string>()


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

    const data = [
        { key: '1', value: '19 Abril' },
        { key: '2', value: 'Tariba' },
        { key: '3', value: 'Av Carabobo' },
        { key: '4', value: 'Colon' },
        { key: '5', value: 'Capacho' },
        { key: '6', value: 'Cordero' }
    ];
const saveRouteSelection = async () => {
    if (selected) {
      console.log(selected)
        const {error: fetchError } = await supabase
            .from('profile_bus')
            .update({ id_bus: parseInt(selected) })
            .eq('id_profile', userId)
        if (fetchError) {
            console.error("No se puedo lograr la actualizacion", fetchError.message);
            Alert.alert('Error', 'No se pudo verificar la selección de la ruta.');
            return;
        }

        Alert.alert('Éxito', 'Se ha guardado la selección de días correctamente.'); //
        }
};


    return (
        <View style={styles.container}>
            <SelectList
                setSelected={(val: string) => setSelected(val)}
                data={data}
                defaultOption={{ key: '', value: 'Seleccione una ruta' }} 
            />
            <Button title="Guardar" onPress={saveRouteSelection} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
        backgroundColor: '#edf3fc'
    },
});

export default RouteSelectionScreen;