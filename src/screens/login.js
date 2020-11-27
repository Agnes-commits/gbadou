import React from 'react';
import { theme,Input, Block,Button,Text } from 'galio-framework';
import { View,Image } from 'react-native';
import { Formik } from 'formik';
import { TouchableOpacity } from 'react-native-gesture-handler';
import logo from '../assets/images/logo.png';
import styles from '../assets/css/authStyle';
import { connect } from 'react-redux';
import {fetchLogin,fetchingLoginFailure} from '../redux/actions/dataActions';
import Toast from 'react-native-toast-message';
import store from '../redux/store/index';

class LoginScreen extends React.Component  {
  
  constructor(props) { 
    super(props)
  }

  handleSubmit = values => {  
    this.props.fetchLogin(values) 
    this.show()
    key = ""; 
    store.dispatch(fetchingLoginFailure(key))
    
  }

  show = () => {
    if(this.props.user.errorMessage!=""){
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Erreur',
        text2: this.props.user.errorMessage,
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
        onShow: () => {},
        onHide: () => {}
      });
    }
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
          <Text h4 style={styles.center}>Connexion</Text>
          <Formik
            initialValues={{ password:''}}
            onSubmit={(values) => this.handleSubmit(values)}
          >
            {formikProps => (
              <View>
                
                <Input
                  onChangeText={formikProps.handleChange('password')}
                  placeholder="Mot de passe"
                  left
                  icon="lock"
                  password viewPass
                  family="antdesign"
                  iconSize={18}
                  iconColor="#ffa800"
                  rounded={true}
                  color={theme.COLORS.WARNING} 
                  style={{ borderColor: theme.COLORS.WARNING }} 
                  placeholderTextColor={theme.COLORS.PLACEHOLDER}
                />
                <TouchableOpacity onPress={()=> {}}>
                   
                </TouchableOpacity>
                <Button style={styles.center} round color="warning"
                  onPress={formikProps.handleSubmit}>
                  Se connecter
                </Button>
                <View style={styles.centerView}>
                  <Text>Vous n'avez pas de compte?</Text>
                  <TouchableOpacity onPress={()=> {this.props.navigation.navigate('Register')}}>
                    <Text style={styles.linkColor} >Inscrivez-vous!</Text>
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
 
export default connect(mapStateToProps,{fetchLogin,fetchingLoginFailure})(LoginScreen) 



            