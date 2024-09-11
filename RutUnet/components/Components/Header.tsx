import React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { supabase } from '@/lib/supabase';

const Header: React.FC = () => {
    const [userName, setUserName] = useState<string | null>(null);
    const [userRol, setUserRol] = useState<string | null>('Rol');
    const [userId, setUserId] = useState<string>()
    const [userEmail, setUserEmail] = useState<string>()


    const fetchUserProfile = async () => {
      const { data: {session}, error  } = await supabase.auth.getSession();
      if (session) {
        const user = session.user; 
        setUserId(user.id)
        setUserEmail(user.email)
  
        }
      else{
        console.log("There was an error: ", error)
     
      }
      }
    
  
      useEffect(() => {
        fetchUserProfile()
      }, []);

    useEffect(() => {
        const fetchUserData = async () => {

            const { data: profileData, error: profileError } = await supabase
                .from('profiles')
                .select('rol') 
                .eq('id', userId) ////
                .single();

            if (profileError) {
                console.error('Error fetching profile data:', profileError);
                return;
            }

            if (profileData) {
                
                const username = userEmail.split('@')[0];
                setUserName(username);
                setUserRol(profileData.rol|| 'Rol');
            }
        };

        fetchUserData();
    }, [userId, userEmail]);

    return (
        <View style={styles.avatarContainer}>
            <Image source={require('../../assets/icons/user_placeHolder.png')} style={styles.avatar} />
            <Text style={styles.userName}>{userName || 'User Name'}</Text>
            <Text style={styles.userRol}>{userRol}</Text>
        </View>
    );
};



const styles = StyleSheet.create({
    avatarContainer:{
        alignItems: 'center',
        marginBottom: 20,    
    },
    avatar:{
        width: 120,
        height: 120,
        borderRadius: 40,
        marginBottom: 10,
    },
    userName:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    userRol:{
        fontSize: 16,
        color: '#666',
    }
});

export default Header;