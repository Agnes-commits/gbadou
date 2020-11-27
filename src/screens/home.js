import React from 'react';
import menu from '../assets/images/menu.png';
import { theme,Input, Block,Button,Text } from 'galio-framework';
import { View,Image } from 'react-native';
import styles from '../assets/css/authStyle';
 
class HomeScreen extends React.Component{
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <View style={styles.container}>
          <Block>
            <View style={styles.centerView}>
              <Image
                source={menu} 
                style={{ width: 300, height: 300 }}
              />
              <Block style={styles.centerView}>
                <Text h6 style={styles.center}>
                    Veuillez scanner le code qr de la  
                </Text>
                <Text h6 style={styles.center}>
                  table pour accéder au menu
                </Text>
                <Button 
                  onlyIcon={false} 
                  icon="qrcode"
                  round  
                  iconFamily="antdesign" 
                  color="warning" 
                  iconColor="#fff" 
                  style={{textAlign:"center", top:15, justifyContent: 'center',}}
                  onPress={()=>this.props.navigation.navigate('Scan')}
                  >Scanner</Button>
                </Block>
            </View>
          </Block>
      </View> 
    );
  }
};
 
export default HomeScreen;