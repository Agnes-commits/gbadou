import React from 'react';
import { theme,Input, Block,Button,Text } from 'galio-framework';
import { View,Image } from 'react-native';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import logo from '../assets/images/logo.png';
import styles from '../assets/css/authStyle';
import {sendRegisterData,register,fetchLogin} from '../redux/actions/dataActions';
import store from '../redux/store/index';

class RegisterScreen extends React.Component  {
  
  constructor(props) {
    super(props)
  }

  handleSubmit = values => {  
    store.dispatch(this.props.register({token:null,info:values}))
    this.props.sendRegisterData()
   
  }

  render(){
    return (
      <View style={styles.container}>
        <Block>
          <View style={styles.centerView}>
            <Image
              source={logo} 
              style={{ width: 150, height: 150 }}
            />
          </View>
          <Text h4 style={styles.center}>Inscription</Text>
          <Formik
            initialValues={{name:'',phone:'',email:''}}
            onSubmit={(values) => this.handleSubmit(values)}
          >
            {formikProps => (
              <View>
                <Input
                  onChangeText={formikProps.handleChange('name')}
                  placeholder="Nom et prénom"
                  left
                  icon="user"
                  family="antdesign"
                  iconSize={18}
                  iconColor="#ffa800"
                  rounded={true}
                  color={theme.COLORS.WARNING} 
                  style={{ borderColor: theme.COLORS.WARNING }} 
                  placeholderTextColor={theme.COLORS.PLACEHOLDER}
                />

              <Input
                   onChangeText={formikProps.handleChange('phone')}
                  placeholder="Téléphone"
                  left
                  icon="phone"
                  family="antdesign"
                  iconSize={18}
                  iconColor="#ffa800"
                  rounded={true}
                  color={theme.COLORS.WARNING} 
                  style={{ borderColor: theme.COLORS.WARNING }} 
                  placeholderTextColor={theme.COLORS.PLACEHOLDER}
                />

                <Input
                   onChangeText={formikProps.handleChange('email')}
                  placeholder="Email"
                  left
                  icon="mail"
                  family="antdesign"
                  iconSize={18}
                  iconColor="#ffa800"
                  rounded={true}
                  color={theme.COLORS.WARNING} 
                  style={{ borderColor: theme.COLORS.WARNING }} 
                  placeholderTextColor={theme.COLORS.PLACEHOLDER}
                />
               
                <Button style={styles.center} round color="warning"
                  onPress={formikProps.handleSubmit}>
                  S'inscrire
                </Button>
                <View style={styles.centerView}>
                  <Text>Vous avez déjà un compte?</Text>
                  <TouchableOpacity onPress={()=> {this.props.navigation.navigate('Login')}}>
                    <Text style={styles.linkColor} >Connectez-vous!</Text>
                  </TouchableOpacity>
                </View>
            </View>
            )}
          </Formik>
         
        </Block>
       
      </View>
    );
  }
};
 
const mapStateToProps = state => {
  
  return {
    user: state.auth
  }  
}
 
export default connect(mapStateToProps,{sendRegisterData,register,fetchLogin})(RegisterScreen) 


