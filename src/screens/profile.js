import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import { Button, theme } from 'galio-framework';
import { connect } from 'react-redux';
import {setLogout} from '../redux/actions/dataActions'; 

const data = [
    { title: "First Chapter", content: "Lorem ipsum dolor sit amet", 
      icon: {
        name: 'keyboard-arrow-up',
        family: 'material',
        size: 16,
      } 
   },
    { title: "2nd Chapter", content: "Lorem ipsum dolor sit amet" },
    { title: "3rd Chapter", content: "Lorem ipsum dolor sit amet" }
  ];

class Profile extends Component {

  render() {
    return (
      <View style={styles.container}>
          <View style={styles.header}>
          <Button onlyIcon 
                    icon="back" 
                    iconFamily="antdesign" 
                    iconSize={30} 
                    color="#fba700" 
                    iconColor="#fff" 
                    onPress={()=>{this.props.navigation.navigate("Menu")}}
                    style={{ 
                      marginTop: 35,
                      marginRight:50,
                      width: 30, 
                      height: 30,
                      alignSelf:"flex-start",
                       }}></Button>
  
          <Button onlyIcon 
                    icon="logout" 
                    iconFamily="antdesign" 
                    iconSize={30} 
                    color="#fba700" 
                    iconColor="#fff" 
                    onPress={()=>{this.props.setLogout()}}
                    style={{ 
                      marginTop: -35,
                      marginRight:25,
                      width: 30, 
                      height: 30,
                      alignSelf:"flex-end",
                       }}></Button>
  
          </View>
          <Image style={styles.avatar} source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0PWKwDR-MA3E7KS03IEu4-TyWw6q3XMJuFw&usqp=CAU'}}/>
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>{this.props.user.info.name}</Text>
              <Text style={styles.info}>{this.props.user.info.email}</Text>
              <Text style={styles.info}>{this.props.user.info.phone}</Text>
            </View>
        </View>
        
      </View>
    );
  }
}

const mapStateToProps = state => {
    console.log(state.auth)   
    return {
        user: state.auth
    }  
  }
   
  export default connect(mapStateToProps,{setLogout})(Profile);

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#fba700",
    height:200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:130
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  body:{
    marginTop:40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600"
  },
  info:{
    fontSize:16,
    color: "#00BFFF",
    marginTop:10
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#00BFFF",
  },
});
