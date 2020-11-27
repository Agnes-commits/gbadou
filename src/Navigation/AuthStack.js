import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/login';
import RegisterScreen from '../screens/register';
 
const AuthStack = createStackNavigator();
 
const Auth = () => {
  return (
        <AuthStack.Navigator initialRouteName="Login"  headerMode="none">
            <AuthStack.Screen name="Login" component={LoginScreen} options={{headerMode:"none",headerShown:false}}/>
            <AuthStack.Screen name="Register" component={RegisterScreen} options={{headerMode:"none",headerShown:false}}/>
        </AuthStack.Navigator>
    
  );
};
 
export default Auth;