import React, { useState,useEffect } from 'react';
import { View, StyleSheet, Alert, Button } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '@/lib/supabase';


type BusStop = {
    key: string;
    value: string;
    disabled: boolean;
};

const StopSelectionScreen: React.FC = () => {
    const navigation = useNavigation();
    const [selected, setSelected] = useState<string | null>(null);
    const [busStops, setBusStops] = useState<BusStop[]>([])
    const [busId, setBusId] = useState<number|null>(null) 
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

    const fetchBusStops = async (busId:number) =>{
        const {data, error} = await supabase
            .from('bus_stops')
            .select('id,stop_name')
            .eq('bus_id', busId)
        
        console.log('data: '+data)
        if(error){
            console.error('Error buscando la parada: ', error.message)
        }
        else{
            const formattedData = data.map((stop) => ({
                key: stop.id.toString(),
                value: stop.stop_name,
                disabled: false
            }))
            setBusStops(formattedData);
            console.log('format'+formattedData)
        }
    }

    const fetchBusIdUser = async(userId:string)=>{
        const {data, error} = await supabase 
            .from('profile_bus')
            .select('id_bus')
            .eq('id_profile', userId)
        
        console.log('dataBus: '+data)
        if(error){
            console.error('Error buscando el id del bus: ', error.message)
            return null;
        }
        else{
            return data.length>0?data[0].id_bus:null
        }
    }

    useEffect(()=>{
        const getBusId = async()=>{
            const id = await fetchBusIdUser(userId)
            console.log('dataid:'+id)
            setBusId(id)
        }
        getBusId();
    },[userId])

    useEffect(() => {
        if (busId !== null) {  
            console.log('useEffect: ' + busId);
            fetchBusStops(busId); 
        }
    }, [busId]);

    const saveSopSelection = async () => {
        if (selected) {
             
            console.log(selected);
            
            const { error: updateError } = await supabase
                .from('profiles')  
                .update({ bus_stop_id: parseInt(selected) })  
                .eq('id', userId);  
    
            if (updateError) {
                console.error("No se pudo actualizar la parada seleccionada", updateError.message);
                Alert.alert('Error', 'No se pudo guardar la selección de la parada.');
                return;
            }
            Alert.alert('Éxito', 'Se ha guardado la selección de la parada correctamente.');
        } else {Alert.alert('Aviso', 'Por favor, selecciona una parada.');}
    };

    return (
        <View style={styles.container}>
            <SelectList
                setSelected={(val: string) => setSelected(val)}
                data={busStops}
                defaultOption={{ key: '', value: 'Seleccione una parada' }} 
            />
             <Button title="Guardar" onPress={saveSopSelection} />
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

export default StopSelectionScreen;
