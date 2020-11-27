import React, { useState, useEffect } from 'react';
import { View, StyleSheet,TouchableOpacity} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import {Block, Text } from 'galio-framework';
import styles from '../assets/css/scanStyle';
import { connect } from 'react-redux';
import Toast from 'react-native-toast-message';
import {setTableInfo} from '../redux/actions/dataActions';


function Scanner(props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    //alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    props.onScan(data)
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      
        <Text h5 style={styles.text}>Scanner le code Qr</Text>
        <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={[{alignItems:'center',justifyContent:'center',}],StyleSheet.absoluteFillObject}
        />
            <Block style={{width:300,height:300, borderWidth:2, borderColor:"#fff"}}>

            </Block>
        <TouchableOpacity onPress={()=> props.navigation.navigate('Menu')}>
                <Text h5 style={styles.text}>Annuler</Text>
        </TouchableOpacity>
      
    </View>
  );
}

class ScannerScreen extends React.Component{
  constructor(props) { 
    super(props)
  }

  show = () => {
   
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Erreur',
        text2: "Le code qr n'a pu être lu. Veuillez réessayer",
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
        onShow: () => {},
        onHide: () => {}
      });
    }

  scanResult = (data) =>{
    if(data){
      this.props.setTableInfo(data)
      this.props.navigation.navigate('Menu')
    }else{
      this.show()
    }
      
  }

  render(){
    return(
      <Scanner navigation={this.props.navigation} onScan={this.scanResult} />
    )
  }
}

const mapStateToProps = state => {
 
  return {
      order: state.order,
  }  
}
 
export default connect(mapStateToProps,{setTableInfo})(ScannerScreen);