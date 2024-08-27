
import { View, Text, Image, StyleSheet, Pressable, ImageSourcePropType} from 'react-native';

type NotificationDisplayProps = {
  index: number;
  notifacationText: string;
  dateText: string

};




export const NotificationDisplay: React.FC<NotificationDisplayProps> = ({index, notifacationText, dateText }) => {
  return (
   
      <View style={(index % 2 == 0) ? [styles.notifaction_informationContainer, styles.bg_blue] : [styles.notifaction_informationContainer, styles.bg_green] }>
        <View style={styles.notifactionTextContainer}>
          <Text style={styles.notifactionText}>{notifacationText}</Text>
          <Text style={styles.notifactionDate}>{dateText}</Text>
        </View>
        <Image 
              source={require('../../assets/icons/bell.png')}
              style={styles.infoImage}
            />
      </View>
   
  );
};


const styles = StyleSheet.create({
  
  account: {
    width: 160,
    height: 160,
   padding: 0,
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
  },
  userAccountInfo: {
    flex: 1,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  user_Text:{
    fontSize: 14,
    color: '#133D87',
    fontFamily: 'Roboto',
  },
  user_weekText:{
    fontSize: 14,
    color: '#65A9E2',
    fontFamily: 'Roboto',
  },
  bold:{
    fontWeight: 'bold',
  },
  mediumbold:{
    fontWeight: 400,
  },
  infoImage: {
    width: 32,
    height : 32,
  },
  notifaction_informationContainer:{
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
   

  },
  bg_blue:{
    backgroundColor: '#CBDDF6',
  },
  bg_green:{
    backgroundColor: '#CFF2EE'
  },
  notifactionTextContainer:{
    flex: 1,
    flexDirection: "column",
    gap: 2,
    fontSize: 12,
    color: '#65A9E2',
  },
  notifactionText:{
    fontSize: 14,
    fontFamily: 'Roboto',
    color:"#52A0DE"
  },
  notifactionDate:{
    fontSize: 12,
    fontFamily: 'Roboto',
     color:"#52A0DE"
  }

  
  
});

