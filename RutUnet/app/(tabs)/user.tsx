import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, Button, Pressable, Text } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Header from '../../components/Components/Header';
import {UserDisplay, UserDisplayWeek } from '../../components/Components/UserDisplay';
import { supabase } from '@/lib/supabase';
import { MultipleSelectList, SelectList } from 'react-native-dropdown-select-list';


const ProfileScreen: React.FC = () => {
    const [routeName, setRouteName] = useState<string>("19 de abril");
    const [stopName, setStopName] = useState<string>("Parada ...")
    const [waitingTime, setWaitingTime] = useState<number | null>(null);
    const [morningDays, setMorningDays] = useState<boolean[]>([false, false, false, false, false]);
    const [userId, setUserId] = useState<string>()
    const [editBus, setEditBus] = useState<boolean>(false)
    const [editBusStop, setEditBusStop] = useState<boolean>(false)
    const [editTime, setEdiTime] = useState<boolean>(false)
    const [editWeek, setEditWeek] = useState<boolean>(false)


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


    useEffect(() => {
        const fetchData = async () => {
            type BusData ={
                buses: {bus_name: string}
            }
            type StopData={
                bus_stops: {stop_name: string}
            }
            type ProfileData = {
                bus_stop_id: number | null; 
              };
            type TimeData = {
                timeData: number | null
            }

            // Consulta a la tabla profile_bus y buses
            const { data, error } = await supabase
                .from('profile_bus')
                .select(`
                    buses (bus_name)
                `)
                .eq('id_profile', userId)
                .maybeSingle<BusData>();
            
            if (error) {
                console.error('Error al obtener la ruta: ', error.message);
                setRouteName('Error al cargar la ruta');
            } else if (data) {
                console.log(data) ////// 
                setRouteName(data.buses.bus_name); // Actualiza 
            }else{setRouteName('Ruta no encontrada')}

            // - busqueda de parada
            const { data: stopData, error:stopError } = await supabase
                .from('profiles')
                .select('bus_stop_id')
                .eq('id',userId)
                .maybeSingle<ProfileData>();
            

            if(stopError){
                console.error('error al obtener parada: ', stopError)
                setStopName('Error al cargar')
            }else if(stopData?.bus_stop_id){
                //setStopName(stopData.bus_stops.stop_name)
                const { data:busStopData, error: errorBusStop } = await supabase
                    .from('bus_stops')
                    .select('stop_name')
                    .eq('id', stopData.bus_stop_id)
                    .maybeSingle() 
                if (errorBusStop) {
                    console.error('Error al obtener el nombre de la parada: ', errorBusStop.message);
                    setStopName('Error al cargar la parada');
                } else if (busStopData) {
                    setStopName(busStopData.stop_name); 
                } else {
                    setStopName('Parada no seleccionada');
                }
            }else{
                setStopName('Parada no seleccionada')
            }

            // obtener tiempo
            const { data: timeData, error: timeError } = await supabase
                .from('profiles')
                .select('waiting_time')
                .eq('id', userId)
                .maybeSingle();

            if (timeError) {
                console.error('Error al obtener el tiempo de espera: ', timeError);
                setWaitingTime(null); 
            } else {
                if (timeData && timeData.waiting_time !== undefined) {
                    setWaitingTime(timeData.waiting_time);
                } else {
                    setWaitingTime(5); 
                }
            }

            const { data: daysData, error: daysError } = await supabase
                .from('profile_days')
                .select('days_id')
                .eq('profile_id', userId);

            if (daysError) {
                console.error('Error al obtener los días seleccionados: ', daysError.message);
            } else {
                console.log(daysData)
                const selectedDays = daysData.map(day => day.days_id);
                const daysArray = [1, 2, 3, 4, 5]; // Índices para LUN, MAR, MIE, JUE, VIE
                const morningDaysBool = daysArray.map(day => selectedDays.includes(day));
                setMorningDays(morningDaysBool);
               
            }

           

        };

        fetchData();
    }, [userId]);

  
  

    return (
        <View style={styles.container}>
          <View style={styles.container_inner}>
            {
            (!editBus && !editBusStop && !editTime && !editWeek) 
            ?
            <>
               < Header />
                <UserDisplay
                    icon={require('../../assets/icons/bus.png')}
                    displayName="Ruta"
                    displayText={routeName} 
                    stateProp={editBus}
                    setStateProp={setEditBus}// Muestra la ruta seleccionada
                />
                <UserDisplay
                    icon={require('../../assets/icons/gps_pin.png')}
                    displayName="Tu Parada"
                    displayText={stopName}
                    stateProp={editBusStop}
                    setStateProp={setEditBusStop} // Muestra parada seleccionada
                />
                <UserDisplay
                    icon={require('../../assets/icons/clock.png')}
                    displayName="Notificar cuando falten"
                    displayText={waitingTime+' min'}
                    stateProp={editTime}
                    setStateProp={setEdiTime} // tiempo de espera

                />
                <UserDisplayWeek
                    displayName="Días de uso en la mañana"
                    displayText={["LUN", "MAR", "MIE", "JUE", "VIE"]}
                    dayBool={morningDays}
                    stateProp={editWeek}
                    setStateProp={setEditWeek}

                />
            </>
            : null
            }
            {editBus && <RouteSelectionScreen
                stateProp={editBus}
                setStateProp={setEditBus}
                userId={userId}
            />}
            {editBusStop && <StopSelectionScreen
                stateProp={editBus}
                setStateProp={setEditBus}
                userId={userId}
            />}
            {editTime && <TimeSelectionScreen
                stateProp={editBus}
                setStateProp={setEditBus}
                userId={userId}/>}
            {editWeek && <DaysSelectionScreen
                stateProp={editBus}
                setStateProp={setEditBus}
                userId={userId}
            />}
           

            </View>
        </View>
    );
};



function RouteSelectionScreen({stateProp, setStateProp, userId}) {

    const [selected, setSelected] = useState<string | null>(null);



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
      console.log(stateProp)
        const {error: fetchError } = await supabase
            .from('profile_bus')
            .update({ id_bus: parseInt(selected) })
            .eq('id_profile', userId)
        if (fetchError) {
            console.error("No se puedo lograr la actualizacion", fetchError.message);
            Alert.alert('Error', 'No se pudo verificar la selección de la ruta.');
            return;
        }
        Alert.alert('Éxito', 'Se ha guardado la selección de la parada correctamente.');
        
        setStateProp(!stateProp)
        }
};


    return (
        <View style={styles.container_Display}>
            <SelectList
                setSelected={(val: string) => setSelected(val)}
                data={data}
                defaultOption={{ key: '', value: 'Seleccione una ruta' }} 
                boxStyles={{width: "90%", borderColor: '#5FCDA4', borderWidth: 2}}
            />
            <Pressable style={styles.edit_button} onPress={saveRouteSelection} >
                <Text style={{textAlign: "center", color: "#65A9E2", fontWeight: 500}}>Guardar</Text>
            </Pressable>
        </View>
    );
};

type BusStop = {
    key: string;
    value: string;
    disabled: boolean;
};

function StopSelectionScreen({stateProp, setStateProp, userId}){
    const [selected, setSelected] = useState<string | null>(null);
    const [busStops, setBusStops] = useState<BusStop[]>([])
    const [busId, setBusId] = useState<number|null>(null) 
  
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

    const saveStopSelection = async () => {
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
            setStateProp(!stateProp)
        } else {Alert.alert('Aviso', 'Por favor, selecciona una parada.');}
    };

    return (
        <View style={styles.container_Display}>
            <SelectList
                setSelected={(val: string) => setSelected(val)}
                data={busStops}
                defaultOption={{ key: '', value: 'Seleccione una parada' }} 
            />
             <Pressable style={styles.edit_button} onPress={saveStopSelection} >
                <Text style={{textAlign: "center", color: "#65A9E2", fontWeight: 500}}>Guardar</Text>
            </Pressable>
        </View>
    );
};

function TimeSelectionScreen({stateProp, setStateProp, userId}){

    const [selected, setSelected] = useState<string | null>(null);
    

    type Profile={
        id: string;
        sector: string;
        bus_stop_id?: number | null;
        carrer?: string;
        rol?: string;
        waiting_time?: number;
    }
    const data = [
        { key: '5', value: 5, disabled: false },
        { key: '10', value: 10, disabled: false },
        { key: '15', value: 15, disabled: false },
        { key: '20', value: 20, disabled: false }
    ];


    const saveSelection = async()=>{
        if(selected){

            const {error} = await supabase
                .from('profiles')
                .update({ waiting_time : parseInt(selected) })
                .eq('id',userId)

            if (error) {
                console.error("Error al guardar la selección: ", error.message);
                Alert.alert('Error', 'No se pudo guardar la selección.');
            } else {
                Alert.alert('Éxito', 'Selección guardada correctamente.');
                setStateProp(!stateProp)
            }
        }else{
            Alert.alert('Advertencia', 'Seleccione una opción antes de guardar.');
        }
    }

    return (
        <View style={styles.container_Display}>
            <SelectList
                setSelected={(val: string) => setSelected(val)}
                data={data}
                defaultOption={{ key: '', value: 'Seleccione tiempo de espera' }} 
            />
           <Pressable style={styles.edit_button} onPress={saveSelection} >
                <Text style={{textAlign: "center", color: "#65A9E2", fontWeight: 500}}>Guardar</Text>
            </Pressable>
        </View>
    );
};

type Days = {
    key: string;
    value: string;
    disabled: boolean; 
}

function DaysSelectionScreen({stateProp, setStateProp, userId}){
    const [days, setDays] = useState<Days[]>([])
    const [selected, setSelected] = useState<string[]>([]);
  

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
            setStateProp(!stateProp)
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
            <Pressable style={styles.edit_button} onPress={saveDaysSelection} >
                <Text style={{textAlign: "center", color: "#65A9E2", fontWeight: 500}}>Guardar</Text>
            </Pressable>
        </View>
    );
};





const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#52A0DE',
        padding: 20,
        alignItems: 'center',
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

      container_Display: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: '#edf3fc',
        gap: 24,
        width: "100%",
        flexDirection: "column",
        alignItems: "center"
    },

    edit_button:{
        borderRadius: 24,
        borderColor: "#5FCDA4",
        borderWidth: 2,
        backgroundColor: '#FEFEFF',
        color: "#65A9E2",
        width: "60%",
        padding: 12,
    }
  
});

export default ProfileScreen;