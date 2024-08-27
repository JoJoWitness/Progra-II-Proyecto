import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
 

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#EDF3FC',
        },
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
        name="notification"
        options={{
          title: 'Notifications',
          tabBarIcon: ({focused }) => (
            <TabBarIcon name={focused ? 'notifications' : 'notifications-outline'} color={'#52A0DE'} />
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
    </Tabs>
  );
}
