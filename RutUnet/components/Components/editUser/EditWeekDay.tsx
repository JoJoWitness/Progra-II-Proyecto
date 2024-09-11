import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, Button } from 'react-native';
import { MultipleSelectList } from 'react-native-dropdown-select-list';
import { supabase } from '@/lib/supabase';

type Days = {
    key: string;
    value: string;
    disabled: boolean; 
}

const DaysSelectionScreen: React.FC = () => {
    const [days, setDays] = useState<Days[]>([])
    const [selected, setSelected] = useState<string[]>([]);
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

    const fetchDays = async () =>{
        const {data, error} = await supabase
            .from('week_days')
            .select('id,day')
        
        console.log('data: '+data)
        if(error){
            console.error('Error buscando la parada: ', error.message)
        }
        else{
            const formattedData = data.map((day) => ({
                key: day.id.toString(),
                value: day.day,
                disabled: false
            }))
            setDays(formattedData);
            console.log('format'+formattedData)
        }
    }

    useEffect(()=>{
        fetchDays();
    },[])

    const saveDaysSelection = async () => {
        if (selected.length > 0) {
            
            
            const { error: deleteError } = await supabase
                .from('profile_days')
                .delete()
                .eq('profile_id', userId);
            
            if (deleteError) {
                console.error("No se pudo eliminar la selección anterior de días", deleteError.message);
                Alert.alert('Error', 'No se pudo guardar la selección de días.');
                return;
            }
            
            // Luego, inserta los días seleccionados
            const insertData = selected.map(dayId => ({
                profile_id: userId,
                days_id: parseInt(dayId) 
            }));

            const { error: insertError } = await supabase
                .from('profile_days')
                .insert(insertData);

            if (insertError) {
                console.error("No se pudo guardar la selección de días", insertError.message);
                Alert.alert('Error', 'No se pudo guardar la selección de días.');
                return;
            }

            Alert.alert('Éxito', 'Se ha guardado la selección de días correctamente.');
        } else {
            Alert.alert('Aviso', 'Por favor, selecciona al menos un día.');
        }
    };

    return (
        <View style={styles.container}>
            <MultipleSelectList
                setSelected={(val: string[]) => setSelected(val)}
                data={days}
                label = "Dias seleccionados"
                save="key"
                notFoundText='No hay resultados'
                onSelect={()=>console.log(selected)}//////
            />
            <Button title="Guardar Selección" onPress={saveDaysSelection} />
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

export default DaysSelectionScreen;