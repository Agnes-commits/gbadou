import {  StyleSheet,Dimensions } from 'react-native';
import { theme } from 'galio-framework';

const { width } = Dimensions.get("screen");

const styles = StyleSheet.create({
    container: { 
      flex: 1,
      marginBottom:0

    },
    cardContainer:{ 
        flex:1,
        backgroundColor: "#e9e9e9",
        shadowColor: theme.COLORS.BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        shadowOpacity: 0.2,
        padding:10, 
       
    }
})

export default styles;