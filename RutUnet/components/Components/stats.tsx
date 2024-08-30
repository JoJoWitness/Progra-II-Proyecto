import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, View } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function TabTwoScreen() {
  return (
    <View style={styles.container_bg}>
     <View style={styles.container_inner}>
      
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
  borderRadius: 24,
  backgroundColor: '#EDF3FC',
  gap: 24
},





});
