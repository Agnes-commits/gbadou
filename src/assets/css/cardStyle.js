import {  StyleSheet,Dimensions } from 'react-native';
import { theme } from 'galio-framework';

const { width } = Dimensions.get("screen");

const styles = StyleSheet.create({
    card: {
      backgroundColor: theme.COLORS.WHITE,
      marginVertical: 6,
      borderWidth: 0,
      minHeight: 100,
      marginBottom: 4,
      width: width-20, 
    },
    cardTitle: {
      paddingHorizontal: 2,
      paddingTop: 3,
      paddingBottom: 2
    },
    cardDescription: {
      padding:  3
    },
    imageContainer: {
      borderRadius: 3,
      elevation: 1,
      overflow: 'hidden' 
    },
    image: {
      // borderRadius: 3,
    },
    horizontalImage: {
      height: 110,
      width: 'auto'
    },
    horizontalStyles: {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0
    },
    verticalStyles: {
      borderBottomRightRadius: 0,
      borderBottomLeftRadius: 0
    },
   
    shadow: {
      shadowColor: '#8898AA',
      shadowOffset: { width: 0, height: 1 },
      shadowRadius: 6,
      shadowOpacity: 0.1,
      elevation: 1
    },
    
  });

export default styles;