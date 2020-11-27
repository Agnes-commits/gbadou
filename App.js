import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Rooting from './src/Navigation';
import { Provider } from 'react-redux';
import Toast from 'react-native-toast-message';

import store from './src/redux/store/index';

export default function App() {
  return (
    <>
      <Provider store={ store }>
        <Rooting/>
      </Provider>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
