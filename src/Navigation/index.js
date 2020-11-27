import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from './context';
import { connect } from 'react-redux'
import {fetchLogin,sendRegisterData,setSearchToken,setLogout} from '../redux/actions/dataActions'

import Auth from './AuthStack';
import Home from './HomeStack';
 
const RootStack = createStackNavigator(); 

function Rooting(props) {
  
  React.useEffect(() => {
      props.setSearchToken()  
    }, []);

  return (
    <AuthContext.Provider value={null}>
         <NavigationContainer>
         { props.user.token ? (
            <Home />
          ):(
            <Auth />
          )}
         </NavigationContainer>
    </AuthContext.Provider>
    )
}

const mapStateToProps = function(state) {
  return {
    user: state.auth,
  }
}

export default connect(mapStateToProps,{fetchLogin,sendRegisterData,setSearchToken,setLogout})(Rooting)

const App = () => {
  return ( 
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Auth" headerMode="none"> 
        <RootStack.Screen name="Auth" component={Auth} />
        <RootStack.Screen name="Home" component={Home} />
      </RootStack.Navigator>  
    </NavigationContainer> 
  );
};
 
