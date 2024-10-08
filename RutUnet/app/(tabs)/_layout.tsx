import { Tabs } from 'expo-router';
import React, { useEffect, useState } from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { NavigationContainer } from '@react-navigation/native';

export default function TabLayout() {
 
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])
  

  return (
    
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: session && session.user ? {backgroundColor: '#EDF3FC'} : { display: 'none' },
      }}>
      

      <Tabs.Screen
        name="stats"
        options={{
          title: 'Stats',
          
          tabBarIcon: ({focused }) => (
            <TabBarIcon name={focused ? 'stats-chart' : 'stats-chart-outline'} color={'#52A0DE'} />
          ),
          tabBarLabel: () => null,
          
        }}
      />

        <Tabs.Screen
        name="index"
        options={{
          
          title: 'MainScreen',
          tabBarIcon: ({focused }) => (
            <TabBarIcon name={focused ? 'map' : 'map-outline'} color={'#52A0DE'} />
          ),
          tabBarLabel: () => null,
        }}
      />

      <Tabs.Screen
        name="user"
        options={{
          title: 'User',
          
          tabBarIcon: ({focused }) => (
            <TabBarIcon name={focused ? 'settings' : 'settings-outline'} color={'#52A0DE'} />
          ),
          tabBarLabel: () => null,
          
        }}
      />
 

    <Tabs.Screen
        name="editDays"
        options={{
        
          title: 'MainScreen',
         
          tabBarIcon: ({focused }) => (
            <TabBarIcon name={focused ? 'map' : 'map-outline'} color={'#52A0DE'} />
          ),
          tabBarLabel: () => null,
          tabBarButton: () => null,
          tabBarStyle: { display : 'none'}
        }}
      />


    </Tabs>

  );
}
