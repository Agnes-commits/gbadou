import React from 'react';
import { theme,Input, Block,Button,Text } from 'galio-framework';
import { View,ScrollView ,FlatList, Platform} from 'react-native';
import Header from './header';
import styles from '../assets/css/menuStyle';
import {fetchMenus} from '../redux/actions/dataActions';
import Card from './card';
import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
//import { TouchableOpacity } from 'react-native-gesture-handler';

const menu = [
      {
        description: 'Society has put up so many boundaries',
        image: require("../assets/images/crm1.jpeg"),
        title: 'Crème 1',
        id: 1
        
      },
      {
        description: 'Many limitations on what’s right',
        image: require("../assets/images/crm2.jpg"),
        title: 'Crème 2',
        id:2
      },
      {
        title: 'Why would anyone pick blue over?',
        image: require("../assets/images/br1.jpg"),
        title: 'Brochette 1',
        id:3
      },
      {
        title: 'Pink is obviously a better color',
        image: require("../assets/images/br2.jpg"),
        title: 'Brochette 2',
        id:4
      },
    
      {
        title: 'The time is now for it to be okay to be',
        image: require("../assets/images/gat1.jpg"),
        title: 'Gateau 1',
        id:5
       
      },
      {
        title: 'Gateau 1 Gateau 1  Gateau 1',
        image: require("../assets/images/gat2.jpeg"),
        description:
          'The structured shoulders and sleek detailing ensure a sharp silhouette. Team it with a silk pocket.',
        id:6
      },
      {
        title: 'Pizza',
        image: require("../assets/images/pizza2.jpg"),
        description:
          'The smooth woven-wool is water resistant to ensure you stay pristine after a long-haul flight.',
          id:7
      }
]; 
 
 
class MenuScreen extends React.Component{
  constructor(props) {
    super(props)

    this.displayDetail = this.displayDetail.bind(this);
    
  }

  displayDetail(idMenu) {
    this.props.navigation.navigate('Detail', {id:idMenu});
  }  

  componentDidMount(){ 
    this.props.fetchMenus()   
  }

  render() { 
    
    return (
        <Block style={styles.container}> 
            <Header/>
            <Block style={styles.cardContainer}>
                <FlatList
                        data={this.props.menus.menus} 
                        renderItem={({item}) =>  <Card item={item} onPress={this.displayDetail}/>}
                        keyExtractor={item => item.id.toString()} 
                        showsVerticalScrollIndicator={false}  
                    />    
            </Block> 
            <Block style={{marginHorizontal:5}}>
              <Button onlyIcon 
                    icon="phone" 
                    iconFamily="antdesign" 
                    iconSize={40} 
                    color="warning" 
                    iconColor="#fff" 
                    onPress={()=>{}}
                    style={{ 
                      width: 50, 
                      height: 50,
                      margin: 10,
                      alignSelf:"flex-end",
                      zIndex:13, 
                      bottom:1,
                      position:"absolute",
                      elevation:5 }}>Appeler un serveur</Button>
            </Block>
          </Block>
    );
  }
}

const mapStateToProps = state => {
  return {
      menus: state.menus    
  }
} 

export default connect(mapStateToProps,{fetchMenus})(MenuScreen)
