import React from 'react';
import {Text} from 'react-native';
import { connect } from 'react-redux';
import { Avatar, Badge, Icon, withBadge } from 'react-native-elements'
import { store } from '../redux/store/index';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/home';
import ScannerScreen from '../screens/scanner';
import MenuScreen from '../screens/menu';
import DetailScreen from '../screens/menuDetail';
import ProScreen from '../screens/profile';
import CartScreen from '../screens/cart';





const HomeStack = createStackNavigator();
 
class Home extends React.Component {
  constructor(props) { 
    super(props)
  } 
  

  render(){
    
    return (
      <HomeStack.Navigator headerMode="screen" initialRouteName="Home">
          <HomeStack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={({ navigation }) => ({
              headerMode : "none",
              headerShown: false 
            })}/>
          <HomeStack.Screen 
            name="Scan" 
            component={ScannerScreen} 
            options={({ navigation }) => ({
              headerMode : "none",
              headerShown: false 
            })}/>
          <HomeStack.Screen 
            name="Profile" 
            component={ProScreen} 
            options={({ navigation }) => ({
              headerMode : "none",
              headerShown: false 
            })}/>
          <HomeStack.Screen 
           name="Menu" 
           component={MenuScreen}  
           options={({ navigation }) => ({
              headerStyle: {
                height: 80,
                backgroundColor: "#ffa800",
                 // Specify the height of your custom header
              },
              headerTitle: "MENU",
              headerTitleAlign: "center",
              headerTitleStyle: {color:"white"},
              headerRight: props => {return(<Icon
                name='person'
                type="antDesign"
                size={25}
                onPress={()=> navigation.navigate("Profile")}
                color="white"
                />)},
              headerRightContainerStyle: {paddingHorizontal: 8},
              headerLeft: props => {
                const BadgedIcon = withBadge(this.props.order.items.length)(Icon)
                return(<BadgedIcon
                  type="ionicon" name="md-cart"
                  size={35}
                  onPress={()=> navigation.navigate("Cart")}
                  color="white"
                  />)
                }, 
              headerLeftContainerStyle: {paddingHorizontal: 8}
            })}/>

          <HomeStack.Screen 
           name="Detail" 
           component={DetailScreen}  
           options={({ navigation,route }) => ({
              headerStyle: {
                height: 80,
                backgroundColor: "#ffa800", 
                 // Specify the height of your custom header
              }, 
              headerTitle: "Détails",
              headerTitleAlign: "center",
              headerTitleStyle: {color:"white"},
              headerRight: props => {
                const BadgedIcon = withBadge(this.props.order.items.length)(Icon)
                return(<BadgedIcon
                  type="ionicon" name="md-cart"
                  size={35}
                  onPress={()=> navigation.navigate("Cart")}
                  color="white"
                  />)
                },
              headerRightContainerStyle: {paddingRight: 20},
              headerTintColor:"white",
              headerLeftContainerStyle: {paddingHorizontal: 8}
            })}/> 

        <HomeStack.Screen 
           name="Cart" 
           component={CartScreen}  
           options={({ navigation,route }) => ({
              headerStyle: {
                height: 80,
                backgroundColor: "#ffa800", 
                 // Specify the height of your custom header
              }, 
              headerTitle: "Mes commandes",
              headerTitleAlign: "center",
              headerTitleStyle: {color:"white"},
              headerRight: null,
              headerRightContainerStyle: {paddingHorizontal: 8},
              headerTintColor:"white",
              headerLeftContainerStyle: {paddingHorizontal: 8}
            })}/> 
      </HomeStack.Navigator>
  
    ); 
  }
};


 
const mapStateToProps = state => {
  
  return {
      order: state.order,
  }
} 

export default connect(mapStateToProps)(Home);

