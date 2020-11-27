import {  StyleSheet,Dimensions } from 'react-native';
import Constants from 'expo-constants';

const { width } = Dimensions.get('window');
const qrSize = width * 0.7;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#D3D3D3',
        width:"100%",
        height:"100%"
    },
    text: {
        marginVertical:5,
        color:'white'
    },
    
  });

export default styles;