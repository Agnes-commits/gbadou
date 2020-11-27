import { StyleSheet, Platform, Dimensions } from 'react-native';
import { theme } from 'galio-framework';

const { height, width } = Dimensions.get('window');
const iPhoneX = () =>
  Platform.OS === 'ios' && (height === 812 || width === 812 || height === 896 || width === 896);


const styles = StyleSheet.create({
    button: {
      padding: 12,
      position: 'relative'
    },
    title: {
      width: '100%',
      fontSize: 18,
      fontWeight: 'bold',
      textAlign:'center'
    },
    navbar: {
      paddingVertical: 0,
      paddingBottom: theme.SIZES.BASE * 1.5,
      paddingTop: iPhoneX ? theme.SIZES.BASE * 2 : theme.SIZES.BASE,
      zIndex: 5,
      backgroundColor:"#ffa800",
      flex: 1,
      marginLeft: -17,
      marginRight: -17, 
      elevation:2
    },
    shadow: {
      backgroundColor: theme.COLORS.WHITE,
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 6,
      shadowOpacity: 0.2,
      elevation: 3
    },
    notify: {
      backgroundColor: theme.COLORS.SUCCESS,
      borderRadius: 4,
      height: theme.SIZES.BASE / 2,
      width: theme.SIZES.BASE / 2,
      position: 'absolute',
      top: 9,
      right: 12
    },
    header: {
      backgroundColor: theme.COLORS.WHITE
    },
    divider: {
      borderRightWidth: 0.3,
      borderRightColor: theme.COLORS.ICON
    },
    search: {
      height: 48,
      width: width - 20, 
      marginHorizontal: 16,
      borderWidth: 0,
      borderRadius: 30,
      borderColor: theme.COLORS.MUTED,
      marginVertical:15
    },
    options: {
      marginBottom: 24,
      marginTop: 10,
      elevation: 4
    },
    tab: {
      backgroundColor: theme.COLORS.SECONDARY,
      width: width * 0.35,
      borderRadius: 0,
      borderWidth: 0,
      height: 24,
      elevation: 0
    },
    tabTitle: {
      lineHeight: 19,
      fontWeight: '400',
      color: theme.COLORS.HEADER
    },
    social: {
      width: theme.SIZES.BASE * 3.5,
      height: theme.SIZES.BASE * 3.5,
      borderRadius: theme.SIZES.BASE * 1.75,
      justifyContent: 'center'
    },
  });

export default styles;