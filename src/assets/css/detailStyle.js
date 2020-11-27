import { theme } from 'galio-framework';
import { StyleSheet, Dimensions,Platform } from 'react-native';

const { width, height } = Dimensions.get('screen');

const thumbMeasure = (width - 40 - 32) / 2;


const styles = StyleSheet.create({

    profileContainer: {
      width,
      height,
      padding: 0,
      zIndex: 1
    },
    profileBackground: {
      width,
      height: height * 0.3
    },
  
    info: {
      marginTop: 30,
      paddingHorizontal: 10,
      height: height * 0.8
    },
    avatarContainer: {
      position: 'relative',
      marginTop: -80
    },
    avatar: { 
      width: thumbMeasure,
      height: thumbMeasure,
      borderRadius: 50,
      borderWidth: 0
    },
    nameInfo: {
      marginTop: 35
    },
    thumb: {
      borderRadius: 4,
      marginVertical: 4,
      alignSelf: 'center',
      width: thumbMeasure,
      height: thumbMeasure
    },
    social: {
      width: theme.SIZES.BASE * 3,
      height: theme.SIZES.BASE * 3,
      borderRadius: theme.SIZES.BASE * 1.5,
      justifyContent: 'center',
      zIndex: 99,
      marginHorizontal: 5
    }
  });
  
export default styles;
  