
import { View, Text, Image, StyleSheet, Pressable, ImageSourcePropType} from 'react-native';

type UserDisplayProps = {
  icon: ImageSourcePropType;
  displayName: string;
  displayText: string;
  editInfo: () => void;

};

type UserDisplayPropsWeeks = {
  displayName: string;
  displayText: string[];
  dayBool: boolean[];
  editInfo: () => void;

};


export const UserDisplay: React.FC<UserDisplayProps> = ({icon, displayName, displayText, editInfo }) => {
  return (
   
      <View style={styles.user_informationContainer}>
        <Text style={[styles.user_Text, styles.bold, styles.user_informationDisplayUpperText]}>{displayName}</Text>
        <View style={styles.user_informationDisplay}>
          <View style={styles.user_informationDisplayLeftPart}>
            <Image 
              source={icon}
              style={styles.infoImage}
            />
            <Text style={[styles.user_Text, styles.user_informationDisplayText]}>{displayText}</Text>
          </View>
          <Pressable  onPress={() => editInfo }>
            <Image 
              source={require('../../assets/icons/edit.png')}
              style={styles.infoImage}
            />
          </Pressable>
        </View>
      </View>
   
  );
};

export const UserDisplayWeek: React.FC<UserDisplayPropsWeeks> = ({ displayName, displayText, editInfo, dayBool }) => {


  return (
    
      <View style={styles.user_informationContainer}>
        <Text style={[styles.user_Text, styles.bold, styles.user_informationDisplayUpperText]}>{displayName}</Text>
        <View style={styles.user_informationDisplayWeek}>
          <View style={styles.user_informationDisplayLeftPart}>
          {displayText.map((item, index) => (
            <>
              
                <Text style={(dayBool[index]) ? [styles.bold, styles.user_Text]:[styles.user_weekText, styles.mediumbold] } key={index}>
                  {item} 
                </Text>
                <Text style={[styles.user_weekText, styles.mediumbold]}  key={index + "a"}>
                  {(index <= item.length)  ?  ' | ' : ""}
                </Text>
              </>
          
            ))}

          </View>
          <Pressable style={{position: "absolute", right: 16}}  onPress={() => editInfo }>
            <Image 
              source={require('../../assets/icons/edit.png')}
              style={styles.infoImage}
            />
          </Pressable>
        </View>
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
    width: 24,
    height : 24,
  },
  thinMargin: {
    marginBottom: 8,
  },

  user_informationContainer: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  user_informationDisplayUpperText: {
    marginLeft: 10,
    alignSelf: 'flex-start',
  },
  user_informationDisplay: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#CBDDF6',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  user_informationDisplayWeek: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#CBDDF6',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: "relative",
  },
  user_informationDisplayLeftPart: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  user_informationDisplayText: {
    fontWeight: '600',
    fontSize: 14,
  },
  
  user_weekContainer:{
    flex: 1,
    flexDirection: 'row',
    gap: 5,

  }
});

